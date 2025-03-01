"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CategorySelector } from "./CategorySelector";
import { ChallengeReveal } from "./ChallengeReveal";
import { challenges } from "./ChallengesData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { VideoModal } from "./VideoModal";

interface Challenge {
  title: string;
  description: string;
  difficulty: string;
  type?: string;
  videoUrl?: string;
  isLocalFile?: boolean;
}

interface AcceptedChallenge extends Challenge {
  id: string;
  acceptedAt: number;
}

export default function ChallengesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [acceptedChallenges, setAcceptedChallenges] = useState<
    AcceptedChallenge[]
  >([]);
  const [remainingChallenges, setRemainingChallenges] = useState<number>(3);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [videoChallenge, setVideoChallenge] = useState<Challenge | null>(null);

  // Add this effect to scroll to top when navigation state changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory, isRevealed]);

  // Load previously accepted challenges on component mount
  useEffect(() => {
    const loadChallenges = () => {
      const storedChallenges = localStorage.getItem("acceptedChallenges");
      if (storedChallenges) {
        const parsedChallenges = JSON.parse(
          storedChallenges
        ) as AcceptedChallenge[];

        // Filter out challenges from previous days
        const today = new Date().setHours(0, 0, 0, 0);
        const todaysChallenges = parsedChallenges.filter((c) => {
          const challengeDate = new Date(c.acceptedAt).setHours(0, 0, 0, 0);
          return challengeDate === today;
        });

        setAcceptedChallenges(todaysChallenges);
        setRemainingChallenges(Math.max(0, 3 - todaysChallenges.length));

        // Clean up old challenges
        if (todaysChallenges.length !== parsedChallenges.length) {
          localStorage.setItem(
            "acceptedChallenges",
            JSON.stringify(todaysChallenges)
          );
        }
      }
    };

    loadChallenges();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedChallenge(null);
    setIsRevealed(false);
  };

  const handleChallengeSelect = (challenge: Challenge) => {
    if (remainingChallenges <= 0) return;
    setSelectedChallenge(challenge);
    setIsRevealed(true);
  };

  const handleRandomChallenge = () => {
    if (!selectedCategory || remainingChallenges <= 0) return;

    const categoryItems =
      challenges.find((c) => c.id === selectedCategory)?.items || [];
    const randomIndex = Math.floor(Math.random() * categoryItems.length);
    setSelectedChallenge(categoryItems[randomIndex]);
    setIsRevealed(true);
  };

  const resetSelection = () => {
    setSelectedChallenge(null);
    setIsRevealed(false);
  };

  const acceptChallenge = () => {
    if (!selectedChallenge || remainingChallenges <= 0) return;

    const newAcceptedChallenge: AcceptedChallenge = {
      ...selectedChallenge,
      id: `${selectedCategory}-${Date.now()}`,
      acceptedAt: Date.now(),
    };

    const updatedChallenges = [...acceptedChallenges, newAcceptedChallenge];
    setAcceptedChallenges(updatedChallenges);
    localStorage.setItem(
      "acceptedChallenges",
      JSON.stringify(updatedChallenges)
    );

    setRemainingChallenges((prev) => Math.max(0, prev - 1));

    // Check if this is a video challenge
    if ("type" in selectedChallenge && selectedChallenge.type === "video") {
      setVideoChallenge(selectedChallenge);
      setVideoModalOpen(true);
    }

    resetSelection();
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Ramadhan Challenges</h1>
      </div>

      {/* Display accepted challenges only on the category selection page */}
      {!selectedCategory && acceptedChallenges.length > 0 && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Today's Accepted Challenges
            </h2>
            <div className="space-y-4">
              {acceptedChallenges.map((challenge) => (
                <div key={challenge.id} className="p-4 bg-primary/5 rounded-lg">
                  <h3 className="font-medium">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Show remaining challenges indicator on all pages */}
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm font-medium">
          Challenges remaining today: {remainingChallenges}
        </span>
        {remainingChallenges === 0 && (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            Daily limit reached
          </Badge>
        )}
      </div>

      {remainingChallenges === 0 ? (
        <Alert className="mb-8">
          <Lock className="h-4 w-4" />
          <AlertTitle>Daily limit reached</AlertTitle>
          <AlertDescription>
            You've accepted 3 challenges today. Come back tomorrow for more!
          </AlertDescription>
        </Alert>
      ) : (
        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="mb-4 text-muted-foreground">
              Challenge yourself this Ramadhan with special tasks to enhance
              your spiritual journey. Select a category, then either pick a
              specific challenge number or get a random one.
            </p>

            {!selectedCategory ? (
              <CategorySelector
                categories={challenges}
                onSelect={handleCategorySelect}
              />
            ) : !isRevealed ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {challenges.find((c) => c.id === selectedCategory)?.name}
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory("")}
                  >
                    Change Category
                  </Button>
                </div>
                <ChallengeReveal
                  challenges={
                    challenges.find((c) => c.id === selectedCategory)?.items ||
                    []
                  }
                  onSelect={handleChallengeSelect}
                  onRandom={handleRandomChallenge}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Challenge</h2>
                  <Button variant="outline" onClick={resetSelection}>
                    New Challenge
                  </Button>
                </div>
                {selectedChallenge && (
                  <div className="p-6 text-center bg-primary/5 rounded-xl">
                    <h3 className="mb-2 text-2xl font-bold text-primary">
                      {selectedChallenge.title}
                    </h3>
                    <p className="mb-4">{selectedChallenge.description}</p>
                    <div className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                      {selectedChallenge.difficulty}
                    </div>
                  </div>
                )}
                <Button className="w-full" onClick={acceptChallenge}>
                  Accept Challenge
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Video Modal */}
      {videoChallenge && (
        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          videoUrl={videoChallenge.videoUrl || ""}
          title={videoChallenge.title}
          isLocalFile={videoChallenge.isLocalFile || false}
        />
      )}
    </div>
  );
}
