import siteMetadata from "data/siteMetadata";
import { NextSeoProps } from "next-seo";
const seo: NextSeoProps = {
  description: siteMetadata.description,
  defaultTitle: siteMetadata.title,
  titleTemplate: `%s - ${siteMetadata.title}`,

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteMetadata.siteUrl,
    site_name: siteMetadata.title,
    profile: {
      ...siteMetadata.SEO_author,
    },
    images: [
      {
        url: siteMetadata.siteUrl + siteMetadata.socialBanner,
        alt: "Banner",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
      rel: "stylesheet",
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: "/static/favicons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      href: "/static/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
      href: "/static/favicons/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/static/favicons/site.webmanifest",
    },
    {
      rel: "mask-icon",
      href: "/static/favicons/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
    {
      rel: "alternate",
      type: "application/rss+xml",
      href: "/feed.xml",
    },
  ],
  additionalMetaTags: [
    {
      name: "msapplication-TileColor",
      content: "#ffffff",
    },
    {
      name: "theme-color",
      content: "#ffffff",
    },
    {
      name: "google-site-verification",
      content: "UXbXGaC3iZq9Dde5Cs6PkTis4sH3noldubFgiWHYLCE",
    },
  ],
};

export default seo;
