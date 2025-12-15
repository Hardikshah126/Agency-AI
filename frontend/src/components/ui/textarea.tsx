import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full rounded-xl border bg-background text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 md:text-sm",
  {
    variants: {
      variant: {
        default: "border-input shadow-soft hover:border-primary/30 focus:border-primary/50",
        glass: "glass border-0",
        outline: "border-2 border-border bg-transparent hover:border-primary/30",
      },
      textareaSize: {
        default: "min-h-[80px] px-4 py-3",
        sm: "min-h-[60px] px-3 py-2 text-sm",
        lg: "min-h-[120px] px-5 py-4",
        xl: "min-h-[200px] px-6 py-5",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, textareaSize, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, textareaSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
