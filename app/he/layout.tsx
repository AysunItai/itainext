import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

/**
 * Hebrew route segment — RTL wrapper only. Header/footer stay in the root
 * layout but detect /he paths and render Hebrew nav + footer content.
 */
export default function HebrewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      lang="he"
      className={`${heebo.className} flex flex-1 flex-col`}
    >
      {children}
    </div>
  );
}
