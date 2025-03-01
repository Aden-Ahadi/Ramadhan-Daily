"use client";
import { MoveRight, PhoneCall, ChevronDown, ChevronUp, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlurText from "./BlurText";
import { AuroraText } from "@/components/magicui/aurora-text";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { useTheme } from "next-themes";
import DailyVerse from "./DailyVerse";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

  const [prayerTimes, setPrayerTimes] = useState<Record<string, string> | null>(null);
  const [countdown, setCountdown] = useState<string>("Fetching...");
  const [showSalahTimes, setShowSalahTimes] = useState<boolean>(false); // State to control visibility

  // Fetch prayer times based on geolocation
  const fetchPrayerTimes = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const data = await response.json();
      if (data?.data?.timings) {
        setPrayerTimes(data.data.timings);
      } else {
        throw new Error("Invalid prayer times data");
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      setCountdown("Unable to fetch prayer times");
    }
  };

  // Get geolocation and fetch prayer times
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchPrayerTimes(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setCountdown("Location access denied");
        }
      );
    } else {
      setCountdown("Geolocation not supported");
    }
  }, []);

  // Countdown Timer for Maghrib
  useEffect(() => {
    if (!prayerTimes || !prayerTimes.Maghrib) return;

    const updateCountdown = () => {
      const now = new Date();
      const [hours, minutes] = prayerTimes.Maghrib.split(":").map(Number);
      const maghribDate = new Date();
      maghribDate.setHours(hours, minutes, 0, 0);

      let timeDiff = maghribDate.getTime() - now.getTime();

      // If Maghrib time has passed, calculate for the next day
      if (timeDiff < 0) {
        maghribDate.setDate(maghribDate.getDate() + 1);
        timeDiff = maghribDate.getTime() - now.getTime();
      }

      const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
      setCountdown(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  return (
    <div className="w-full py-18 lg:py-39 bg-custom-gradient">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          {/* Left Side */}
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">We&apos;re live!</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1>
                <BlurText
                  text="Your daily dose of Ramadhan!🌙"
                  delay={170}
                  animateBy="words"
                  direction="top"
                  className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular"
                />
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Ready to unlock a month of{" "}
                <AuroraText className="text-l font-semibold tracking-tighter md:text-2xl lg:text-xl">
                  wonder
                </AuroraText>
                ? Dive into a world where everyday feels like a celebration.
                <br />
                Let's make this{" "}
                <LineShadowText
                  className="italic text-balance text-xl font-semibold leading-none tracking-tighter sm:text-2xl md:text-2xl"
                  shadowColor={shadowColor}
                >
                  Ramadhan
                </LineShadowText>{" "}
                unforgettable.
              </p>
            </div>

           {/* Buttons */}
<div className="flex flex-row gap-4">
  <Link href="https://www.teaforturmeric.com/category/islamic-holidays/ramadan-recipes/" target="_blank" rel="noopener noreferrer">
    <Button size="lg" className="gap-4" variant="outline">
      Food Recipes <Coffee className="w-4 h-4" />
    </Button>
  </Link>
  <Link href="/challenges">
    <Button size="lg" className="gap-4">
      Challenges <MoveRight className="w-4 h-4" />
    </Button>
  </Link>
</div>

          </div>

          {/* Right Side Cards */}
          <div className="grid grid-cols-1 gap-8">
            {/* Iftar Countdown Timer Card */}
            <div className="bg-muted rounded-md h-32 flex flex-col items-center justify-center p-4">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Iftar Countdown
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {countdown}
              </p>
            </div>

            {/* Salah Times Card */}
            <div className="bg-muted rounded-md p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Today's Salah Times
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSalahTimes((prev) => !prev)}
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  {showSalahTimes ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {showSalahTimes && prayerTimes ? (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Object.entries(prayerTimes).map(([name, time]) => (
                      <div key={name} className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">{name}</span>
                        <span className="text-gray-900 dark:text-white font-medium">{time}</span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <p className="mt-4 text-gray-500">
                  {showSalahTimes
                    ? "Loading prayer times..."
                    : "Click to reveal Salah times"}
                </p>
              )}
            </div>

            {/* Daily Verse Card */}
            <div className="bg-muted rounded-md aspect-video">
              <DailyVerse />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
