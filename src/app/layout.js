import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SettingsProvider } from "../contexts/SettingsContext";
import { cookies } from "next/headers";
import { getSettings } from "../utils/settings";
import ThemeProvider from "../theme";
import ThemeColorPresets from "../components/ThemeColorPresets";
import Layout from "../layouts";
import { CollapseDrawerProvider } from "../contexts/CollapseDrawerContext";
import "./persian-font.css";

export const metadata = {
  title: "Sahand Golkar | Full-Stack Developer",
  description:
    "Sahand Golkar - Full-Stack Developer specializing in .NET, React, scalable systems, and DevOps.",
};

export default function RootLayout({ children }) {
  const cookieStore = cookies().getAll();
  const settings = getSettings(cookieStore);
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="ow8U0zkxs8wQml448xyw1uZYG42mczEMzCLVIOmdWYM"
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <CollapseDrawerProvider>
            <SettingsProvider defaultSettings={settings}>
              <ThemeProvider>
                <ThemeColorPresets>
                  <Layout variant="main">{children}</Layout>
                </ThemeColorPresets>
              </ThemeProvider>
            </SettingsProvider>
          </CollapseDrawerProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
