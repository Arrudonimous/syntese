import { TestimonialCarousel } from "../testimonial-carousel";

export default function TestimonialSection(){
  return (
    <section className="bg-white px-4 py-16 md:px-6 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl">
          O que nossos usuários dizem
        </h2>
        <TestimonialCarousel />
      </div>
    </section>
  )
}