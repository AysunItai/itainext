import "server-only";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

let cachedHtml: ((md: string) => Promise<string>) | null = null;

function buildPipeline() {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["heading-anchor"] },
    })
    .use(rehypePrettyCode, {
      theme: { dark: "github-dark-dimmed", light: "github-light" },
      keepBackground: false,
      defaultLang: "plaintext",
    })
    .use(rehypeStringify, { allowDangerousHtml: true });

  return async (md: string) => {
    const file = await processor.process(md);
    return String(file);
  };
}

export async function renderMarkdown(markdown: string): Promise<string> {
  if (!cachedHtml) cachedHtml = buildPipeline();
  return cachedHtml(markdown);
}

export default async function MarkdownRenderer({ source }: { source: string }) {
  const html = await renderMarkdown(source);
  return (
    <div
      className="prose prose-itai max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
