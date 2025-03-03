// components/MaghribTimer.tsx
"use client";
import React, { useEffect, useState } from "react";

interface MaghribTimerProps {
  maghribTime: string; // Iftar time in "HH:mm" format
  fajrTime: string; // Fajr time in "HH:mm" format
}

const MaghribTimer: React.FC<MaghribTimerProps> = ({
  maghribTime,
  fajrTime,
}) => {
  const [displayText, setDisplayText] = useState<string>("Fetching...");

  useEffect(() => {
    if (!maghribTime || !fajrTime) return;

    const updateTimer = () => {
      const now = new Date();

      // Parse Iftar (Maghrib) time for today
      const [iftarHour, iftarMinute] = maghribTime.split(":").map(Number);
      const iftarDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        iftarHour,
        iftarMinute,
        0,
        0
      );

      // Parse Fajr time for today
      const [fajrHour, fajrMinute] = fajrTime.split(":").map(Number);
      let fajrDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        fajrHour,
        fajrMinute,
        0,
        0
      );

      // If current time is past Iftar, Fajr is tomorrow
      if (now >= iftarDate) {
        fajrDate.setDate(fajrDate.getDate() + 1);
      }

      // Define the end of the Iftar message period (21:00 hrs)
      const iftarMessageEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        21,
        0,
        0,
        0
      );

      // Before Iftar: Countdown to Iftar
      if (now < iftarDate) {
        const diff = iftarDate.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setDisplayText(`${hours}h ${minutes}m ${seconds}s until Iftar`);
      }
      // Between Iftar and 21:00 hrs: Iftar message
      else if (now >= iftarDate && now < iftarMessageEnd) {
        setDisplayText(
          "🌙 Iftar Time! May your fast be accepted. Enjoy your meal!"
        );
      }
      // Between 21:00 hrs and Fajr: Waiting for Suhoor message
      else if (now >= iftarMessageEnd && now < fajrDate) {
        setDisplayText("🌌 Night of Reflection: Waiting for Suhoor...");
      }
      // After Fajr: Reset countdown for next Iftar
      else {
        let nextIftar = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          iftarHour,
          iftarMinute,
          0,
          0
        );
        if (now >= nextIftar) {
          nextIftar.setDate(nextIftar.getDate() + 1);
        }
        const diff = nextIftar.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setDisplayText(`${hours}h ${minutes}m ${seconds}s until Iftar`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [maghribTime, fajrTime]);

  return (
    <div className="bg-muted rounded-md h-32 flex flex-col items-center justify-center p-4">
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Iftar Countdown
      </p>
      <p className="mt-1 text-lg  text-center text-gray-800 dark:text-gray-100">
        {displayText}
      </p>
    </div>
  );
};

export default MaghribTimer;
