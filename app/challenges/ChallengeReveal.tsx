import { Button } from "@/components/ui/button";

interface Challenge {
  title: string;
  description: string;
  difficulty: string;
}

interface ChallengeRevealProps {
  challenges: Challenge[];
  onSelect: (challenge: Challenge) => void;
  onRandom: () => void;
}

export function ChallengeReveal({
  challenges,
  onSelect,
  onRandom,
}: ChallengeRevealProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Select a challenge number</h3>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {challenges.map((challenge, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full h-12 text-lg font-medium"
              onClick={() => onSelect(challenge)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center pt-4 border-t">
        <p className="mb-3 text-sm text-center text-muted-foreground">
          Not sure which to pick? Let us choose for you!
        </p>
        <Button onClick={onRandom} className="px-8">
          Random Challenge
        </Button>
      </div>
    </div>
  );
}
