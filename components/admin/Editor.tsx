"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { calculateReadingTime, deriveExcerpt, slugify } from "@/lib/blog";
import AdminNav from "@/components/admin/AdminNav";

export type EditorPost = {
  id: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;
  published: boolean;
  notifiedAt: string | null;
};

const EMPTY_POST: EditorPost = {
  id: null,
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  tags: "",
  published: false,
  notifiedAt: null,
};

type Props = {
  initial?: Partial<EditorPost>;
  mode: "create" | "edit";
  subscriberCount?: number;
};

export default function Editor({ initial, mode, subscriberCount = 0 }: Props) {
  const router = useRouter();
  const [post, setPost] = useState<EditorPost>({ ...EMPTY_POST, ...initial });
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [excerptTouched, setExcerptTouched] = useState(Boolean(initial?.excerpt));
  const [submitting, setSubmitting] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"split" | "write" | "preview">("split");
  const [showSettings, setShowSettings] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = useMemo(
    () => post.content.trim().split(/\s+/).filter(Boolean).length,
    [post.content],
  );
  const readingTime = useMemo(
    () => calculateReadingTime(post.content),
    [post.content],
  );

  const update = <K extends keyof EditorPost>(key: K, value: EditorPost[K]) =>
    setPost((p) => ({ ...p, [key]: value }));

  function onTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setPost((p) => ({
      ...p,
      title: next,
      slug: slugTouched ? p.slug : slugify(next),
    }));
  }

  function wrapSelection(before: string, after = before) {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e } = ta;
    const value = ta.value;
    const inner = value.slice(s, e);
    const next = value.slice(0, s) + before + inner + after + value.slice(e);
    update("content", next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = s + before.length;
      ta.selectionEnd = e + before.length;
    });
  }

  function insertAtCursor(text: string) {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e } = ta;
    const value = ta.value;
    const next = value.slice(0, s) + text + value.slice(e);
    update("content", next);
    requestAnimationFrame(() => {
      ta.focus();
      const pos = s + text.length;
      ta.selectionStart = pos;
      ta.selectionEnd = pos;
    });
  }

  function prefixLine(prefix: string) {
    const ta = textareaRef.current;
    if (!ta) return;
    const value = ta.value;
    const start = ta.selectionStart;
    const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    update("content", next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.selectionStart = start + prefix.length;
      ta.selectionEnd = start + prefix.length;
    });
  }

  const saveRef = useRef<((args: { publish: boolean }) => Promise<void>) | null>(
    null,
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;
      if (e.key === "s") {
        e.preventDefault();
        void saveRef.current?.({ publish: post.published });
      } else if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        void saveRef.current?.({ publish: true });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [post.published]);

  const save = useCallback(
    async ({ publish }: { publish: boolean }) => {
      if (submitting) return;
      if (!post.title.trim()) {
        setError("Title is required.");
        return;
      }
      if (!post.content.trim()) {
        setError("Content is empty.");
        return;
      }
      setSubmitting(true);
      setError(null);

      const payload = {
        title: post.title.trim(),
        slug: (post.slug || slugify(post.title)).trim(),
        excerpt: (excerptTouched ? post.excerpt : deriveExcerpt(post.content)).trim(),
        content: post.content,
        coverImage: post.coverImage.trim() || null,
        tags: post.tags,
        published: publish,
      };

      try {
        const url = post.id ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
        const method = post.id ? "PATCH" : "POST";
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Failed to save.");
        }
        const saved = (await response.json()) as { post?: { id: string } };
        setSavedAt(new Date());
        update("published", publish);
        if (mode === "create" && saved.post?.id) {
          router.replace(`/admin/posts/${saved.post.id}/edit`);
          router.refresh();
        } else {
          router.refresh();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save.");
      } finally {
        setSubmitting(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [post, excerptTouched, mode, submitting],
  );

  useEffect(() => {
    saveRef.current = save;
  }, [save]);

  const broadcast = useCallback(
    async ({ force }: { force: boolean } = { force: false }) => {
      if (!post.id || notifying) return;
      if (!post.published) {
        setNotifyMessage("Publish the post first.");
        return;
      }
      if (subscriberCount === 0) {
        setNotifyMessage("No confirmed subscribers yet.");
        return;
      }
      const verb = post.notifiedAt ? "re-send" : "send";
      const ok = window.confirm(
        `${verb === "re-send" ? "Re-send" : "Send"} this post to ${subscriberCount} subscriber${
          subscriberCount === 1 ? "" : "s"
        }? This cannot be undone.`,
      );
      if (!ok) return;

      setNotifying(true);
      setNotifyMessage(null);
      try {
        const response = await fetch(`/api/admin/posts/${post.id}/notify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ force }),
        });
        const data = (await response.json().catch(() => ({}))) as {
          ok?: boolean;
          sent?: number;
          failed?: number;
          error?: string;
        };
        if (!response.ok) throw new Error(data.error || "Send failed.");
        update("notifiedAt", new Date().toISOString());
        setNotifyMessage(
          `Sent to ${data.sent ?? subscriberCount} subscriber${
            (data.sent ?? subscriberCount) === 1 ? "" : "s"
          }.${data.failed ? ` (${data.failed} failed)` : ""}`,
        );
        router.refresh();
      } catch (err) {
        setNotifyMessage(
          err instanceof Error ? err.message : "Send failed.",
        );
      } finally {
        setNotifying(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [post.id, post.published, post.notifiedAt, notifying, subscriberCount],
  );

  return (
    <>
      <AdminNav
        current={mode === "create" ? "new" : "edit"}
        rightSlot={
          <span className="hidden text-[11px] font-mono uppercase tracking-[0.14em] text-ink/40 sm:inline">
            {savedAt
              ? `Saved ${savedAt.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}`
              : post.id
                ? "Up to date"
                : "Unsaved"}
          </span>
        }
      />

      <div className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-3">
          <ViewSwitch value={view} onChange={setView} />
          <Toolbar
            onBold={() => wrapSelection("**")}
            onItalic={() => wrapSelection("_")}
            onH2={() => prefixLine("## ")}
            onH3={() => prefixLine("### ")}
            onQuote={() => prefixLine("> ")}
            onLink={() => {
              const url = window.prompt("Link URL");
              if (!url) return;
              wrapSelection("[", `](${url})`);
            }}
            onImage={() => {
              const url = window.prompt("Image URL");
              if (!url) return;
              insertAtCursor(`\n![](${url})\n`);
            }}
            onCode={() => wrapSelection("`")}
            onCodeBlock={() => insertAtCursor("\n```ts\n\n```\n")}
            onList={() => prefixLine("- ")}
            onDivider={() => insertAtCursor("\n\n---\n\n")}
          />
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSettings((v) => !v)}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-ink/65 transition hover:border-ink/30 hover:text-ink"
            >
              {showSettings ? "Hide settings" : "Settings"}
            </button>
            <button
              type="button"
              onClick={() => save({ publish: false })}
              disabled={submitting}
              className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[12px] text-ink/75 transition hover:border-ink/35 hover:text-ink disabled:opacity-50"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={() => save({ publish: true })}
              disabled={submitting}
              className="rounded-full bg-ink px-4 py-1.5 text-[12px] font-medium text-paper transition hover:bg-ink/90 disabled:opacity-50"
            >
              {post.published ? "Update" : "Publish"}
            </button>
            {mode === "edit" && post.published && post.id ? (
              <BroadcastButton
                notifiedAt={post.notifiedAt}
                subscriberCount={subscriberCount}
                notifying={notifying}
                onSend={() => broadcast({ force: false })}
                onResend={() => broadcast({ force: true })}
              />
            ) : null}
          </div>
        </div>
        {notifyMessage ? (
          <div className="border-t border-ink/10 bg-paper-soft px-6 py-2 text-center text-[12px] text-ink/70">
            {notifyMessage}
          </div>
        ) : null}

        {showSettings ? (
          <SettingsPanel
            post={post}
            slugTouched={slugTouched}
            onSlugChange={(v) => {
              setSlugTouched(true);
              update("slug", slugify(v));
            }}
            excerptTouched={excerptTouched}
            onExcerptChange={(v) => {
              setExcerptTouched(true);
              update("excerpt", v);
            }}
            onCoverChange={(v) => update("coverImage", v)}
            onTagsChange={(v) => update("tags", v)}
          />
        ) : null}
      </div>

      {error ? (
        <div className="border-b border-red-500/20 bg-red-500/[0.06] px-6 py-2 text-center text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-6 py-8">
        <input
          type="text"
          value={post.title}
          onChange={onTitleChange}
          placeholder="Untitled essay…"
          aria-label="Post title"
          className="mb-6 w-full bg-transparent text-4xl font-semibold tracking-tight text-ink outline-none placeholder:text-ink/25 sm:text-5xl"
        />

        <div
          className={`grid gap-8 ${
            view === "split"
              ? "lg:grid-cols-2"
              : "lg:grid-cols-1"
          }`}
        >
          {view !== "preview" ? (
            <div className="flex flex-col">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                Markdown
              </p>
              <textarea
                ref={textareaRef}
                value={post.content}
                onChange={(e) => update("content", e.target.value)}
                placeholder="Start writing. Markdown supported. Use Cmd/Ctrl+S to save."
                spellCheck
                className="min-h-[60vh] w-full resize-y rounded-2xl border border-ink/10 bg-paper-soft p-5 font-mono text-[14px] leading-relaxed text-ink outline-none focus:border-ink/30"
                style={{ tabSize: 2 }}
              />
              <div className="mt-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.14em] text-ink/45">
                <span>
                  {wordCount} word{wordCount === 1 ? "" : "s"}
                </span>
                <span>{readingTime} min read</span>
              </div>
            </div>
          ) : null}

          {view !== "write" ? (
            <div className="flex flex-col">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                Preview
              </p>
              <div className="min-h-[60vh] rounded-2xl border border-ink/10 bg-paper p-8">
                {post.title ? (
                  <h1 className="mb-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    {post.title}
                  </h1>
                ) : null}
                {post.content ? (
                  <article className="prose prose-itai max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {post.content}
                    </ReactMarkdown>
                  </article>
                ) : (
                  <p className="text-sm italic text-ink/40">
                    Nothing to preview yet. Start writing on the left.
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <p className="mt-8 text-center text-[11px] font-mono uppercase tracking-[0.14em] text-ink/35">
          Cmd/Ctrl + S to save · Cmd/Ctrl + Shift + Enter to publish ·{" "}
          <Link href="/admin" className="underline-offset-4 hover:underline">
            Back to dashboard
          </Link>
        </p>
      </div>
    </>
  );
}

function ViewSwitch({
  value,
  onChange,
}: {
  value: "split" | "write" | "preview";
  onChange: (v: "split" | "write" | "preview") => void;
}) {
  const opts: Array<{ id: "write" | "split" | "preview"; label: string }> = [
    { id: "write", label: "Write" },
    { id: "split", label: "Split" },
    { id: "preview", label: "Preview" },
  ];
  return (
    <div className="inline-flex rounded-full border border-ink/15 bg-paper-soft p-0.5">
      {opts.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={`rounded-full px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] transition ${
            value === o.id
              ? "bg-ink text-paper"
              : "text-ink/55 hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function BroadcastButton({
  notifiedAt,
  subscriberCount,
  notifying,
  onSend,
  onResend,
}: {
  notifiedAt: string | null;
  subscriberCount: number;
  notifying: boolean;
  onSend: () => void;
  onResend: () => void;
}) {
  if (notifiedAt) {
    const sentOn = new Date(notifiedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return (
      <button
        type="button"
        onClick={onResend}
        disabled={notifying}
        title="Click to re-send to all subscribers"
        className="rounded-full border border-accent/30 bg-accent/[0.06] px-3.5 py-1.5 text-[12px] font-medium text-accent-soft transition hover:bg-accent/[0.1] disabled:opacity-50"
      >
        {notifying ? "Sending…" : `Sent ${sentOn} · re-send`}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onSend}
      disabled={notifying || subscriberCount === 0}
      title={
        subscriberCount === 0
          ? "No confirmed subscribers yet"
          : `Send to ${subscriberCount} subscriber${subscriberCount === 1 ? "" : "s"}`
      }
      className="rounded-full bg-accent px-4 py-1.5 text-[12px] font-medium text-paper transition hover:bg-accent-soft disabled:opacity-50"
    >
      {notifying
        ? "Sending…"
        : subscriberCount > 0
          ? `Send to ${subscriberCount}`
          : "No subscribers"}
    </button>
  );
}

function ToolbarBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="rounded-md px-2 py-1 text-[12px] text-ink/70 transition hover:bg-ink/[0.06] hover:text-ink"
    >
      {children}
    </button>
  );
}

function Toolbar(props: {
  onBold: () => void;
  onItalic: () => void;
  onH2: () => void;
  onH3: () => void;
  onQuote: () => void;
  onLink: () => void;
  onImage: () => void;
  onCode: () => void;
  onCodeBlock: () => void;
  onList: () => void;
  onDivider: () => void;
}) {
  return (
    <div className="hidden items-center gap-0.5 rounded-full border border-ink/10 bg-paper-soft px-1.5 py-0.5 sm:flex">
      <ToolbarBtn onClick={props.onBold} title="Bold (Cmd/Ctrl+B)">
        <span className="font-bold">B</span>
      </ToolbarBtn>
      <ToolbarBtn onClick={props.onItalic} title="Italic">
        <span className="italic">I</span>
      </ToolbarBtn>
      <span className="mx-1 h-4 w-px bg-ink/10" />
      <ToolbarBtn onClick={props.onH2} title="Heading 2">
        H2
      </ToolbarBtn>
      <ToolbarBtn onClick={props.onH3} title="Heading 3">
        H3
      </ToolbarBtn>
      <ToolbarBtn onClick={props.onQuote} title="Quote">
        “”
      </ToolbarBtn>
      <span className="mx-1 h-4 w-px bg-ink/10" />
      <ToolbarBtn onClick={props.onLink} title="Link">
        ↗
      </ToolbarBtn>
      <ToolbarBtn onClick={props.onImage} title="Image">
        ▱
      </ToolbarBtn>
      <ToolbarBtn onClick={props.onList} title="Bullet list">
        •
      </ToolbarBtn>
      <span className="mx-1 h-4 w-px bg-ink/10" />
      <ToolbarBtn onClick={props.onCode} title="Inline code">
        <code>{`<>`}</code>
      </ToolbarBtn>
      <ToolbarBtn onClick={props.onCodeBlock} title="Code block">
        <code>{`{ }`}</code>
      </ToolbarBtn>
      <ToolbarBtn onClick={props.onDivider} title="Divider">
        ―
      </ToolbarBtn>
    </div>
  );
}

function SettingsPanel({
  post,
  slugTouched,
  onSlugChange,
  excerptTouched,
  onExcerptChange,
  onCoverChange,
  onTagsChange,
}: {
  post: EditorPost;
  slugTouched: boolean;
  onSlugChange: (v: string) => void;
  excerptTouched: boolean;
  onExcerptChange: (v: string) => void;
  onCoverChange: (v: string) => void;
  onTagsChange: (v: string) => void;
}) {
  return (
    <div className="border-t border-ink/10 bg-paper-soft">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-5 md:grid-cols-2">
        <Field label="Slug" hint={slugTouched ? "Custom" : "Auto from title"}>
          <input
            type="text"
            value={post.slug}
            onChange={(e) => onSlugChange(e.target.value)}
            placeholder="my-amazing-post"
            className="w-full rounded-lg border border-ink/10 bg-paper px-3 py-2 font-mono text-[13px] outline-none focus:border-ink/30"
          />
        </Field>
        <Field
          label="Excerpt"
          hint={excerptTouched ? "Custom" : "Auto from content"}
        >
          <input
            type="text"
            value={post.excerpt}
            onChange={(e) => onExcerptChange(e.target.value)}
            placeholder="A short summary that shows on the blog index."
            maxLength={200}
            className="w-full rounded-lg border border-ink/10 bg-paper px-3 py-2 text-[13px] outline-none focus:border-ink/30"
          />
        </Field>
        <Field label="Cover image URL" hint="Optional">
          <input
            type="url"
            value={post.coverImage}
            onChange={(e) => onCoverChange(e.target.value)}
            placeholder="https://…/photo.jpg"
            className="w-full rounded-lg border border-ink/10 bg-paper px-3 py-2 text-[13px] outline-none focus:border-ink/30"
          />
        </Field>
        <Field label="Tags" hint="Comma separated">
          <input
            type="text"
            value={post.tags}
            onChange={(e) => onTagsChange(e.target.value)}
            placeholder="engineering, design"
            className="w-full rounded-lg border border-ink/10 bg-paper px-3 py-2 text-[13px] outline-none focus:border-ink/30"
          />
        </Field>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-ink/45">
        <span>{label}</span>
        {hint ? <span className="text-ink/30">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}
