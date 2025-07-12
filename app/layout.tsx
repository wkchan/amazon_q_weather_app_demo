import './globals.css'

export const metadata = {
  title: 'Weather Portal',
  description: 'Get current weather information for any city',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}