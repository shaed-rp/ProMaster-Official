import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@styles/global.scss';
import 'react-multi-carousel/lib/styles.css';
import Script from 'next/script';
import GTranslate from '@/utils/gtranslate';
import promasterData from '@/data/promasterData.json';
import Image from 'next/image';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://commercialevs.com'
  ),
  title: promasterData.siteConfig.title,
  description: promasterData.siteConfig.description,
  openGraph: {
    title: promasterData.siteConfig.title,
    description: promasterData.siteConfig.description,
    url: promasterData.siteConfig.url,
    siteName: promasterData.siteConfig.title,
    images: [
      {
        url: promasterData.siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: promasterData.siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: promasterData.siteConfig.title,
    description: promasterData.siteConfig.description,
    images: [promasterData.siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: promasterData.siteConfig.faviconUrl, sizes: 'any' },
    ],
    apple: promasterData.siteConfig.faviconUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <Script id='google-tag-manager' strategy='afterInteractive'>
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5ZKF55WH');
      `}
        </Script>
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GTM-5ZKF55WH');
        `}
        </Script>
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=AW-16652557826'
          strategy='afterInteractive'
          id='google-analytics-script'
        />
        <Script id='google-analytics-promaster' strategy='afterInteractive'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16652557826');
        `}
        </Script>
        <Script id='google-analytics-conversion' strategy='afterInteractive'>
          {`
          gtag('event', 'conversion', {
            'send_to': 'AW-16652557826/vNXkCPz79NoZEIK8x4Q-',
            'value': 50.0,
            'currency': 'USD'
          });
        `}
        </Script>
        <Script id='linkedin-insight' strategy='afterInteractive'>
          {`
          window._linkedin_partner_id = "6694604";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(window._linkedin_partner_id);

          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";
            b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-5ZKF55WH'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
          <Image
            src='https://px.ads.linkedin.com/collect/?pid=6694604&fmt=gif'
            alt=''
            height={1}
            width={1}
            style={{ display: 'none' }}
            unoptimized
            priority={false}
          />
        </noscript>
        <GTranslate />
        <div className='container'>{children}</div>
      </body>
    </html>
  );
}

