"use client";

import { NavigationMenu } from "@/components/navigation-menu";
import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isDashboardPath = pathname.startsWith("/dashboard");


  console.log(pathname)

  return (
    <>
      {!isDashboardPath && <NavigationMenu />}
      {children}
      {!isDashboardPath && <Footer />}
    </>
  );
}
