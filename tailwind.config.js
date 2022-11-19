const config = {
  breakpoints: {
    medium: 768,
  },
};

module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.astro"],
  theme: {
    screens: {
      pc: { raw: `screen and (min-width: ${config.breakpoints.medium + 0.02}px), print` },
      sp: { raw: `screen and (max-width: ${config.breakpoints.medium}px)` },
    },
    colors: {},
    spacing: {
      // spacingを使用する場合は以下で使用できるpxを定義する
      // 10: "10px",
      // 80: "80px",
    },
  },
};
