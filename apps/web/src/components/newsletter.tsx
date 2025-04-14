"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Thanks for subscribing!", {
        description: "You'll receive our gaming newsletter starting next week.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="gaming-card overflow-hidden">
        <div className="p-8 md:p-12 bg-gradient-to-r from-gaming-purple/20 to-gaming-blue/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              Subscribe to the PixelPulse Newsletter
            </h2>
            <p className="text-gray-300 mb-6">
              Get the latest gaming news, reviews, and exclusive content
              delivered directly to your inbox.
            </p>

            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-grow px-4 py-3 rounded-md bg-secondary/50 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gaming-purple"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gaming-button whitespace-nowrap animate-pulse-glow"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>

            <p className="text-gray-400 text-xs mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
