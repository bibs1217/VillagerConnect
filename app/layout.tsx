import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'VillagerConnect', template: '%s | VillagerConnect' },
  description: 'Your Complete Guide to Life in The Villages, Florida',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0}
          body{background:#F5F5F5;color:#1A1A1A;font-family:Georgia,'Times New Roman',system-ui,sans-serif}
          a{color:inherit;text-decoration:none}
          input,select,textarea,button{font-family:Georgia,'Times New Roman',system-ui,sans-serif}
          ::-webkit-scrollbar{width:6px}
          ::-webkit-scrollbar-track{background:#F5F5F5}
          ::-webkit-scrollbar-thumb{background:#2D7A2D;border-radius:3px}
          ::selection{background:#2D7A2D;color:white}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
