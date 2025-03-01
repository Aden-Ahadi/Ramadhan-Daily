import { NextResponse } from "next/server";

interface EditionData {
  number: number; // e.g. 53
  text: string; // e.g. "Your fellow man is neither misguided nor astray."
  surah: {
    number: number; // Surah number
    name: string; // Surah name in Arabic
    englishName: string; // Surah name in English
    revelationType: string; // "Meccan" or "Medinan"
  };
  numberInSurah: number; // e.g. 2
  juz: number; // e.g. 27
  page: number; // e.g. 526
  // ... more fields (manzil, hizbQuarter, etc.) if you need them
}

interface ApiResponse {
  data: EditionData[];
  code: number;
  status: string;
}

// Helper: get day of year (1..365 or 366)
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Generate a pseudo-random number based on date seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// We can revalidate once a day so the verse changes daily
export const revalidate = 86400; // 24 hours in seconds

export async function GET(): Promise<Response> {
  try {
    // 1. Generate a random verse ID that's consistent for the day
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const seed = Array.from(dateString).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );

    const totalVerses = 6236;
    // Use seeded random to get consistent verse for the day
    const randomValue = seededRandom(seed);
    const verseId = Math.floor(randomValue * totalVerses) + 1;

    // 2. Build the API endpoint. We'll request two editions in one go:
    //    - Arabic: ar.alafasy
    //    - English: en.sahih
    const endpoint = `https://api.alquran.cloud/v1/ayah/${verseId}/editions/ar.alafasy,en.sahih`;

    // 3. Fetch
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Failed to fetch verse data: ${res.statusText}`);
    }

    // 4. Parse JSON (will be an array of data in the `data` field)
    const json: ApiResponse = await res.json();
    if (!json.data || !Array.isArray(json.data) || json.data.length < 2) {
      throw new Error("Unexpected response format from alquran.cloud");
    }

    // 5. Extract Arabic and English editions from the array
    //    - We'll assume index 0 is Arabic, index 1 is English
    const arabicData = json.data[0];
    const englishData = json.data[1];

    // 6. Combine into a single JSON object with the fields you need
    //    We'll assume that juzz/page are the same for both (they should be).
    const combined = {
      verseId: arabicData.number, // global verse ID
      surahNumber: arabicData.surah.number,
      surahNameArabic: arabicData.surah.name,
      surahNameEnglish: arabicData.surah.englishName,
      verseNumberInSurah: arabicData.numberInSurah,
      juz: arabicData.juz,
      page: arabicData.page,
      revelationType: arabicData.surah.revelationType,
      arabicText: arabicData.text,
      englishText: englishData.text,
      // etc. add footnotes or more fields if the edition includes them
    };

    return NextResponse.json(combined);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
