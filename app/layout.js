import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-sora",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://nnxit.co.za"),
  title: "NNX IT · Consulting & Training",
  description:
    "NNX IT Consulting and Training — leading software testing, business analysis, project management and data analytics. Empowering women in tech.",
  keywords: [
    "software testing",
    "QA",
    "business analysis",
    "project management",
    "data analytics",
    "IT training",
    "Midrand",
    "South Africa",
  ],
  openGraph: {
    title: "NNX IT · Consulting & Training",
    description:
      "Leading software testing & IT solutions. Empowering women in tech.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0d1326",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
