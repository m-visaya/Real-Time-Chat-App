const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(cors());
require("dotenv").config();
const secret = process.env.SECRET_KEY;

// connect to mongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// define collections' schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// instantiate schemas
const User = mongoose.model("User", userSchema);
const Chat = mongoose.model("Chat", chatSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });

  user
    .save()
    .then((user) => {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        secret,
        {
          expiresIn: "1d",
        }
      );
      res.json({ user, token });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, secret, {
      expiresIn: "1d",
    });
    res.json({ user, token });
  });
});

app.get("/get-latest-messages", verifyToken, async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const username = authData.username;

      try {
        const latestChats = await Chat.aggregate([
          {
            $match: {
              $or: [{ from: username }, { to: username }],
            },
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $group: {
              _id: {
                $cond: [{ $eq: ["$from", username] }, "$to", "$from"],
              },
              latestMessage: { $first: "$message" },
              author: { $first: "$from" },
              createdAt: { $first: "$createdAt" },
            },
          },
          {
            $sort: { createdAt: -1 },
          },
        ]);

        res.json(latestChats);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  });
});

// jwt token verifier function
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

// socket io event listeners and emitters
io.use((socket, next) => {
  const token = socket.handshake.query.token;

  try {
    const decoded = jwt.verify(token, secret);
    socket.user = decoded;
    next();
  } catch (err) {
    return next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("connected", socket.decoded);

  socket.on("startChat", async ({ sender, receiver }) => {
    if (await User.findOne({ username: receiver })) {
      const roomId = [sender, receiver].sort().join("_");
      socket.join(roomId);

      const conversations = await Chat.find({
        $or: [
          { $and: [{ from: sender }, { to: receiver }] },
          { $and: [{ from: receiver }, { to: sender }] },
        ],
      });

      socket.emit("previousChats", conversations);
    }
  });

  socket.on("newMessage", (data) => {
    const chat = new Chat({ ...data });
    const roomId = [data.from, data.to].sort().join("_");

    chat
      .save()
      .then((chat) => {
        io.to(roomId).emit("newChat", chat);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
