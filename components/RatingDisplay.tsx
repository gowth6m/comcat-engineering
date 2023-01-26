import React from "react";
import { IconStar } from "./CustomIcons";

export default function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex flex-row space-x-1">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((x) =>
        x <= rating ? <div key={x}>★</div> : <div key={x}>☆</div>
      )}
    </div>
  );
}
