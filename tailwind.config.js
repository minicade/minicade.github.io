function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        theme: {
          50: withOpacityValue("--theme-50"),
          100: withOpacityValue("--theme-100"),
          200: withOpacityValue("--theme-200"),
          300: withOpacityValue("--theme-300"),
          400: withOpacityValue("--theme-400"),
          500: withOpacityValue("--theme-500"),
          600: withOpacityValue("--theme-600"),
          700: withOpacityValue("--theme-700"),
          800: withOpacityValue("--theme-800"),
          900: withOpacityValue("--theme-900"),
        },
        branding: withOpacityValue("--branding"),
      },
    },
    plugins: [],
  },
};
