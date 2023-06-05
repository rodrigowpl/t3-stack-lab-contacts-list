/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  trailingComma: "none",
  semi: false,
  singleQuote: true,
};

module.exports = config;
