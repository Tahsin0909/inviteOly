import { Footer } from "@/components/footer/components/Footer";
import { Navbar } from "@/components/navbar/components/Navbar";
import WhatsAppContact from "@/components/whatsapp-contact/WhatsAppContact";
import { getDefaultMetadata } from "@/utils/seo";
import type { Metadata } from "next";


export const metadata: Metadata = getDefaultMetadata();

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <WhatsAppContact />
            <Footer />
        </div>
    );
}
