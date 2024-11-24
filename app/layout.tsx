import "./globals.css";

import type { Metadata } from "next";

import { getI18n, getMessagesByLocale } from "@/contexts/i18n/helpers";
import { seed } from "@/utils/database/seed";

import { Header } from "./(components)/Header/Header";
import { Providers } from "./providers";

export const generateMetadata = async (): Promise<Metadata> => {
  const i18n = await getI18n("en");

  return {
    title: i18n.formatMessage({ id: "title" }),
    icons: [
      {
        rel: "icon",
        type: "image/svg",
        url: "/logo.svg",
      },
    ],
  };
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  await seed();

  const messages = getMessagesByLocale("en");

  return (
    <html lang="en">
      <Providers i18n={{ locale: "en", messages }}>
        <body className="container py-4">
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;
