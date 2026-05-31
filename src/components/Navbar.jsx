// "use client";

// import { useState, useEffect } from "react";
// import { HiMenuAlt3, HiX, HiSun, HiMoon } from "react-icons/hi";
// import Link from "next/link";
// import { useTheme } from "next-themes";

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "About", href: "/about" },
//   { label: "Gallery", href: "/gallery" },
//   { label: "Plant a Tree", href: "/plant-a-tree" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   // mounted না হওয়া পর্যন্ত সবসময় HiMoon দেখাবে — server & client match থাকবে
//   const ThemeIcon = () => {
//     if (!mounted) return <HiMoon />;
//     return theme === "dark" ? <HiSun /> : <HiMoon />;
//   };

//   return (
//     <nav className="bg-[#1a7a3a] dark:bg-[#0f4d24] text-white px-6 py-4 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold tracking-wide">
//           Green Earth
//         </Link>

//         {/* Desktop Nav Links */}
//         <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
//           {navLinks.map((link) => (
//             <li key={link.href}>
//               <Link
//                 href={link.href}
//                 className="hover:text-yellow-300 transition-colors duration-200"
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Desktop: Theme Toggle + CTA */}
//         <div className="hidden md:flex items-center gap-3">
//           <button
//             onClick={toggleTheme}
//             aria-label="Toggle dark mode"
//             className="p-2 rounded-full bg-green-700 dark:bg-green-900 hover:bg-green-600 dark:hover:bg-green-800 transition-colors duration-200 text-lg"
//           >
//             <ThemeIcon />
//           </button>

//           <Link
//             href="/plant-a-tree"
//             className="bg-yellow-400 text-green-900 font-semibold px-5 py-2 rounded-full hover:bg-yellow-300 transition-colors duration-200 text-sm"
//           >
//             Plant a Tree
//           </Link>
//         </div>

//         {/* Mobile: Theme Toggle + Hamburger */}
//         <div className="md:hidden flex items-center gap-3">
//           <button
//             onClick={toggleTheme}
//             aria-label="Toggle dark mode"
//             className="p-2 rounded-full bg-green-700 dark:bg-green-900 hover:bg-green-600 transition-colors duration-200 text-lg"
//           >
//             <ThemeIcon />
//           </button>

//           <button
//             className="text-white text-2xl focus:outline-none"
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <HiX /> : <HiMenuAlt3 />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="md:hidden mt-4 flex flex-col gap-3 px-2 pb-4">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setMenuOpen(false)}
//               className="text-sm font-medium hover:text-yellow-300 transition-colors duration-200 py-1 border-b border-green-600"
//             >
//               {link.label}
//             </Link>
//           ))}
//           <Link
//             href="/plant-a-tree"
//             onClick={() => setMenuOpen(false)}
//             className="mt-2 bg-yellow-400 text-green-900 font-semibold px-5 py-2 rounded-full text-center hover:bg-yellow-300 transition-colors duration-200 text-sm"
//           >
//             Plant a Tree
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { HiMenuAlt3, HiX, HiSun, HiMoon, HiChevronDown } from "react-icons/hi";
import { HiArrowRightOnRectangle, HiUser } from "react-icons/hi2";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Plant a Tree", href: "/plant-a-tree" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const ThemeIcon = () => {
    if (!mounted) return <HiMoon />;
    return theme === "dark" ? <HiSun /> : <HiMoon />;
  };

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
  };

  const user = session?.user;

  const UserAvatar = ({ size = "w-8 h-8" }) => {
    if (user?.image) {
      return (
        <img
          src={user.image}
          alt={user.name || "User"}
          className={`${size} rounded-full object-cover border-2 border-yellow-400`}
        />
      );
    }
    return (
      <div
        className={`${size} rounded-full bg-yellow-400 text-green-900 font-bold flex items-center justify-center text-sm border-2 border-yellow-300`}
      >
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </div>
    );
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

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            isIconOnly
            onPress={toggleTheme}
            aria-label="Toggle dark mode"
            className="bg-green-700 dark:bg-green-900 hover:bg-green-600 dark:hover:bg-green-800 text-white rounded-full text-lg"
          >
            <ThemeIcon />
          </Button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                aria-label="User menu"
              >
                <UserAvatar />
                <HiChevronDown
                  className={`text-sm transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#0f4d24] rounded-xl shadow-lg border border-green-200 dark:border-green-700 overflow-hidden z-50">
                  <div className="px-4 py-2.5 border-b border-green-100 dark:border-green-700">
                    <p className="text-xs font-medium text-gray-700 dark:text-green-100 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-green-300 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-green-100 hover:bg-green-50 dark:hover:bg-green-800 transition-colors"
                  >
                    <HiUser className="text-base" />
                    Profile
                  </Link>
                  <Button
                    onPress={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20 rounded-none justify-start min-h-0 h-auto"
                  >
                    <HiArrowRightOnRectangle className="text-base" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="light"
                  className="text-sm font-medium text-white hover:text-yellow-300"
                >
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-yellow-400 text-green-900 px-1 font-semibold rounded-full hover:bg-yellow-300 text-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <Button
            as={Link}
            href="/plant-a-tree"
            className="bg-yellow-400 text-green-900 px-1 font-semibold rounded-full hover:bg-yellow-300 text-sm"
          >
            Plant a Tree
          </Button>
        </div>

        {/* Mobile: Theme + Avatar + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          {user && <UserAvatar size="w-7 h-7" />}
          <Button
            isIconOnly
            onPress={toggleTheme}
            aria-label="Toggle dark mode"
            className="bg-green-700 dark:bg-green-900 hover:bg-green-600 text-white rounded-full text-lg"
          >
            <ThemeIcon />
          </Button>
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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

          {user ? (
            <>
              <div className="flex items-center gap-2 py-2 border-b border-green-600">
                <UserAvatar size="w-7 h-7" />
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-green-300">{user.email}</p>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium py-1 border-b border-green-600 hover:text-yellow-300 transition-colors"
              >
                <HiUser className="text-base" />
                Profile
              </Link>
              <Button
                onPress={() => {
                  handleSignOut();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-medium text-red-300 bg-transparent hover:text-red-200 justify-start min-h-0 h-auto p-0"
              >
                <HiArrowRightOnRectangle className="text-base" />
                Sign Out
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-2 mt-1">
              <Link href="/login">
                <Button
               
                  onClick={() => setMenuOpen(false)}
                  variant="bordered"
                  className="text-sm font-medium text-white rounded-full border-white/30"
                >
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
              
                  onClick={() => setMenuOpen(false)}
                  className="bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 text-sm"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <Button
            as={Link}
            href="/plant-a-tree"
            onClick={() => setMenuOpen(false)}
            className="mt-1 bg-yellow-400 text-green-900 font-semibold rounded-full hover:bg-yellow-300 text-sm"
          >
            Plant a Tree
          </Button>
        </div>
      )}
    </nav>
  );
}
