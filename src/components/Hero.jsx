import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#e8f5ee] dark:bg-[#0f2e1a] relative overflow-hidden py-16 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">

        {/* Left Leaf */}
        <div className="hidden sm:block w-[220px] md:w-[280px] flex-shrink-0 -ml-8">
          <Image
            src="/assets/hero-leaf1.png"
            alt=""
            width={280}
            height={320}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Center Content */}
        <div className="flex-1 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight mb-4">
            Plant a Tree, Grow a Future
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
            Join our mission to plant 1 million trees and make the Earth greener
            for future generations.
          </p>
          <Link
            href="/plant-a-tree"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-green-900 font-semibold px-7 py-3 rounded-full transition-colors duration-200 text-sm"
          >
            Get Involved
          </Link>
        </div>

        {/* Right Leaf */}
        <div className="hidden sm:block w-[220px] md:w-[280px] flex-shrink-0 -mr-8">
          <Image
            src="/assets/hero-leaf2.png"
            alt=""
            width={280}
            height={320}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}