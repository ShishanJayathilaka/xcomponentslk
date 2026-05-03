import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata = {
  title: "ComponentHub | Enterprise Grade Electronics",
  description: "B2B platform for industrial automation, vision systems, and telemetry.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}