"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import { useSprings, animated, SpringValue, to } from "@react-spring/web";

// Use proper type definition for animation states
type AnimationStep = Record<string, SpringValue<any>>;
type AnimationObject = {
  filter?: string | SpringValue<string>;
  opacity?: number | SpringValue<number>;
  transform?: string | SpringValue<string>;
  [key: string]: any;
};

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, any>;
  animationTo?: Record<string, any>[];
  easing?: (t: number) => number | string;
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "easeOutCubic",
  onAnimationComplete,
}) => {
  const elements = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  const [inView, setInView] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);
  const isAnimatingRef = useRef(false);
  const textRef = useRef(text);
  const animationIdRef = useRef(0);

  // Reset animation state when text changes
  useEffect(() => {
    if (textRef.current !== text) {
      // Increment animation ID to ensure we start fresh
      animationIdRef.current++;
      animatedCount.current = 0;
      isAnimatingRef.current = false;
      setIsComplete(false);
      setInView(false);
      textRef.current = text;

      // Re-register intersection observer
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setInView(true);
              observer.unobserve(ref.current!);
            }
          },
          { threshold, rootMargin }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
      }
    }
  }, [text, threshold, rootMargin]);

  // Initial intersection observer setup
  useEffect(() => {
    if (!isComplete && !isAnimatingRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isAnimatingRef.current) {
            setInView(true);
            isAnimatingRef.current = true;
            observer.unobserve(ref.current!);
          }
        },
        { threshold, rootMargin }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }
  }, [threshold, rootMargin, isComplete]);

  // Default animations based on direction
  const defaultFrom = useMemo(
    (): AnimationObject =>
      direction === "top"
        ? {
            filter: "blur(10px)",
            opacity: 0,
            transform: "translate3d(0,-50px,0)",
          }
        : {
            filter: "blur(10px)",
            opacity: 0,
            transform: "translate3d(0,50px,0)",
          },
    [direction]
  );

  const defaultTo = useMemo(
    (): AnimationObject[] => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        transform:
          direction === "top"
            ? "translate3d(0,5px,0)"
            : "translate3d(0,-5px,0)",
      },
      { filter: "blur(0px)", opacity: 1, transform: "translate3d(0,0,0)" },
    ],
    [direction]
  );

  // Capture current animation ID to ensure we don't process stale animations
  const currentAnimationId = animationIdRef.current;

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to:
        inView && !isComplete
          ? async (next: (step: AnimationObject) => Promise<void>) => {
              try {
                // Skip animation if we've moved to a new animation cycle
                if (currentAnimationId !== animationIdRef.current) return;

                isAnimatingRef.current = true;

                for (const step of animationTo || defaultTo) {
                  // Skip if animation ID changed during animation
                  if (currentAnimationId !== animationIdRef.current) return;
                  await next(step);
                }

                // Only increment if component is still mounted and animation is current
                if (
                  ref.current &&
                  currentAnimationId === animationIdRef.current
                ) {
                  animatedCount.current += 1;
                  if (animatedCount.current === elements.length) {
                    setIsComplete(true);
                    isAnimatingRef.current = false;
                    if (onAnimationComplete) {
                      onAnimationComplete();
                    }
                  }
                }
              } catch (error) {
                // Handle potential animation cancellation
                console.debug("Animation cancelled");
              }
            }
          : isComplete
          ? { filter: "blur(0px)", opacity: 1, transform: "translate3d(0,0,0)" }
          : animationFrom || defaultFrom,
      delay: i * delay,
      config: { easing: easing as any },
    }))
  );

  // Create a wrapper component for animated.span to fix typing issues
  const AnimatedSpan = animated.span as any;

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {springs.map((props, index) => (
        <AnimatedSpan
          key={`${textRef.current}-${index}`}
          style={props}
          className="inline-block transition-transform will-change-[transform,filter,opacity]"
        >
          {elements[index] === " " ? "\u00A0" : elements[index]}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </AnimatedSpan>
      ))}
    </p>
  );
};

export default BlurText;
