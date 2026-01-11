"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  easing?: "linear" | "easeOut" | "easeInOut" | "spring";
}

const easingFunctions = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  spring: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 :
      Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

export function AnimatedNumber({
  value,
  duration = 1000,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
  easing = "easeOut",
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = value;
    const startTime = performance.now();
    const easingFn = easingFunctions[easing];

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);

      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        previousValue.current = endValue;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, easing]);

  const formattedValue = displayValue.toFixed(decimals);

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

// Percentage variant
export function AnimatedPercentage({
  value,
  className,
  ...props
}: Omit<AnimatedNumberProps, "suffix">) {
  return (
    <AnimatedNumber
      value={value}
      suffix="%"
      className={className}
      {...props}
    />
  );
}

// Currency variant
export function AnimatedCurrency({
  value,
  currency = "MYR",
  className,
  ...props
}: Omit<AnimatedNumberProps, "prefix" | "decimals"> & { currency?: string }) {
  return (
    <AnimatedNumber
      value={value}
      prefix={`${currency} `}
      decimals={2}
      className={className}
      {...props}
    />
  );
}

// Counter with optional target display
export function AnimatedCounter({
  current,
  total,
  className,
}: {
  current: number;
  total: number;
  className?: string;
}) {
  return (
    <span className={cn("font-semibold tabular-nums", className)}>
      <AnimatedNumber value={current} />
      <span className="text-neutral-400 dark:text-neutral-500 mx-1">/</span>
      <span className="text-neutral-500 dark:text-neutral-400">{total}</span>
    </span>
  );
}
