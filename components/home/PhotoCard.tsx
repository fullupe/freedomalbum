"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/types";
import { getImageUrl } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface PhotoCardProps {
  photo: Photo;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <Link href={`/photos/${photo.id}`}>
      <div className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-[3/4] overflow-hidden">
      
          <Image
            src={getImageUrl(photo.image_url, 600)}
            alt={photo.title}
            fill
            className={cn(
              "object-cover transition-all duration-300 group-hover:scale-105",
              isLoading ? "blur-sm" : "blur-0"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 43vw"
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
        <div className="p-4">
          <h3 className="font-cormorant text-xl font-medium text-card-foreground">
            {photo.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {photo.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
export const revalidate = 0 ;