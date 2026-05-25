import type { Metadata } from "next";
import Editor from "@/components/admin/Editor";

export const metadata: Metadata = { title: "New post" };

export default function NewPostPage() {
  return <Editor mode="create" />;
}
