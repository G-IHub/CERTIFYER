import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./tailwind.css";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider
    attribute="class"
    defaultTheme="light"
    enableSystem={true}
    storageKey="certifyer-theme"
    disableTransitionOnChange={false}
  >
    <App />
  </ThemeProvider>
);
