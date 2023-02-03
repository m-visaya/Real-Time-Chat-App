import { useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      return navigate("/messages");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="bg-neutral-800 w-screen h-screen flex justify-center items-center relative">
      <form
        className="bg-neutral-100 p-10 rounded-lg flex flex-col justify-center items-center z-10 w-96"
        onSubmit={handleSubmit}
      >
        <BsChatDotsFill className="text-6xl text-green-500 my-2" />
        <h1 className="mb-14">ChatApp</h1>

        <label className="self-start ml-1 mb-2">Username</label>
        <input
          type="text"
          className="px-4 py-2 rounded-lg mb-6 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="self-start ml-1 mb-2">Password</label>
        <input
          type="password"
          className="px-4 py-2 rounded-lg mb-6 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-red-700 text-sm self-start">{error}</p>

        <button
          type="submit"
          className="mt-4 bg-green-500 px-4 py-2 rounded-lg text-neutral-50 font-semibold hover:bg-green-600"
        >
          Login
        </button>
        <p className="cursor-pointer font-light text-sm mt-3 text-neutral-900 hover:text-green-700">
          <Link to="/signup">create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
