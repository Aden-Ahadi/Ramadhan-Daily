import {
  BookOpen,
  Heart,
  Users,
  Coffee,
  HandIcon as PrayingHands,
} from "lucide-react";

export const challenges = [
  {
    id: "quran",
    name: "Quran & Dhikr",
    description:
      "Challenges focused on Quran recitation and remembrance of Allah",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    items: [
      {
        title: "Memorize a New Surah",
        description:
          "Choose a surah you haven't memorized yet and commit it to memory during Ramadhan.",
        difficulty: "Moderate",
      },
      {
        title: "Recite Surah Yaseen After Fajr",
        description:
          "Recite Surah Yaseen after Fajr prayer for the blessings it brings to your day.",
        difficulty: "Easy",
      },
      {
        title: "100 Istighfar Challenge",
        description:
          "Recite 'Astaghfirullah' (I seek forgiveness from Allah) 100 times today.",
        difficulty: "Easy",
      },
      {
        title: "Tafsir Study",
        description:
          "Read the tafsir (explanation) of the surah you recited in your last prayer.",
        difficulty: "Moderate",
      },
      {
        title: "Dhikr After Prayer",
        description:
          "Perform the recommended dhikr after each of the five daily prayers.",
        difficulty: "Easy",
      },
      {
        title: "Recite Ayatul Kursi",
        description: "Recite Ayatul Kursi after each obligatory prayer today.",
        difficulty: "Easy",
      },
      {
        title: "Tahajjud Prayer",
        description:
          "Wake up for Tahajjud prayer tonight and recite at least 2 rakats.",
        difficulty: "Challenging",
      },
      {
        title: "One Juz Challenge",
        description: "Read one complete juz (part) of the Quran today.",
        difficulty: "Moderate",
      },
      {
        title: "Watch a Beautiful Recitation",
        description:
          "Watch a beautiful recitation of the Quran to improve your tajweed.",
        difficulty: "Easy",
        type: "video",
        videoUrl: "/videos/quran-recitation1.mp4",
        isLocalFile: true,
      },
    ],
  },
  {
    id: "charity",
    name: "Charity & Kindness",
    description: "Challenges to increase your charitable acts and kindness",
    icon: <Heart className="w-6 h-6 text-primary" />,
    items: [
      {
        title: "Secret Sadaqah",
        description: "Give charity today without letting anyone know about it.",
        difficulty: "Easy",
      },
      {
        title: "Feed a Fasting Person",
        description:
          "Provide iftar for someone who is fasting - a family member, friend, or someone in need.",
        difficulty: "Moderate",
      },
      {
        title: "Donate to a Masjid",
        description:
          "Make a donation to your local masjid or an Islamic charity.",
        difficulty: "Easy",
      },
      {
        title: "Help the Elderly",
        description:
          "Offer assistance to an elderly person today - it could be shopping, cleaning, or just spending time with them.",
        difficulty: "Moderate",
      },
      {
        title: "Forgive Someone",
        description:
          "Think of someone who has wronged you and sincerely forgive them in your heart.",
        difficulty: "Challenging",
      },
      {
        title: "Smile More",
        description:
          "Make a conscious effort to smile at everyone you meet today - it's a form of charity!",
        difficulty: "Easy",
      },
      {
        title: "Kind Words Challenge",
        description:
          "Only speak kind and beneficial words today. Avoid gossip, backbiting, and negative speech.",
        difficulty: "Moderate",
      },
      {
        title: "Charity Jar",
        description:
          "Start a charity jar for the remainder of Ramadhan, adding something each day.",
        difficulty: "Easy",
      },
    ],
  },
  {
    id: "community",
    name: "Community & Family",
    description: "Challenges to strengthen bonds with family and community",
    icon: <Users className="w-6 h-6 text-primary" />,
    items: [
      {
        title: "Family Iftar",
        description: "Prepare iftar for your family with love and care.",
        difficulty: "Moderate",
      },
      {
        title: "Call a Relative",
        description:
          "Call a relative you haven't spoken to in a while to check on them.",
        difficulty: "Easy",
      },
      {
        title: "Attend Taraweeh",
        description: "Attend Taraweeh prayer at the masjid tonight.",
        difficulty: "Moderate",
      },
      {
        title: "Teach Someone",
        description:
          "Teach someone something beneficial about Islam that they didn't know.",
        difficulty: "Moderate",
      },
      {
        title: "Community Service",
        description:
          "Volunteer for a community service activity or at your local masjid.",
        difficulty: "Challenging",
      },
      {
        title: "Family Quran Time",
        description:
          "Gather your family for a short Quran reading and discussion session.",
        difficulty: "Moderate",
      },
      {
        title: "Visit the Sick",
        description:
          "Visit someone who is sick or elderly and bring them comfort.",
        difficulty: "Moderate",
      },
      {
        title: "Reconcile a Relationship",
        description:
          "Reach out to someone with whom you have a strained relationship and try to make amends.",
        difficulty: "Challenging",
      },
    ],
  },
  {
    id: "self-improvement",
    name: "Self-Improvement",
    description: "Challenges to develop better habits and improve yourself",
    icon: <Coffee className="w-6 h-6 text-primary" />,
    items: [
      {
        title: "Digital Detox",
        description:
          "Spend at least 3 hours away from all digital devices (outside of necessary work).",
        difficulty: "Challenging",
      },
      {
        title: "Learn 3 New Islamic Terms",
        description:
          "Research and learn the meaning of 3 Islamic terms you're not familiar with.",
        difficulty: "Easy",
      },
      {
        title: "Healthy Suhoor",
        description:
          "Prepare a nutritious suhoor that will sustain your energy throughout the fasting day.",
        difficulty: "Moderate",
      },
      {
        title: "Reflect on Your Day",
        description:
          "Before sleeping, reflect on your actions today and make intention for improvement tomorrow.",
        difficulty: "Easy",
      },
      {
        title: "Islamic Lecture",
        description:
          "Listen to an Islamic lecture or podcast on a topic you want to learn more about.",
        difficulty: "Easy",
      },
      {
        title: "Early to Bed",
        description:
          "Go to bed early tonight to ensure you can wake up for suhoor and Fajr with energy.",
        difficulty: "Moderate",
      },
      {
        title: "Gratitude Journal",
        description: "Write down 10 blessings you're grateful for today.",
        difficulty: "Easy",
      },
      {
        title: "Learn a Dua",
        description:
          "Memorize a new dua (supplication) and use it throughout the day.",
        difficulty: "Moderate",
      },
    ],
  },
  {
    id: "worship",
    name: "Extra Worship",
    description: "Challenges to increase your acts of worship during Ramadhan",
    icon: <PrayingHands className="w-6 h-6 text-primary" />,
    items: [
      {
        title: "Extended Sujood",
        description:
          "In your next prayer, make your sujood (prostration) longer and make heartfelt dua.",
        difficulty: "Easy",
      },
      {
        title: "Pray in the First Row",
        description:
          "Arrive early to the masjid to pray in the first row for at least one prayer today.",
        difficulty: "Moderate",
      },
      {
        title: "Duha Prayer",
        description:
          "Perform the Duha (mid-morning) prayer today - at least 2 rakats.",
        difficulty: "Easy",
      },
      {
        title: "Last Third of the Night",
        description:
          "Wake up in the last third of the night for worship and dua when Allah descends to the lowest heaven.",
        difficulty: "Challenging",
      },
      {
        title: "Pray with Khushoo",
        description:
          "Focus on improving your concentration (khushoo) in all five prayers today.",
        difficulty: "Moderate",
      },
      {
        title: "Istikharah Prayer",
        description:
          "If you have a decision to make, perform the Istikharah prayer for guidance.",
        difficulty: "Moderate",
      },
      {
        title: "Recite Allah's Names",
        description: "Recite and reflect on the 99 names of Allah.",
        difficulty: "Moderate",
      },
      {
        title: "I'tikaf Mini-Challenge",
        description:
          "Spend at least 1 hour in the masjid outside of prayer times, dedicated to worship.",
        difficulty: "Moderate",
      },
    ],
  },
];
