// components/DropdownComponent.tsx
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({
  label,
  options,
  selected,
  onSelect,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-[Buttonfont] bg-indigo-600 text-white p-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        {selected || `Select ${label}`}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-black rounded-lg shadow-lg border border-gray-200 mt-1 p-2 w-48">
        <DropdownMenuLabel className="text-gray-700 font-semibold">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onSelect(option)}
            className="cursor-pointer"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownComponent;
