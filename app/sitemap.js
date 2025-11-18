/**
 * 
 * @returns {import('next').MetadataRoute.Sitemap}
 */
export default function sitemap() {
    return [
        {
            url: process.env.NEXT_PUBLIC_BASE_URL,
            lastModified: new Date()
        },
    ]
}