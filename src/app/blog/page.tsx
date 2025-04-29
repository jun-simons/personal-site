// app/blog/page.tsx
import Link from 'next/link'
import { getAllPostMeta } from '@/app/lib/posts'

export default async function Blog() {
  const posts = getAllPostMeta()          // pulled from disk at build time
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-monoreg font-bold mb-8">posts and projects</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug} className="mb-4">
            <Link href={`/blog/${p.slug}`}>
              <div className="text-xl font-mono hover:underline">{p.title}</div>
              <div className="text-sm text-gray-500">{p.date}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
