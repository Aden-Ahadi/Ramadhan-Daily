"use client";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlurText from "./BlurText";
import { AuroraText } from "@/components/magicui/aurora-text";

import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { useTheme } from "next-themes";

export function Hero() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  return (
    <div className="w-full py-18 lg:py-39">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">We&apos;re live!</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1>
                <BlurText
                  text="Your daily dose of Ramadhan!🌙"
                  delay={170}
                  animateBy="words"
                  direction="top"
                  className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular"
                />
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Ready to unlock a month of{" "}
                <AuroraText className="text-l font-semibold tracking-tighter md:text-2xl lg:text-xl">
                  wonder
                </AuroraText>
                ? Dive into a world where everyday feels like a celebration.
                <br />
                Let's make this{" "}
                <LineShadowText
                  className="italic text-balance text-xl font-semibold leading-none tracking-tighter sm:text-2xl md:text-2xl"
                  shadowColor={shadowColor}
                >
                  Ramadhan
                </LineShadowText>{" "}
                unforgettable .
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button size="lg" className="gap-4" variant="outline">
                btn <PhoneCall className="w-4 h-4" />
              </Button>
              <Button size="lg" className="gap-4">
                btn <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-muted rounded-md h-32"></div>
            <div className="bg-muted rounded-md aspect-video"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
