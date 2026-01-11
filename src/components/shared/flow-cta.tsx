"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { groupConfig, type GroupNumber } from "@/lib/flow-config";

interface FlowCTAProps {
  href: string;
  label: string;
  description?: string;
  group: GroupNumber;
  primary?: boolean;
  className?: string;
}

export function FlowCTA({
  href,
  label,
  description,
  group,
  primary = false,
  className,
}: FlowCTAProps) {
  const config = groupConfig[group];
  const Icon = config.icon;

  if (primary) {
    return (
      <Button
        asChild
        size="lg"
        className={cn(
          "w-full justify-between gap-3 h-auto py-4 px-5",
          "bg-gradient-to-r",
          config.gradient,
          "text-white border-0 shadow-lg",
          "hover:opacity-90 transition-opacity",
          className
        )}
      >
        <Link href={href}>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Icon className="size-5" />
            </div>
            <div className="text-left">
              <p className="font-semibold">{label}</p>
              {description && (
                <p className="text-sm opacity-80 font-normal">{description}</p>
              )}
            </div>
          </div>
          <ArrowRight className="size-5" />
        </Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-between gap-3 h-auto py-3 px-4",
        "bg-white/60 dark:bg-white/10 backdrop-blur-sm",
        "border border-black/5 dark:border-white/10",
        "hover:bg-white/80 dark:hover:bg-white/20",
        "transition-all",
        className
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "size-9 rounded-lg flex items-center justify-center",
              "bg-gradient-to-br",
              config.gradient,
              "text-white"
            )}
          >
            <Icon className="size-4" />
          </div>
          <div className="text-left">
            <p className="font-medium text-neutral-700 dark:text-neutral-200">
              {label}
            </p>
            {description && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
        </div>
        <ArrowRight className="size-4 text-neutral-400" />
      </Link>
    </Button>
  );
}

// Compact inline version
export function FlowCTAInline({
  href,
  label,
  group,
  className,
}: {
  href: string;
  label: string;
  group: GroupNumber;
  className?: string;
}) {
  const config = groupConfig[group];

  return (
    <Badge
      asChild
      variant="secondary"
      className={cn(
        "cursor-pointer gap-1.5 py-1.5 px-3",
        "bg-white/60 dark:bg-white/10 backdrop-blur-sm",
        "hover:bg-white/80 dark:hover:bg-white/20",
        "border border-black/5 dark:border-white/10",
        "transition-all",
        className
      )}
    >
      <Link href={href}>
        <span
          className={cn(
            "size-1.5 rounded-full",
            "bg-gradient-to-r",
            config.gradient
          )}
        />
        {label}
        <ArrowRight className="size-3" />
      </Link>
    </Badge>
  );
}
