const projectId = process.env.SUPABASE_PROJECT_ID

export default function supabaseLoader({ src, width, quality }) {
  return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&quality=${
    quality || 75
  }`
}
