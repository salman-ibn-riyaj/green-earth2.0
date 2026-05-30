"use client";

import { useState } from "react";

export default function PlantTreeFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    trees: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // add your submit logic here
  };

  return (
    <>
      {/* Plant a Tree Section */}
      <section className="bg-[#1a7a3a] dark:bg-[#0f4d24] py-16 px-6 transition-colors duration-300">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Plant a Tree Today
          </h2>

          <div className="bg-[#155f2d] dark:bg-[#0a3318] rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-100 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-100 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {/* Number of Trees Dropdown */}
            <select
              name="trees"
              value={formData.trees}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-100 text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Number of Trees
              </option>
              <option value="1">1 Tree</option>
              <option value="5">5 Trees</option>
              <option value="10">10 Trees</option>
              <option value="25">25 Trees</option>
              <option value="50">50 Trees</option>
              <option value="100">100 Trees</option>
            </select>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-green-900 font-semibold py-3 rounded-lg transition-colors duration-200 text-sm"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f4d24] dark:bg-[#071f0f] py-5 px-6 text-center transition-colors duration-300">
        <p className="text-gray-300 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Green Earth. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}