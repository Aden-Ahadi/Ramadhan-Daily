// app/api/dailyVerse/route.ts
import { NextResponse } from "next/server";

interface EditionData {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
    revelationType: string;
  };
  numberInSurah: number;
  juz: number;
  page: number;
}

interface ApiResponse {
  data: EditionData[];
  code: number;
  status: string;
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export async function GET(): Promise<Response> {
  try {
    // UTC-based date handling
    const today = new Date();
    const utcDate = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );

    // Seed based on UTC date
    const dateString = `${utcDate.getUTCFullYear()}-${utcDate.getUTCMonth()}-${utcDate.getUTCDate()}`;
    const seed = Array.from(dateString).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );

    const totalVerses = 6236;
    const randomValue = seededRandom(seed);
    const verseId = Math.floor(randomValue * totalVerses) + 1;

    const endpoint = `https://api.alquran.cloud/v1/ayah/${verseId}/editions/ar.alafasy,en.sahih`;
    const res = await fetch(endpoint);

    if (!res.ok)
      throw new Error(`Failed to fetch verse data: ${res.statusText}`);

    const json: ApiResponse = await res.json();

    if (!json.data || !Array.isArray(json.data)) {
      throw new Error("Unexpected response format");
    }

    const [arabicData, englishData] = json.data;

    const combined = {
      verseId: arabicData.number,
      surahNumber: arabicData.surah.number,
      surahNameArabic: arabicData.surah.name,
      surahNameEnglish: arabicData.surah.englishName,
      verseNumberInSurah: arabicData.numberInSurah,
      juz: arabicData.juz,
      page: arabicData.page,
      revelationType: arabicData.surah.revelationType,
      arabicText: arabicData.text,
      englishText: englishData.text,
    };

    return NextResponse.json(combined, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=59",
        "CDN-Cache-Control": "public, s-maxage=3600",
        "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
