"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Moon, Sun, Calendar, BookOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-white/40 dark:bg-gray-900/60 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <Image
                  src="/shining.png"
                  alt="Ramadhan Daily Logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                  priority
                />
                <span className="ml-2 text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                  Ramadhan Daily
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/calendar"
              className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              .
            </Link>
            <Link
              href="/prayers"
              className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              .
            </Link>
            <Link
              href="/quran"
              className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              .
            </Link>
            <Link
              href="/duas"
              className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              .
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-200"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Settings Button - Desktop */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-gray-700 dark:text-gray-200"
            >
              <Settings size={20} />
              <span className="sr-only">Settings</span>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-gray-700 dark:text-gray-200"
                >
                  <Menu size={24} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/calendar"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
                  >
                    <Calendar size={18} />
                    <span>Calendar</span>
                  </Link>
                  <Link
                    href="/prayers"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
                  >
                    <BookOpen size={18} />
                    <span>Prayers</span>
                  </Link>
                  <Link
                    href="/quran"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
                  >
                    <BookOpen size={18} />
                    <span>Quran</span>
                  </Link>
                  <Link
                    href="/duas"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
                  >
                    <BookOpen size={18} />
                    <span>Duas</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
