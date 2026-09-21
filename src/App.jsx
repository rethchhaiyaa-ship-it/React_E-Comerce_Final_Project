import { useEffect } from "react";
import { RouterProvider } from "react-router";
import AOS from "aos";
import { AppProvider } from "./context/AppContext";
import { router } from "./routes";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      offset: 80,
      once: true,
    });
  }, []);

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
