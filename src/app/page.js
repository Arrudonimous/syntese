import { NavigationMenu } from "@/components/navigation-menu"
import { Footer } from "@/components/footer"

import HeroSection from "@/components/sections/hero"
import UserGroupsSection from "@/components/sections/user-groups"
import FeaturesSection from "@/components/sections/features"
import TestimonialSection from "@/components/sections/testimonial"
import FAQSection from "@/components/sections/faq"
import CTASection from "@/components/sections/cta"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <NavigationMenu />
      <main className="flex-1">
        <HeroSection />
        <UserGroupsSection />
        <FeaturesSection />
        <TestimonialSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

