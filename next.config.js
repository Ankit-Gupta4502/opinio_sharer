/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiKey: "AIzaSyAf3ls0YQXXCzIZPtNabTUUSF_iQSNUJ5Y",
    authDomain: "spotify-clone-c1244.firebaseapp.com",
    projectId: "spotify-clone-c1244",
    storageBucket: "spotify-clone-c1244.appspot.com",
    messagingSenderId: "71026453757",
    appId: "1:71026453757:web:5b6110aa370251f795a294",
    measurementId: "G-ZTZ724BX48"
  },
  async rewrites() {
    return []
  }
}

module.exports = nextConfig
