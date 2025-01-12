"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../axios";
import Image from "next/image";

// images
import logo from "../../../../../public/blog-logo.png";

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    console.log("Form Data:", formData);

    try {
      const response = await axios.post("/register", formData);
      console.log("Signup response:", response);
      if (response.status === 200 || response.status === 204) {
        router.push("/auth/login?message=Account created successfully. Please login to continue.");
      }
    } catch (err: any) {
      console.log("Signup error:", err);

      if (err.response) {
        const { status } = err.response;

        if (status === 400) {
          setError("Invalid input or email already in use");
        } else {
          setError("An unexpected error occurred");
        }
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" absolute flex items-center justify-center top-16 right-0 left-0">
        <Image src={logo} alt="Blog Logo" width={150} height={150} />
      </div>
      <div className="max-w-md w-full space-y-8 p-8 bg-slate-900 rounded-xl shadow-md border border-gray-800">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
            Sign up for a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {error && (
            <div className="bg-red-900 border border-red-400 text-gray-200 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 bg-slate-800 border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 bg-slate-800 border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 bg-slate-800 border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password_confirmation" className="sr-only">
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 bg-slate-800 border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Re-enter Password"
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({ ...formData, password_confirmation: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-2"></div>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
