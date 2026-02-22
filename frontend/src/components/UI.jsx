// frontend/src/components/UI.jsx


import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging tailwind classes.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Premium Button component with CVA variants.
 */
export const buttonVariants = cva(
  "Button inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-500 text-white shadow-lg shadow-brand-500/20 hover:bg-brand-600 hover:shadow-brand-600/30",
        secondary:
          "bg-surface-800 text-surface-50 hover:bg-surface-700 shadow-md",
        outline:
          "border-2 border-surface-200 bg-transparent hover:bg-surface-50 text-surface-900",
        ghost: "hover:bg-surface-100 text-surface-600 font-normal",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

/**
 * Glassmorphism Card component.
 */
export const cardVariants = cva(
  "Card overflow-hidden rounded-2xl border transition-all",
  {
    variants: {
      variant: {
        glass: "bg-white/80 backdrop-blur-md border-white/20 shadow-xl",
        flat: "bg-surface-50 border-surface-200 shadow-sm",
        dark: "bg-surface-900/90 backdrop-blur-lg border-surface-800 text-white shadow-2xl",
      },
    },
    defaultVariants: {
      variant: "glass",
    },
  }
);

/**
 * Badge component for status tags.
 */
export const badgeVariants = cva(
  "Badge inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-100 text-brand-800",
        secondary: "border-transparent bg-surface-100 text-surface-800",
        destructive: "border-transparent bg-red-100 text-red-800",
        outline: "text-surface-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
