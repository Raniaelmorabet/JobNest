import * as React from "react";
import { cn } from "../../lib/utils.js";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}
function Card({ className, ...props }: CardProps) {
  return (
      <div
          data-slot="card"
          className={cn(
              "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
              className
          )}
          {...props}
      />
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
      <div
          data-slot="card-header"
          className={cn("flex flex-col gap-1.5 px-6", className)}
          {...props}
      />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
      <div
          data-slot="card-title"
          className={cn("leading-none font-semibold", className)}
          {...props}
      />
  );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
      <div
          data-slot="card-description"
          className={cn("text-muted-foreground text-sm", className)}
          {...props}
      />
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function CardContent({ className, ...props }: CardContentProps) {
  return (
      <div
          data-slot="card-content"
          className={cn("px-6", className)}
          {...props}
      />
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
      <div
          data-slot="card-footer"
          className={cn("flex items-center px-6", className)}
          {...props}
      />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };