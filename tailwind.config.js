/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          " linear-gradient(239.26deg, #DDEEED 63.17%, #FDF1E0 94.92%)",
        "pattern-2":
          "linear-gradient(135deg, #5c4141, #66474b, #7c5a6b, #8d799c, #89a2d1, #75cbf3, #70e9fe, #74f4ff)",
        "pattern-3":
          "linear-gradient(342deg, rgba(0,0,0,1) 27%, rgba(112,111,213,1) 90%);",
        "pattern-4": " linear-gradient(to right, #0f2027, #203a43, #2c5364);",
      },
    },
  },
  plugins: [],
};
