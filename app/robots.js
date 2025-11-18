/**
 * @returns {import('next').MetadataRoute.Robots}
 */
export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',

            }
        ],
        host: process.env.NEXT_PUBLIC_BASE_URL,
        sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}sitemap.xml`,
    }
}