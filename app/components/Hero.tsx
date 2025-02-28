"use client";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlurText from "./BlurText";
import { AuroraText } from "@/components/magicui/aurora-text";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { useTheme } from "next-themes";
import DailyVerse from "./DailyVerse";
import { useEffect, useState } from "react";

export function Hero() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

  const [maghribTime, setMaghribTime] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>("Fetching...");

  // Function to get user location and fetch Maghrib prayer time
  useEffect(() => {
    const fetchPrayerTimes = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const data = await response.json();
        const maghrib = data.data.timings.Maghrib;
        setMaghribTime(maghrib);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

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

  // Countdown Timer
  useEffect(() => {
    if (!maghribTime) return;

    const updateCountdown = () => {
      const now = new Date();
      const [hours, minutes] = maghribTime.split(":").map(Number);
      const maghribDate = new Date();
      maghribDate.setHours(hours, minutes, 0, 0);

      const timeDiff = maghribDate.getTime() - now.getTime();

      if (timeDiff > 0) {
        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutesLeft = Math.floor(
          (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setCountdown(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
      } else {
        setCountdown("It's Iftar time!");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [maghribTime]);

  return (
    <div className="w-full py-18 lg:py-39">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
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

            <div className="flex flex-row gap-4">
              <Button size="lg" className="gap-4" variant="outline">
                btn <PhoneCall className="w-4 h-4" />
              </Button>
              <Button size="lg" className="gap-4">
                btn <MoveRight className="w-4 h-4" />
              </Button>
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
