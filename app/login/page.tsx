"use client";
import React, { useState } from "react";
// import { signIn } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoginError("");

    try {
      const logins: { [key: string]: string } = {
        admin: "password",
        removal: "password",
      };

      if (logins[username] !== password) {
        setLoginError("Invalid username or password.");
        return;
      } else {
        localStorage.setItem("userRole", username);
        // Autopage render depending on role login
        if (username === "admin") {
          window.location.href = "/results";
        } else if (username === "removal") {
          window.location.href = "/removaljobs";
        }
      }
    } catch (error) {
      setLoginError("An error occurred while logging in.");
    }
  };

  return (
    <section className="max-h-screen overflow-y-hidden">
      <Navbar />
      <div
        className="absolute h-full top-0 left-0 bottom-0 w-full -z-10
        custom-background "
      >
        <div className="custom-clip-path h-screen w-screen bg-white/10"></div>
      </div>
      <div className="container mx-auto p-8 flex justify-center items-start min-h-screen mt-36">
        <div className="max-w-md w-full bg-white p-6 rounded shadow-xl pb-8">
          <h1 className="text-center text-4xl font-semibold my-8 text-black">Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm italic">{loginError}</p>
            )}
            <button
              className="text-xl text-white mt-4
           w-full h-[4rem] uppercase rounded-full
          flex flex-col items-center justify-center shadow-lg
          custom-background hover:translate-y-1 hover:shadow-2xl transition duration-500 ease-in-out"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
