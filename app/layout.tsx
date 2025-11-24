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

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://commercialevs.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: '2024 RAM ProMaster EV | Commercial Electric Van | CommercialEVs.com',
  description:
    'Discover the 2024 RAM ProMaster EV commercial electric van. Zero emissions, 162-mile range, 3,020 lb payload capacity, 520 cubic feet cargo space. Features 110 kWh battery, 268 HP, 302 lb-ft torque. Starting at $77,995. Eligible for tax credits. Get a free quote today.',
  keywords: [
    'RAM ProMaster EV',
    'commercial electric van',
    'electric vehicle',
    'zero emissions van',
    'commercial EV',
    'RAM ProMaster',
    'electric commercial vehicle',
    'commercial van',
    'electric van',
    '2024 RAM ProMaster',
    'ProMaster electric',
    'commercial electric vehicle',
    'electric delivery van',
    'zero emission commercial vehicle',
    'electric work van',
    'BEV commercial van',
    'electric fleet vehicle',
    'commercial EV for sale',
    'RAM electric van',
    'ProMaster EV specs',
    'ProMaster EV price',
    'ProMaster EV range',
    'ProMaster EV charging',
  ],
  authors: [{ name: 'CommercialEVs' }],
  publisher: 'CommercialEVs',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: '2024 RAM ProMaster EV | Commercial Electric Van',
    description:
      'Discover the 2024 RAM ProMaster EV - Zero emissions, 162-mile range, 3,020 lb payload. Customize your commercial electric van with tax credits available.',
    url: promasterData.siteConfig.url,
    siteName: 'CommercialEVs.com',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: promasterData.siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: '2024 RAM ProMaster EV - Commercial Electric Van',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2024 RAM ProMaster EV | Commercial Electric Van',
    description:
      'Discover the 2024 RAM ProMaster EV - Zero emissions, 162-mile range, 3,020 lb payload. Get a free quote today.',
    images: [promasterData.siteConfig.ogImage],
    creator: '@CommercialEVs',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: promasterData.siteConfig.faviconUrl, sizes: 'any' },
    ],
    apple: promasterData.siteConfig.faviconUrl,
  },
  other: {
    'theme-color': promasterData.siteConfig.brandColor,
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
        {/* Resource Hints for Performance */}
        <link rel='preconnect' href='https://www.googletagmanager.com' />
        <link rel='preconnect' href='https://www.google-analytics.com' />
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
        <link rel='dns-prefetch' href='https://www.google-analytics.com' />
        <link rel='dns-prefetch' href='https://snap.licdn.com' />
        <link rel='dns-prefetch' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        {/* Preload critical resources */}
        <link
          rel='preload'
          href={promasterData.siteConfig.ogImage}
          as='image'
        />
        <link
          rel='preload'
          href={promasterData.siteConfig.logoUrl}
          as='image'
        />
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

