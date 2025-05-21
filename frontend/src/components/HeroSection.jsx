import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="bg-orange-50 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Side: Text Content */}
        <div className="md:w-1/2 text-center md:text-left" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
            Discover Delicious Recipes Every Day
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Find the best recipes — from quick snacks to full meals. Explore, cook, and enjoy with <span className="font-semibold text-orange-500">Cookpedia</span>.
          </p>
          <button
            onClick={() =>
              document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-orange-500 text-white text-base md:text-lg rounded-full shadow-md hover:bg-orange-600 transition-transform transform hover:scale-105"
          >
            Explore Recipes
          </button>

          {/* Down Arrow */}
          <div className="mt-8 flex justify-center md:justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-orange-500 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7 7 7-7"
              />
            </svg>
          </div>
        </div>

        {/* Right Side: Image with Small Container */}
        <div
          className="w-40 h-40 md:w-52 md:h-52 flex items-center justify-center rounded-xl overflow-hidden shadow-xl bg-white"
          data-aos="slide-left"
        >
          <img
            src="apple.jpg"
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
