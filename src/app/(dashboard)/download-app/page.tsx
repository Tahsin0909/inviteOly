import { Metadata } from "next";
import { UnderConstruction } from "@/components/dashboard/UnderConstruction";

export const metadata: Metadata = {
  title: "Download App APK - InviteOnly",
};

export default function Page() {
  return <UnderConstruction title="Download App APK" role="Account" />;
}
