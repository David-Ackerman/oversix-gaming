import { Gamepad2 } from "lucide-react";
import Link from "next/link";

export function OversixGaming() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center">
        <Gamepad2 className="w-8 h-8 mr-2 text-gaming-purple animate-pulse-glow bg-none" />
        <span className="text-2xl font-display font-bold flex items-center">
          <span className="text-white">OVER</span>
          <span className="text-gaming-purple">SIX</span>
          <span className="ml-1 text-sm bg-gaming-purple text-white px-2 py-0.5 rounded-sm">
            GAMING
          </span>
        </span>
      </Link>
    </div>
  );
}
