import type { Metadata } from "next";
import ContactContent from "./Content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind? Send a note and I'll be in touch within a day. Direct, no middlemen.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · ITAI",
    description:
      "Send a note. Direct collaboration with the person designing and building the system.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
