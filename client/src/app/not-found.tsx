'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1 style={{ fontSize: '3rem', color: 'red' }}>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">
        <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Go back home
        </button>
      </Link>
    </div>
  )
}