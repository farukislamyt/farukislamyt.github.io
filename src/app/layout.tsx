import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Faruk Islam — Full Stack Developer | React, Node.js, TypeScript",
  description: "Full Stack Developer based in Dhaka, Bangladesh. 6+ years building scalable web applications with React, Next.js, Node.js, and modern cloud infrastructure. Available for hire.",
  keywords: [
    "Faruk Islam",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript",
    "Portfolio",
    "Web Developer",
    "Dhaka",
    "Bangladesh",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AWS",
    "Docker",
    "PostgreSQL",
  ],
  authors: [{ name: "Faruk Islam", url: "https://farukislamyt.github.io" }],
  creator: "Faruk Islam",
  publisher: "Faruk Islam",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://farukislamyt.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Faruk Islam — Full Stack Developer",
    description: "Building robust, scalable web applications from database to interface. 6+ years of experience, 40+ projects delivered.",
    type: "website",
    locale: "en_US",
    url: "https://farukislamyt.github.io",
    siteName: "Faruk Islam Portfolio",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Faruk Islam — Full Stack Developer",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faruk Islam — Full Stack Developer",
    description: "Building robust, scalable web applications. 6+ years, 40+ projects.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* GTM */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-N6FTZ47B');`,
          }}
        />
        {/* JSON-LD: Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Faruk Islam",
              jobTitle: "Full Stack Developer",
              url: "https://farukislamyt.github.io",
              sameAs: [
                "https://github.com/farukislamyt",
                "https://linkedin.com/in/farukislamyt",
                "https://t.me/farukislam",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dhaka",
                addressCountry: "BD",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Bangladesh University of Engineering and Technology",
              },
            }),
          }}
        />
        {/* JSON-LD: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Faruk Islam Portfolio",
              url: "https://farukislamyt.github.io",
              description: "Full Stack Developer Portfolio — React, Next.js, Node.js, TypeScript",
              author: {
                "@type": "Person",
                name: "Faruk Islam",
              },
            }),
          }}
        />
        {/* JSON-LD: ItemList (Portfolio Sections) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Portfolio Sections",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "About", url: "https://farukislamyt.github.io/#about" },
                { "@type": "ListItem", position: 2, name: "Projects", url: "https://farukislamyt.github.io/#projects" },
                { "@type": "ListItem", position: 3, name: "Services", url: "https://farukislamyt.github.io/#services" },
                { "@type": "ListItem", position: 4, name: "Experience", url: "https://farukislamyt.github.io/#experience" },
                { "@type": "ListItem", position: 5, name: "Blog", url: "https://farukislamyt.github.io/#blog" },
                { "@type": "ListItem", position: 6, name: "Contact", url: "https://farukislamyt.github.io/#contact" },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="faruk-portfolio-theme"
        >
          <div className="noise-overlay" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
