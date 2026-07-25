import type { NextConfig } from 'next';

/**
 * Fully static output (ADR 0001): the build must produce plain files in `out/`
 * with no runtime server features. That forces `images.unoptimized` — there is
 * no image optimization server in production.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
