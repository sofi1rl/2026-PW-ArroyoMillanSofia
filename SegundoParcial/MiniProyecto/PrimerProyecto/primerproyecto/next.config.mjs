/** @type {import('next').NextConfig} */

const MINI_SERVIDOR_URL = 'http://localhost:300';
module.exports = {
    reactStrictMode :true,
    async rewrites() {
        return [
            {source: '/mini/:path*', destination: `${MINI_SERVIDOR_URL}/path*`},
            {source: 'api/path*', destination: `${BACKEND_URL}/API/PATH*`}
        ]
    }
}