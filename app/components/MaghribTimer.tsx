// components/MaghribTimer.tsx
"use client";
import React, { useEffect, useState } from "react";

interface MaghribTimerProps {
  maghribTime: string;
}

const MaghribTimer: React.FC<MaghribTimerProps> = ({ maghribTime }) => {
  const [countdown, setCountdown] = useState<string>("Fetching...");

  useEffect(() => {
    if (!maghribTime) return;

    const updateCountdown = () => {
      const now = new Date();
      const [hours, minutes] = maghribTime.split(":").map(Number);
      const maghribDate = new Date();
      maghribDate.setHours(hours, minutes, 0, 0);

      // If Maghrib time has passed, calculate for the next day
      let timeDiff = maghribDate.getTime() - now.getTime();
      if (timeDiff < 0) {
        maghribDate.setDate(maghribDate.getDate() + 1);
        timeDiff = maghribDate.getTime() - now.getTime();
      }

      const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesLeft = Math.floor(
        (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
      setCountdown(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [maghribTime]);

  return (
    <div className="bg-muted rounded-md h-32 flex flex-col items-center justify-center p-4">
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Iftar Countdown
      </p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {countdown}
      </p>
    </div>
  );
};

export default MaghribTimer;
