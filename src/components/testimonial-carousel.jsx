"use client"
import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const testimonials = [
  {
    name: "Ana Silva",
    role: "Estudante de Medicina",
    content:
      "O Syntese revolucionou minha forma de estudar. Os resumos automáticos e flashcards inteligentes me ajudaram a me preparar para as provas de forma muito mais eficiente.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Carlos Mendes",
    role: "Professor Universitário",
    content:
      "Como educador, vejo um grande potencial no Syntese. A ferramenta de geração de citações é particularmente útil para meus alunos em seus trabalhos acadêmicos.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Juliana Costa",
    role: "Profissional de Marketing",
    content:
      "O gerador de e-mails do Syntese me ajuda a criar comunicações profissionais rapidamente. É uma ferramenta indispensável no meu dia a dia de trabalho.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialCarousel() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 20,
        },
      },
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider mt-12">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="keen-slider__slide">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center">
              {/* 
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={80}
                height={80}
                className="rounded-full"
              /> 
              */}
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-inter">{testimonial.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
