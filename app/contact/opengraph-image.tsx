import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "@/lib/og";

export const alt = "Contact · ITAI";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Contact"
        title="Have a project in mind? Let's talk."
        description="Send a note. I'll get back within one working day with thoughts and a clear next step."
        footer="Direct, no middlemen"
      />
    ),
    { ...size },
  );
}
