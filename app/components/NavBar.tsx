"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Moon,
  Sun,
  ArrowUpRight,
  House,
  Coffee,
  HandCoins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);

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
          <nav className="hidden md:flex items-center space-x-8"></nav>

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
            <Link
              href="/iftar-connections"
              className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <Image
                src="/iftar.png" // update with your icon's path
                alt="iftar icon"
                width={20} // adjust the size as needed
                height={20} // adjust the size as needed
              />
            </Link>

            {/* Mobile Menu Button */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-gray-700 dark:text-gray-200"
                  onClick={() => setOpen(true)}
                >
                  <Menu size={24} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/"
                    onClick={() => setTimeout(() => setOpen(false), 205)}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
                  >
                    <House size={18} />
                    <span>Home</span>
                  </Link>
                  <Link
                    href="/challenges"
                    onClick={() => setTimeout(() => setOpen(false), 200)}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
                  >
                    <ArrowUpRight size={18} />
                    <span>Challenges</span>
                  </Link>
                  <Link
                    href="https://www.teaforturmeric.com/category/islamic-holidays/ramadan-recipes/"
                    onClick={() => setTimeout(() => setOpen(false), 200)}
                    target="_blank"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
                  >
                    <Coffee size={18} />
                    <span>Recipes</span>
                  </Link>
                  {/*<Link
                    href="/Donate"
                    onClick={() => setTimeout(() => setOpen(false), 200)}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2"
                  >
                    <HandCoins size={18} />
                    <span>Buy us Iftar.</span>
                  </Link> */}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
