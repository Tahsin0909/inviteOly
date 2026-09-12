import { redirect } from "next/navigation";
import { WHATSAPP_SUPPORT_URL } from "@/constants/sidebarMenu";

export default function Page() {
  redirect(WHATSAPP_SUPPORT_URL);
}
