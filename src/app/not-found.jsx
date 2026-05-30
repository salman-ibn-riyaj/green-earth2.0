import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto">

        {/* Big 404 */}
        <h1 className="text-[120px] sm:text-[160px] font-extrabold leading-none text-[#1a7a3a] dark:text-[#2eab54] select-none">
          404
        </h1>

        {/* Tree illustration */}
        <div className="text-7xl mb-6">🌿</div>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
          Oops! Looks like this page got lost in the forest. <br />
          Let&apos;s take you back to safer ground.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto bg-[#1a7a3a] hover:bg-[#155f2d] dark:bg-[#2eab54] dark:hover:bg-[#269146] text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 text-sm"
          >
            Go Back Home
          </Link>
          
        </div>

      </div>
    </div>
  );
}