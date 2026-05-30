import Image from "next/image";

const points = [
  "Restoration of natural habitats",
  "Improvement of air quality",
  "Support for local communities",
];

export default function AboutCampaign() {
  return (
    <section className="bg-[#e8f5ee] dark:bg-[#0f2e1a] py-16 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
          About the Campaign
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image */}
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1a3d27]">
            <Image
              src="/assets/about.png"
              alt="Green plant representing the campaign"
              width={600}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              Green Earth is a global tree plantation initiative dedicated to
              fighting climate change. Since our start, we&apos;ve planted over
              500,000 trees worldwide. By joining our campaign, you help restore
              forests, create habitats for wildlife, and combat global warming.
            </p>

            <ul className="space-y-2">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-400 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}