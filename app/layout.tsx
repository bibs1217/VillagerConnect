import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'VillagerConnect', template: '%s | VillagerConnect' },
  description: 'Your Complete Guide to Life in The Villages, Florida',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#2D7A2D" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="VillagerConnect" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0}
          body{background:#F5F5F5;color:#1A1A1A;font-family:Georgia,'Times New Roman',system-ui,sans-serif}
          a{color:inherit;text-decoration:none}
          input,select,textarea,button{font-family:Georgia,'Times New Roman',system-ui,sans-serif;font-size:16px}
          ::-webkit-scrollbar{width:6px}
          ::-webkit-scrollbar-track{background:#F5F5F5}
          ::-webkit-scrollbar-thumb{background:#2D7A2D;border-radius:3px}
          ::selection{background:#2D7A2D;color:white}
          img{max-width:100%;height:auto}
        `}</style>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js')
                .then(function(reg) { console.log('VillagerConnect SW registered:', reg.scope) })
                .catch(function(err) { console.log('SW registration failed:', err) })
            })
          }
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
