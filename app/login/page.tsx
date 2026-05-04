import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import LoginView from "@/components/auth/LoginView";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <div className="flex-grow flex flex-col justify-center">
        <LoginView />
      </div>
      <Footer />
    </div>
  );
}
