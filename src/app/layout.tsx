import type { Metadata } from "next";
import { Provider } from 'jotai';
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanban Task Manager",
  description: "A modern Kanban task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-hidden">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
