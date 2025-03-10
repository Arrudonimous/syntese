import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Syntese",
  description: "Syntese, sua ferramenta para melhoria de produtividade",
  openGraph: {
    title: "Syntese",
    description: "Aumente sua produtividade com a ferramenta Syntese",
    url: "https://www.syntese.com",
    siteName: "Syntese",
    images: [
      {
        url: "/images/preview.png",
        width: 1200,
        height: 630,
        alt: "Syntese Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syntese",
    description: "Aumente sua produtividade com a ferramenta Syntese",
    image: "/images/preview.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased font-poppins`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
