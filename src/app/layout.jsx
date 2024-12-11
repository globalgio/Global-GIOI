import React from "react";
import "./globals.css";

export const metadata = {
  title:
    "Global Innovator Olympiad (GIO) - A Global Competition for Innovators",
  description:
    "Participate in the Global Innovator Olympiad, a prestigious competition for innovators across the globe. Showcase your skills and stand out!",
  keywords:
    "innovation, olympiad, global, competition, innovators, students, technology, science",
  author: "Global Innovator Olympiad Team",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",
  canonical: "https://www.globalinnovatorolympiad.com/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href={metadata.canonical} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <meta name="viewport" content={metadata.viewport} />
        <meta charSet={metadata.charset} />
      </head>
      <body>{children}</body>
    </html>
  );
}
