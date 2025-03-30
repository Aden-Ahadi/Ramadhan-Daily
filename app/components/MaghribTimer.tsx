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
  const [headerText, setHeaderText] = useState<string>("Iftar Countdown");

  useEffect(() => {
    // Check date periods
    const today = new Date();

    // Eid al-Fitr period (March 30, 2025 - April 1, 2025)
    const eidStartDate = new Date(2025, 2, 30); // Month is 0-indexed (2 = March)
    const eidEndDate = new Date(2025, 3, 1); // Month is 0-indexed (3 = April)
    eidEndDate.setHours(23, 59, 59, 999); // End of the day

    // Post-Eid period (April 2, 2025 - April 30, 2025)
    const postEidStartDate = new Date(2025, 3, 2); // April 2
    const postEidEndDate = new Date(2025, 3, 30); // April 30
    postEidEndDate.setHours(23, 59, 59, 999);

    // Check which period we're in
    const isEid = today >= eidStartDate && today <= eidEndDate;
    const isPostEid = today > eidEndDate && today <= postEidEndDate;

    // Display appropriate message based on the period
    if (isEid) {
      setHeaderText("Eid al-Fitr");

      // Day of Eid (1st, 2nd, or 3rd)
      const eidDay = Math.min(
        Math.floor(
          (today.getTime() - eidStartDate.getTime()) / (24 * 60 * 60 * 1000)
        ) + 1,
        3
      );

      // Different messages based on which day of Eid it is
      if (eidDay === 1) {
        setDisplayText(
          "Pro tip: If your mama says ‘kula kidogo!’, smile… then sneak a third plate of biriyani. 😎🍛 Eid Mubarak 😂!”"
        );
      } else if (eidDay === 2) {
        setDisplayText(
          "May your Eid be as bright as a full moon, as sweet as dates, and as colorful as a henna masterpiece! 🌕🌺"
        );
      } else {
        setDisplayText(
          "🌟 Eid Mubarak! Enjoy the blessings of the final day of Eid al-Fitr celebrations! 🌟"
        );
      }
      return;
    } else if (isPostEid) {
      setHeaderText("After Ramadan");

      // Array of post-Eid faith maintenance messages
      const postEidMessages = [
        "🌱 Ramadan may be over, but your spiritual journey continues. Maintain the habits of worship you built during the blessed month.",
        "💫 Remember that true faith shines brightest in daily actions. The lessons of Ramadan are meant for the entire year.",
        "🤲 Keep the spirit of Ramadan alive through regular prayer, charity, and kindness as we journey to the next blessed month.",
        "📿 The fast has ended, but the remembrance of Allah continues. Maintain your connection through dhikr and regular prayer.",
        "💖 Let the taqwa gained in Ramadan guide your actions throughout the year. Small consistent deeds are beloved to Allah.",
        "🕌 Though Ramadan has passed, the doors of mercy remain open. Continue seeking Allah's pleasure in all that you do.",
      ];

      // Select a message based on the day to provide variety (cycles through all messages)
      const daysSinceEid = Math.floor(
        (today.getTime() - postEidStartDate.getTime()) / (24 * 60 * 60 * 1000)
      );
      const messageIndex = daysSinceEid % postEidMessages.length;

      setDisplayText(postEidMessages[messageIndex]);
      return;
    }

    // Original Ramadan countdown code (will only run if neither isEid nor isPostEid is true)
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
        {headerText}
      </p>
      <p className="mt-1 text-lg text-center text-gray-800 dark:text-gray-100">
        {displayText}
      </p>
    </div>
  );
};

export default MaghribTimer;
