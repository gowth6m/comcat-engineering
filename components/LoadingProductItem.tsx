import React from "react";

export default function LoadingProductItem() {
  return (
    <>
      {/* Mobile */}
      <div className="overflow-hidden rounded-lg md:hidden animate-pulse">
        <div className="flex flex-row align-middle m-2">
          <div className="w-2/6 h-[6rem] bg-[var(--lightergrey)] rounded-lg mr-2"></div>

          <div className="flex flex-col w-full justify-between">
            <div className="bg-[var(--lightergrey)] w-full h-11 rounded-lg mx-auto"></div>
            <div className="flex flex-row align-middle rounded-lg justify-between w-full bg-[var(--lightergrey)] h-11"></div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="overflow-hidden rounded-lg hidden md:flex animate-pulse h-58">
        <div className="flex flex-col w-full h-full m-2">
          <div className="w-full h-48 bg-[var(--lightergrey)] mb-2 rounded-lg"></div>

          <div className="flex flex-col items-center justify-center text-black rounded-lg overflow-hidden gap-2">
            <div className="rounded-lg bg-[var(--lightergrey)] w-full h-10"></div>
            <div className="rounded-lg flex flex-row align-middle justify-between w-full bg-[var(--lightergrey)] h-10 "></div>
          </div>
        </div>
      </div>
    </>
  );
}
