import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from "@/lib/og";

export const alt = "About · ITAI";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="About"
        title="An independent studio. Engineering depth, design restraint."
        description="Founded by Aysun Itai. Building modern digital systems that ambitious teams actually use every day."
      />
    ),
    { ...size },
  );
}
