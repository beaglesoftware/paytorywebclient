"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSetCookie, useHasCookie } from "cookies-next/client";

type Notification = {
  message: string;
  type: "success" | "error";
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null); // ✅ Fixed
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const setCookie = useSetCookie();
  const hasCookie = useHasCookie();

  // --- 1. Session Check on Load ---
  useEffect(() => {
    const token = hasCookie("access_token");
    console.log(token)
    if (token) {
      router.replace("/");
    }
  }, [router, hasCookie]);

  // --- 2. Notification Handler ---
  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type }); // ✅ Now valid due to proper typing

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // --- 3. Login Handler ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setNotification(null);
    setIsLoading(true);

    const API_URL = "http://localhost:8010/token/";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed. Invalid credentials.");
      }

      setCookie("access_token", data.access);
      showNotification("Login successful!", "success");
      router.push("/");
      setIsLoading(false);
    } catch (err: unknown) {
      const errorAsError =
        err instanceof Error ? err : new Error(err as string);

      console.error("Login Error:", errorAsError.message);
      setError(
        errorAsError.message || "An unknown error occurred during login.",
      );
      showNotification(`Login Failed: ${errorAsError.message}`, "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-start pt-10">
      {/* Notification Area */}
      {notification && (
        <div
          className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 p-3 rounded-lg shadow-xl max-w-md w-full transition-opacity duration-300 
          ${notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
        `}
        >
          {notification.message}
        </div>
      )}

      {/* Login Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200 mt-10">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-4">
          Paytory
        </h1>
        <h3 className="text-xl font-semibold text-center mb-8 text-gray-600">
          Login
        </h3>

        {/* Display Error Message (for immediate feedback) */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-black"
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-black"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 text-lg font-bold rounded-lg transition duration-300 ease-in-out shadow-md 
              ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
              }
            `}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
