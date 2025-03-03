"use client";
import React, { useEffect, useState } from "react";

interface MaghribTimerProps {
  maghribTime: string; // Iftar time in "HH:mm" format
  fajrTime?: string; // Fajr time in "HH:mm" format (optional)
}

const MaghribTimer: React.FC<MaghribTimerProps> = ({
  maghribTime,
  fajrTime = "05:00", // Default to 5 AM if not provided
}) => {
  const [displayText, setDisplayText] = useState<string>("Fetching...");

  useEffect(() => {
    if (!maghribTime) return;

    const updateTimer = () => {
      // Get current date and time
      const now = new Date();

      // Create today's date at midnight (for reference)
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);

      // Parse the time values
      const [maghribHour, maghribMinute] = maghribTime.split(":").map(Number);
      const [fajrHour, fajrMinute] = fajrTime.split(":").map(Number);

      // Create specific time points for today
      const todayMaghrib = new Date(today);
      todayMaghrib.setHours(maghribHour, maghribMinute, 0, 0);

      const todayNinePM = new Date(today);
      todayNinePM.setHours(21, 0, 0, 0);

      // Create tomorrow's Fajr time
      const tomorrowFajr = new Date(today);
      tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
      tomorrowFajr.setHours(fajrHour, fajrMinute, 0, 0);

      // Create tomorrow's Maghrib time
      const tomorrowMaghrib = new Date(today);
      tomorrowMaghrib.setDate(tomorrowMaghrib.getDate() + 1);
      tomorrowMaghrib.setHours(maghribHour, maghribMinute, 0, 0);

      // Create today's Fajr time (for morning checks)
      const todayFajr = new Date(today);
      todayFajr.setHours(fajrHour, fajrMinute, 0, 0);

      // Determine which message to show
      let targetTimeForCountdown;

      // Case 1: Between midnight and Fajr - show night message
      if (now >= today && now < todayFajr) {
        setDisplayText("🌌 Night of Reflection: Waiting for Suhoor...");
        return;
      }

      // Case 2: Between Fajr and Maghrib - countdown to today's Maghrib
      if (now >= todayFajr && now < todayMaghrib) {
        targetTimeForCountdown = todayMaghrib;
      }

      // Case 3: Between Maghrib and 9 PM - show Iftar message
      else if (now >= todayMaghrib && now < todayNinePM) {
        setDisplayText(
          "🌙 Iftar Time! May your fast be accepted. Enjoy your meal!"
        );
        return;
      }

      // Case 4: Between 9 PM and midnight - show night message
      else if (now >= todayNinePM) {
        setDisplayText("🌌 Night of Reflection: Waiting for Suhoor...");
        return;
      }

      // Calculate countdown if needed
      if (targetTimeForCountdown) {
        const diff = targetTimeForCountdown.getTime() - now.getTime();
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
      <p className="mt-1 text-lg text-center text-gray-800 dark:text-gray-100">
        {displayText}
      </p>
    </div>
  );
};

export default MaghribTimer;
