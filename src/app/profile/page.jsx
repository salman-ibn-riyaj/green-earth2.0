"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@heroui/react";
import { HiPencil, HiX, HiCheck } from "react-icons/hi";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", image: "" });

  const user = session?.user;

  const handleEdit = () => {
    setForm({ name: user?.name || "", image: user?.image || "" });
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleUpdate = async () => {
    if (!form.name.trim()) {
      toast.error("Name cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name: form.name,
          image: form.image,
        }),
      });

      const data = await res.json();

      if (data.success) {
        await refetch();
        toast.success("Profile updated! 🎉");
        setEditing(false);
      } else {
        toast.error("Update failed!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f0faf4] dark:bg-[#0a2e18] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1a7a3a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f0faf4] dark:bg-[#0a2e18] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-green-300 mb-4">
            You are not logged in.
          </p>
          <Link href="/login">
            <Button className="bg-[#1a7a3a] text-white rounded-xl px-6">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0faf4] dark:bg-[#0a2e18] flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-2xl font-bold text-[#1a7a3a] dark:text-green-400 tracking-wide"
          >
            🌿 Green Earth
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-gray-800 dark:text-white">
            My Profile
          </h1>
        </div>

        <div className="bg-white dark:bg-[#0f4d24] rounded-2xl shadow-lg border border-green-100 dark:border-green-800 p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            {user.image ? (
              <img
                src={editing ? form.image || user.image : user.image}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-24 h-24 rounded-full bg-yellow-400 text-green-900 font-bold text-3xl items-center justify-center border-4 border-yellow-300"
              style={{ display: user.image ? "none" : "flex" }}
            >
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-green-300">
              {user.email}
            </p>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="bg-green-50 dark:bg-[#0a2e18] rounded-xl px-4 py-3 border border-green-100 dark:border-green-700">
              <p className="text-xs text-gray-400 dark:text-green-400 mb-0.5">
                Full Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {user.name}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-[#0a2e18] rounded-xl px-4 py-3 border border-green-100 dark:border-green-700">
              <p className="text-xs text-gray-400 dark:text-green-400 mb-0.5">
                Email
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {user.email}
              </p>
            </div>
          </div>

          {/* Edit Form */}
          {editing ? (
            <div className="flex flex-col gap-3 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-green-200 mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-[#0a2e18] text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a7a3a] text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-green-200 mb-1 block">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-2.5 rounded-xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-[#0a2e18] text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a7a3a] text-sm"
                />
              </div>
              <div className="flex gap-2 mt-1">
                <Button
                  onPress={handleUpdate}
                  isLoading={loading}
                  className="flex-1 bg-[#1a7a3a] text-white font-semibold rounded-xl text-sm"
                >
                  <HiCheck className="text-base" />
                  Save Changes
                </Button>
                <Button
                  onPress={handleCancel}
                  variant="bordered"
                  className="flex-1 border-green-200 dark:border-green-700 text-gray-700 dark:text-green-100 rounded-xl text-sm"
                >
                  <HiX className="text-base" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onPress={handleEdit}
              className="w-full bg-yellow-400 text-green-900 font-semibold rounded-xl text-sm"
            >
              <HiPencil className="text-base" />
              Update Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}