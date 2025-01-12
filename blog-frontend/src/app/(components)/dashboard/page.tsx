'use client';
import React from "react";
import { useRouter } from "next/navigation";
import axios from "../axios";
import AuthCheck from "../AuthCheck";

function Page() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/logout");
      if (response.status === 200 || response.status === 204) {
        router.push("/auth/login");
      } else {
        console.error("Error during logout:", response.data);
      }
    } catch (err) {
      console.error("An error occurred during logout:", err);
    } 
  };

  const navigateToPosts = () => {
    router.push("/posts"); 
  };

  const navigateToEditPosts = () => {
    router.push("/posts/edit"); 
  };

  return (
    <AuthCheck>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            className="bg-gray-800 text-white rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={navigateToPosts}
          >
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold">View Posts</h2>
              <p className="mt-2 text-gray-400">Browse through all your posts</p>
            </div>
          </div>
          <div
            className="bg-gray-800 text-white rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={navigateToEditPosts}
          >
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold">Edit Posts</h2>
              <p className="mt-2 text-gray-400">Manage and edit your existing posts</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </AuthCheck>
  );
}

export default Page;
