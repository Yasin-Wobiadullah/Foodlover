import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "flex items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        icon: "bg-gray-100",
        filter: "bg-gray-200",
      },
      size: {
        default: "px-8 py-4",
        icon: "h-12 w-12",
        filter: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const buttonTextVariants = cva(
  "text-base font-bold",
  {
    variants: {
      variant: {
        default: "text-white",
        icon: "text-foreground",
        filter: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
