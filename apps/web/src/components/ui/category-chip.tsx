import { twMerge } from "tailwind-merge";

type CategoryChipProps = {
  name: string;
  color: string;
};

export function CategoryChip(props: CategoryChipProps) {
  return (
    <div
      className={twMerge(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 absolute top-3 left-3 ",
        getCategoryColor(props.color)
      )}
    >
      {props.name}
    </div>
  );
}

function getCategoryColor(color: string): string {
  switch (color) {
    case "purple":
      return "bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/30";
    case "blue":
      return "bg-gaming-blue/20 text-gaming-blue border border-gaming-blue/30";
    case "green":
      return "bg-gaming-green/20 text-gaming-green border border-gaming-green/30";
    case "pink":
      return "bg-gaming-pink/20 text-gaming-pink border border-gaming-pink/30";
    case "orange":
      return "bg-gaming-orange/20 text-gaming-orange border border-gaming-orange/30";
    case "cyan":
      return "bg-gaming-cyan/20 text-gaming-cyan border border-gaming-cyan/30";
    default:
      return "bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/30";
  }
}
