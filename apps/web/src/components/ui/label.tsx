import * as LabelPrimitive from "@radix-ui/react-label";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <LabelPrimitive.Root
      className={twMerge(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
}
