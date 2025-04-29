// app/blog/[slug]/page.tsx
import { getAllPostMeta, getPost } from '@/app/lib/posts'
import { marked } from 'marked'

export async function generateStaticParams() {
  return getAllPostMeta().map(({ slug }) => ({ slug }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { data, content } = getPost(params.slug)
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-monoreg font-semibold mb-4">{data.title}</h1>
      <article
        className="prose font-monoreg"
        dangerouslySetInnerHTML={{ __html: marked(content) }}
      />
    </main>
  )
}
