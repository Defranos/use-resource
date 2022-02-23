/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = {
  src: "./src",
  reactStrictMode: true,
  images: { domains: [process.env.NEXT_IMAGE_DOMAIN] },
  i18n,
};