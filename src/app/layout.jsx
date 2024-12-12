import React from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <title>Global Innovator Olympiad (GIO) - A Global Competition for Innovators</title>
        <meta name="description" content="Participate in the Global Innovator Olympiad, a prestigious competition for innovators worldwide. Showcase your skills and stand out!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
