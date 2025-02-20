import Link from "next/link";

export default function FeatureCard({
  title,
  description,
  href,
  icon,
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-gradient-to-r from-purple-400 to-pink-400 transition-transform duration-300 group-hover:scale-x-100"></div>
    </Link>
  )
}