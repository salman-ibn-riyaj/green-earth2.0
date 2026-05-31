"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { signUp, signIn, authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match!");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.image || undefined,
      });

      if (error) {
        toast.error(error.message || "Sign up failed!");
        return;
      }

      toast.success("Account created successfully! 🎉");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-[#f0faf4] dark:bg-[#0a2e18] flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" />

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-2xl font-bold text-[#1a7a3a] dark:text-green-400 tracking-wide"
          >
            🌿 Green Earth
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-gray-800 dark:text-white">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 dark:text-green-300 mt-1">
            Join us and help make the Earth greener
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#0f4d24] rounded-2xl shadow-lg border border-green-100 dark:border-green-800 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-green-200 mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-[#0a2e18] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-green-600 focus:outline-none focus:ring-2 focus:ring-[#1a7a3a] text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-green-200 mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-[#0a2e18] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-green-600 focus:outline-none focus:ring-2 focus:ring-[#1a7a3a] text-sm"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-green-200 mb-1 block">
                Profile Image URL{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-2.5 rounded-xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-[#0a2e18] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-green-600 focus:outline-none focus:ring-2 focus:ring-[#1a7a3a] text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-green-200 mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-[#0a2e18] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-green-600 focus:outline-none focus:ring-2 focus:ring-[#1a7a3a] text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-green-300"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-green-200 mb-1 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter password"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-[#0a2e18] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-green-600 focus:outline-none focus:ring-2 focus:ring-[#1a7a3a] text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-green-300"
                >
                  {showConfirm ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-[#1a7a3a] hover:bg-[#15692f] text-white font-semibold rounded-xl py-2.5 text-sm mt-1"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-green-100 dark:bg-green-800" />
            <span className="text-xs text-gray-400 dark:text-green-600">
              or continue with
            </span>
            <div className="flex-1 h-px bg-green-100 dark:bg-green-800" />
          </div>

          {/* Google Button */}
          <Button
            onClick={handleGoogle}
            variant="bordered"
            className="w-full border border-green-200 dark:border-green-700 rounded-xl py-2.5 text-sm font-medium text-gray-700 dark:text-green-100 flex items-center justify-center gap-2 hover:bg-green-50 dark:hover:bg-green-900"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 dark:text-green-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#1a7a3a] dark:text-yellow-400 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}