"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  "All Trees",
  "Fruit Trees",
  "Flowering Trees",
  "Shade Trees",
  "Medicinal Trees",
  "Timber Trees",
  "Evergreen Trees",
  "Ornamental Plants",
  "Bamboo",
  "Climbers",
  "Aquatic Plants",
];

// trees prop আসবে server component থেকে (MongoDB data)
export default function ChooseYourTrees({ trees = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All Trees");
  const [cart, setCart] = useState([]);

  const filtered =
    selectedCategory === "All Trees"
      ? trees
      : trees.filter((tree) => tree.category === selectedCategory);

  const addToCart = (tree) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === tree._id);
      if (exists) {
        return prev.map((item) =>
          item._id === tree._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...tree, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section className="bg-[#e8f5ee] dark:bg-[#0f2e1a] min-h-screen py-10 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto rounded-2xl p-6">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Choose Your Trees
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Categories */}
          <aside className="lg:w-48 flex-shrink-0">
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm">
              Categories
            </p>
            <ul className="flex flex-row flex-wrap lg:flex-col gap-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                      selectedCategory === cat
                        ? "bg-[#1a7a3a] text-white font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Tree Cards Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-500 text-sm">
                No trees found in this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((tree) => (
                  <div
                    key={tree._id}
                    className="bg-white dark:bg-[#1a3d27] rounded-xl overflow-hidden border border-gray-100 dark:border-green-900"
                  >
                    {/* Image */}
                    <div className="w-full h-44 bg-gray-100 dark:bg-gray-800 relative">
                      {tree.image ? (
                        <Image
                          src={tree.image}
                          alt={tree.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">
                        {tree.name}
                      </h3>
                      <p className="text-gray-400 dark:text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
                        {tree.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                          {tree.category}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                          ৳{tree.price}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(tree)}
                        className="w-full bg-[#1a7a3a] hover:bg-[#155f2d] text-white text-sm font-semibold py-2 rounded-full transition-colors duration-200"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <aside className="lg:w-52 flex-shrink-0">
            <div className="bg-white dark:bg-[#1a3d27] rounded-xl p-4 border border-gray-100 dark:border-green-900 sticky top-4">
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-3">
                Your Cart
              </p>

              {cart.length === 0 ? (
                <p className="text-gray-400 text-xs">Cart is empty.</p>
              ) : (
                <ul className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <li key={item._id} className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-200">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-400">
                          ৳{item.price} × {item.qty}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-gray-400 hover:text-red-500 text-lg leading-none mt-0.5"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="border-t border-gray-100 dark:border-green-800 pt-3 flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Total:</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  ৳{total}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}