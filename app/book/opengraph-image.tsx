import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "@/lib/og";

export const alt = "Book a consultation · ITAI";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Book a call"
        title="Free 20-minute consultation."
        description="Bring your goal. Leave with a clear next step. Zoom, on a time that works for you."
        footer="20 min · on Zoom"
      />
    ),
    { ...size },
  );
}
