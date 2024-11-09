import Link from "next/link";
import React from "react";
import { Image } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-cyan-500 font-serif font-semibold">
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center p-24 text-white">
        <Image
          width={300}
          alt="Champtions League Logo"
          src="/images/cl-logo.png"
          className="mb-8"
        />
        <h1 className="text-5xl mb-5 font-bold">
          Champions League Fantasy Dashboard
        </h1>
        <p className="text-center text-xl mb-5">Welcome To Your Dashboard</p>
      </main>
    </div>
  );
}
