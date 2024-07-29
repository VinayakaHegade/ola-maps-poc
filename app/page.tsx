"use client";

import { SearchBar } from "@/components/SearchBar";
import { searchOlaLocations } from "@/lib/api";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Ola Maps Search</h1>
        <SearchBar onSearch={searchOlaLocations} />
      </div>
    </div>
  );
}
