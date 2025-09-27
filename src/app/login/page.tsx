"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/reduxStore/store";
import { login } from "@/reduxStore/authSlice";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // validate
    if (
      !username.trim() ||
      !password.trim() ||
      username.length < 5 ||
      password.length < 5
    ) {
      toast.success("Username and password are required and length >=5", {
        duration: 4000,
        style: {
          background: "white",
          color: "black",
          padding: "10px",
          borderRadius: "8px",
        },
      });
      return;
    }

    const result = await dispatch(login({ username, password }));
    //console.log("Login result:", result);
    if (result.type === "auth/login/fulfilled") {
      router.push("/newsfeed");
    } else {
      toast.error("Invalid username or password!");
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-screen
      bg-gradient-to-br from-purple-400 via-purple-600 to-purple-900"
    >
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-120 bg-white p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-center text-2xl font-bold mb-4 ">
          {`Login to Beincom's Blog`}
        </h2>
        <label htmlFor="username-input" className="text-lg font-medium">
          User name:
        </label>
        <input
          id="username-input"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="User name"
          className="border border-gray-400
          h-14  px-4 py-2
          text-base leading-6
          rounded-2xl
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-purple-500
          hover:border-purple-500 transition-colors duration-200"
        />
        <label htmlFor="password-input" className="text-lg font-medium">
          Password:
        </label>
        <input
          id="password-input"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border border-gray-400
          h-14 px-4 py-2
          text-base leading-6
          rounded-2xl
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-purple-500
          hover:border-purple-500 transition-colors duration-200"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white p-2 rounded h-12 mt-4 hover:bg-purple-700 transition-colors duration-300 cursor-pointer"
        >
          Login
        </button>

        <p className="text-center text-sm mt-3 cursor-pointer">
          Don’t have an account?{" "}
          <a className="text-purple-600 font-medium hover:underline">
            Register here
          </a>
        </p>
        <p>
          {" "}
          {`Username = "emily" and password = "emilyspass" to login`}
        </p>
      </form>
    </div>
  );
}
