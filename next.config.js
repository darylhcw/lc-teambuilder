const path = require('path');

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles'), 'node_modules'],
  },
})
