import { ref } from "process";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={twMerge(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}
Card.displayName = "Card";

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={twMerge("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}
CardHeader.displayName = "CardHeader";

function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <h3
      ref={ref}
      className={twMerge(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}
CardTitle.displayName = "CardTitle";

function CardDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <p
      ref={ref}
      className={twMerge("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
CardDescription.displayName = "CardDescription";

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div ref={ref} className={twMerge("p-6 pt-0", className)} {...props} />
  );
}
CardContent.displayName = "CardContent";

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={twMerge("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
