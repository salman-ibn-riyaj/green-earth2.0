const stats = [
    { value: "500K+", label: "Trees Planted" },
    { value: "120+", label: "Communities Involved" },
    { value: "30+", label: "Countries Reached" },
  ];
  
  export default function OurImpact() {
    return (
      <section className="bg-[#e8f5ee] dark:bg-[#0f2e1a] py-16 px-6 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
            Our Impact
          </h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-[#1a3d27] rounded-2xl px-8 py-10 text-center shadow-sm"
              >
                <p className="text-4xl font-bold text-[#1a7a3a] dark:text-[#4ade80] mb-3">
                  {stat.value}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }