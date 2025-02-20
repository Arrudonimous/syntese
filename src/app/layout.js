import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { NavigationMenu } from "@/components/navigation-menu";
import { Footer } from "@/components/footer";

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
  description: "Syntese sua ferramenta para melhoria de produtividade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased font-poppins`}>
        <NavigationMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
