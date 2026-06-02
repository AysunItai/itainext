import type { Metadata } from "next";
import ContactContent from "./Content";

export const metadata: Metadata = {
  // Was just "Contact" (14 chars with template). Adding the action and
  // value reduces bounce from SERPs — searchers know what to expect.
  title: "Contact — Start a Project or Ask a Question",
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
