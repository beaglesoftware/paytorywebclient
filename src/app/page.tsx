import Link from "next/link";
import SimpleTable from "../../components/Table";
import { SubmitExpenseForm } from "../../components/SubmitExpenseForm";
import { SubmitIncomeForm } from "../../components/SubmitIncomeForm";
import {
  CookieValueTypes,
  getCookie,
} from "cookies-next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function fetchData(token: CookieValueTypes) {
  try {
    const response = axios.post("http://localhost:8010/api/q/generalstat/", {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      throw new Error("Network response was not ok");
    }

    return (await response).data;
  } catch (error) {
    console.error("Error when trying to fetch stat:", error);
  }
}

export default async function Home() {
  let IsAuthenticated;

  const token = await getCookie("access_token", { cookies });
  // console.log(token);
  if (token) {
    IsAuthenticated = true;
  } else {
    IsAuthenticated = false;
  }

  if (!IsAuthenticated) {
    return (
      <div className="flex content-center justify-center items-center">
        You are not logged in. Please login at&nbsp;
        <Link className="text-blue-600" href="/login">
          this page
        </Link>
        .
      </div>
    );
  }

  const data = await fetchData(token);

  const headers = [
    "Ex/In",
    "Number of Ex/In",
    "Amount",
  ] as const;
  // const rows = [
  //   ["Alice Johnson", "alice@example.com", "Active"],
  //   ["Bob Smith", "bob@example.com", "Inactive"],
  //   ["Charlie Brown", "charlie@example.com", "Active"],
  // ];
  const rows = [
    ["Expense", data.expense.amount__count, data.expense.amount__sum],
    ["Income", data.income.amount__count, data.income.amount__sum],
  ];

  return (
    <div>
      <main>
        <nav className="relative bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    data-slot="icon"
                    aria-hidden="true"
                    className="size-6 in-aria-expanded:hidden"
                  >
                    x{" "}
                    <path
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    data-slot="icon"
                    aria-hidden="true"
                    className="size-6 not-in-aria-expanded:hidden"
                  >
                    <path
                      d="M6 18 18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <h2 className="flex shrink-0 text-white font-black">
                    Paytory
                  </h2>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      href="/"
                      aria-current="page"
                      className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/expenses"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                    >
                      Expenses
                    </Link>
                    <Link
                      href="/incomes"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                    >
                      Incomes
                    </Link>
                    <Link
                      href="http://localhost:8010/devoptions/"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                    >
                      Developer Options
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    data-slot="icon"
                    aria-hidden="true"
                    className="size-6"
                  >
                    <path
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <Link
                  href="/logout"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  Log out
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <h1 className="text-5xl m-5 font-black">Welcome</h1>
        <h3 className="text-3xl m-5 font-bold">
          Table of Expenses and Incomes
        </h3>
        <SimpleTable headers={headers} rows={rows} />
        <div className="flex flex-row mr-50 ml-5">
          <div className="mr-3 border rounded-lg">
            <h4 className="text-2xl mr-50 mt-1 ml-5 mb-3">Add Expense</h4>
            <SubmitExpenseForm></SubmitExpenseForm>
          </div>
          <div className="mr-3 border rounded-lg">
            <h4 className="text-2xl mr-50 mt-1 ml-5 mb-3">Add Income</h4>
            <SubmitIncomeForm></SubmitIncomeForm>
          </div>
        </div>
      </main>
    </div>
  );
}
