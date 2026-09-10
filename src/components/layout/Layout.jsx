import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Toast from "../ui/Toast";

export default function Layout() {
  return (
    <div className="min-h-full flex flex-col bg-cream">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}