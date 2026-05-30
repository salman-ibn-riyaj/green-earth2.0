"use client";

import { useState, useEffect } from "react";
import { HiMenuAlt3, HiX, HiSun, HiMoon } from "react-icons/hi";
import Link from "next/link";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Plant a Tree", href: "/plant-a-tree" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // mounted না হওয়া পর্যন্ত সবসময় HiMoon দেখাবে — server & client match থাকবে
  const ThemeIcon = () => {
    if (!mounted) return <HiMoon />;
    return theme === "dark" ? <HiSun /> : <HiMoon />;
  };

  return (
    <nav className="bg-[#1a7a3a] dark:bg-[#0f4d24] text-white px-6 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          Green Earth
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop: Theme Toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full bg-green-700 dark:bg-green-900 hover:bg-green-600 dark:hover:bg-green-800 transition-colors duration-200 text-lg"
          >
            <ThemeIcon />
          </button>

          <Link
            href="/plant-a-tree"
            className="bg-yellow-400 text-green-900 font-semibold px-5 py-2 rounded-full hover:bg-yellow-300 transition-colors duration-200 text-sm"
          >
            Plant a Tree
          </Link>
        </div>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full bg-green-700 dark:bg-green-900 hover:bg-green-600 transition-colors duration-200 text-lg"
          >
            <ThemeIcon />
          </button>

          <button
            className="text-white text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 px-2 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium hover:text-yellow-300 transition-colors duration-200 py-1 border-b border-green-600"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/plant-a-tree"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-yellow-400 text-green-900 font-semibold px-5 py-2 rounded-full text-center hover:bg-yellow-300 transition-colors duration-200 text-sm"
          >
            Plant a Tree
          </Link>
        </div>
      )}
    </nav>
  );
}