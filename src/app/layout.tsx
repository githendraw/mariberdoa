import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mari Berdoa — Kumpulan Doa Sehari-hari',
  description: 'Kumpulan doa islam sehari-hari lengkap dengan arab, latin, arti, dan gambar siap download',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
