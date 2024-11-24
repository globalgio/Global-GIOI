import React from "react";
import "./globals.css";

export const metadata = {
  title: "Global Innovator Olympiad (GIO)",
  description: "Global Innovator Olympiad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
       
      {children}
      </body>
    </html>
  );
}
