import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const base = process.env.LICITA_API_URL;
    if (!base) return [];

    return [
      // Health
      { source: "/api/health", destination: `${base}/health` },

      // Licitaciones
      { source: "/api/licitaciones", destination: `${base}/licitaciones` },
      { source: "/api/licitaciones/:path*", destination: `${base}/licitaciones/:path*` },

      // Flags
      { source: "/api/flags/:path*", destination: `${base}/flags/:path*` },

      // Pipelines
      { source: "/api/pipelines/:path*", destination: `${base}/pipelines/:path*` },

      // Pipes (red-contactos)
      { source: "/api/pipes/:path*", destination: `${base}/pipes/:path*` },

      // Nota: NO reescribo /api/rag/** porque ya lo manejas con route handler local.
    ];
  },
};

export default nextConfig;
