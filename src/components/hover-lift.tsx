"use client";
import * as React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { useHoverLift } from "@/lib/use-hover-lift";
export interface CardHoverLiftProps extends HTMLMotionProps<"div"> {
  liftDistance?: number;
  duration?: number;
  addShadow?: boolean;
}
export function CardHoverLift({
  children,
  className,
  liftDistance = 8,
  duration = 0.2,
  ...props
}: CardHoverLiftProps) {
  const liftProps = useHoverLift({
    liftDistance,
    duration,
  });
  return (
    <motion.div
      {...liftProps}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
