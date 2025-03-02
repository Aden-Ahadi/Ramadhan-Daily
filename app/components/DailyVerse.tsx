// app/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface VerseData {
  verseId: number;
  surahNumber: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  verseNumberInSurah: number;
  juz: number;
  page: number;
  revelationType: string;
  arabicText: string;
  englishText: string;
}

export default function HomePage() {
  const [data, setData] = useState<VerseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDailyVerse() {
      try {
        const res = await fetch("/api/dailyVerse");
        if (!res.ok) {
          throw new Error("Failed to fetch daily verse");
        }
        const verse: VerseData = await res.json();
        setData(verse);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchDailyVerse();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 h-full p-6">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  const {
    surahNameEnglish,
    verseNumberInSurah,
    juz,
    page,

    arabicText,
    englishText,
  } = data;

  return (
    <div>
      <Card className="relative w-full  bg-muted/70 shadow-none border-none aspect-video">
        <Quote className="absolute top-3 right-2 h-16 w-16 text-foreground/10 stroke-[1.5px]" />
        <CardHeader className="py-5">
          <div className="flex items-center gap-3 justify-between">
            <Badge
              variant="outline"
              className="font-semibold text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-600"
            >
              Daily Verse
            </Badge>
            <div className="flex  gap-2 mr-14">
              {juz && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-emerald-200 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100 hover:bg-emerald-200 hover:text-emerald-800 dark:hover:bg-emerald-700 dark:hover:text-emerald-100"
                >
                  Juz {juz}
                </Badge>
              )}
              {page && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-emerald-200 text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100 hover:bg-emerald-200 hover:text-emerald-800 dark:hover:bg-emerald-700 dark:hover:text-emerald-100"
                >
                  Page {page}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <p className="text-2xl text-muted-foreground font-bold p-3">
            {arabicText}
          </p>

          <blockquote className="relative border-s-4 ps-4 sm:ps-6 dark:border-neutral-700 p-3">
            <p className="text-gray-800 sm:text-xl dark:text-white">
              <em>{englishText}</em>
            </p>
          </blockquote>
          <p className="mt-2">
            — {surahNameEnglish} (Verse {verseNumberInSurah})
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
