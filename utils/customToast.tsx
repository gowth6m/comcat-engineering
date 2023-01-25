import React from "react";
import toast from "react-hot-toast";

export function customToast(message: string) {
  toast((t) => (
    <div className="flex items-start flex-row align-middle">
      <div className="p-2 align-middle my-auto">{message}</div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="m-0 w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-sm font-medium text-[var(--blue)] hover:text-[var(--blue)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        >
          Close
        </button>
      </div>
    </div>
  ));
}
