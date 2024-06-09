"use client";
import { MultiStepLoader } from "../ui/multi-step-loader";

const loadingStates = [
  {
    text: "Loading...",
  },
  {
    text: "Geting Data..",
  },
  {
    text: "Almost Done..",
  },
  {
    text: "Lat's begin",
  },
  {
    text: "Done",
  },
];

export function Loader() {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      {/* Core Loader Modal */}
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={true}
        duration={2000}
      />

      {/* The buttons are for demo only, remove it in your actual code ⬇️ */}
    </div>
  );
}
