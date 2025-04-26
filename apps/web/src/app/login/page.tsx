"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Apple, ArrowLeft, Facebook, Gamepad2 } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gaming-purple/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gaming-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-gaming-cyan/5 rounded-full blur-3xl" />

      {/* Header with back button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-gaming-purple transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to homepage</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-gaming-purple/20 bg-black/50 backdrop-blur-xl">
          <CardHeader className="space-y-1 items-center text-center">
            <div className="flex justify-center mb-2">
              <Gamepad2 className="h-12 w-12 text-gaming-purple animate-pulse-glow" />
            </div>
            <CardTitle className="text-2xl font-display font-bold">
              <span className="text-white">OVER</span>
              <span className="text-gaming-purple">SIX</span>
              <span className="ml-1 text-sm bg-gaming-purple text-white px-2 py-0.5 rounded-sm">
                GAMING
              </span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Login to access your gaming profile
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Email login form */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your_email@example.com"
                className="border-muted bg-background/30"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-gaming-purple hover:text-gaming-purple/80"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="border-muted bg-background/30"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="text-sm font-normal cursor-pointer"
              >
                Remember me
              </Label>
            </div>

            <Button className="w-full gaming-button">LOGIN</Button>

            {/* Social login section */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gaming-purple/20" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="border-gaming-blue/50 hover:bg-gaming-blue/10 hover:border-gaming-blue"
              >
                <Facebook className="h-5 w-5 text-gaming-blue" />
              </Button>
              <Button
                variant="outline"
                className="border-slate-300/50 hover:bg-slate-300/10 hover:border-slate-300"
                onClick={() => signIn("google")}
              >
                {/* <FcGoogle className="h-5 w-5" /> */}
                google
              </Button>
              <Button
                variant="outline"
                className="border-white/50 hover:bg-white/10 hover:border-white"
              >
                <Apple className="h-5 w-5 text-white" />
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-gaming-purple hover:text-gaming-purple/80 font-medium underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </div>

            <div className="text-xs text-center text-muted-foreground">
              By logging in, you agree to our
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-gaming-purple underline-offset-4 hover:underline mx-1"
              >
                Terms
              </Link>
              and
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-gaming-purple underline-offset-4 hover:underline ml-1"
              >
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
