"use client";

import { SyntheticEvent, useState } from "react";
import Router from "next/navigation";
import { useGetCookie } from "cookies-next";
import axios from "axios";

export function SubmitExpenseForm() {
  const getCookie = useGetCookie();

  const router = Router.useRouter();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const API_TOKEN = getCookie("access_token");

  /**
   * Handles the submission logic when the button is clicked.
   */
  async function handleSubmit(e: SyntheticEvent) {
    // 1. STOP THE DEFAULT FORM SUBMISSION (Crucial step!)
    e.preventDefault();
    setStatus("loading");

    try {
      // 2. Perform the API Call
      const response = axios.post(
        "http://localhost:8010/api/submit/expense/",
        {
          text: name,
          date: date,
          amount: parseFloat(amount),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`, // Authenticate with the token
          },
        },
      );

      // 4. Success Handling
      setStatus("success");

      // Clear inputs after successful submission
      setName("");
      setDate("");
      setAmount("");
    } catch (error) {
      // 5. Error Handling
      setStatus("error");
      console.error("Submission Error:", error);
    } finally {
      // Ensure loading state is cleared regardless of success or failure
      setStatus("idle");
    }
  }

  router.refresh();

  return (
    <div className="flex flex-col gap-4 p-4 border">
      {/* Display Status Feedback */}
      {status === "success" && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          Expense submitted successfully!
        </p>
      )}
      {status === "error" && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Submission Failed. Please try again.
        </p>
      )}

      <h2 className="text-xl font-bold">Submit New Expense</h2>

      {/* The form now only serves as a container for the inputs */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-sm font-medium">
            Name:
          </label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Date:
          </label>
          <input
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Amount:
          </label>
          <input
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        {/* The button triggers the handleSubmit function */}
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full py-3 px-6 shadow-lg transition duration-300 ease-in-out ${
            status === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-900 focus:ring-opacity-50"
          }`}
        >
          {status === "loading" ? "Submitting..." : "Submit Expense"}
        </button>
      </form>
    </div>
  );
}

export default SubmitExpenseForm;
