import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://nnxit.co.za"),
  title: "NNX IT — Software Testing & IT Solutions",
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
    title: "NNX IT — Software Testing & IT Solutions",
    description:
      "Leading software testing & IT solutions. Empowering women in tech.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0c0c0c",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={kanit.variable}>
      <body>{children}</body>
    </html>
  );
}
