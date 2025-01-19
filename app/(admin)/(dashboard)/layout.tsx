import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
<SidebarProvider className="flex min-h-screen bg-[#f4f6fb]">
          <AppSidebar />
          <div className="flex-1 flex flex-col ">
            <Header />
            <main className="flex-1   mx-auto  w-[886px] md:[1186px]">
              <div className="container ">
                
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </SidebarProvider>
  );
}
