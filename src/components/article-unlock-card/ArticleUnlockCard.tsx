import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Logo } from "../logo/Logo";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const ArticleUnlockCard = () => {
  const { profile } = useAuth();

  console.log(profile);

  return (
    <div className="md:p-7.5 p-4 border border-forest-green dark:border-border bg-mint-white dark:bg-card rounded-lg mt-3.5">
      <div className="flex items-center gap-3 mb-8.5">
        <Logo className="w-[140px] h-[40px]" />
        <Separator orientation="vertical" className="!h-[35px]" />
        <p className="uppercase text-golden-sand dark:text-golden-sand/90 text-2xl font-medium">
          PRO
        </p>
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3.5">
          <h3 className="text-primary text-[28px] font-bold">
            Signup to read this article for free
          </h3>
          <p className="text-lg font-space-grotesk text-foreground dark:text-muted-foreground">
            Get free access to a limited number of articles, plus choose
            newsletters to get straight to your inbox.
          </p>
        </div>

        <div className="flex md:flex-row flex-col md:items-center items-start md:gap-7.5 gap-5">
          {/* Feature 1 */}
          <div className="flex items-center gap-2">
            <Image
              src="/check-mark.svg"
              width={16}
              height={16}
              className="w-4 h-4 object-contain dark:invert dark:brightness-0"
              alt="Check mark Icon"
            />
            <p className="font-medium text-foreground dark:text-muted-foreground">
              Breaking news first
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-2">
            <Image
              src="/check-mark.svg"
              width={16}
              height={16}
              className="w-4 h-4 object-contain dark:invert dark:brightness-0"
              alt="Check mark Icon"
            />
            <p className="font-medium text-foreground dark:text-muted-foreground">
              Expert analysis
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-2">
            <Image
              src="/check-mark.svg"
              width={16}
              height={16}
              className="w-4 h-4 object-contain dark:invert dark:brightness-0"
              alt="Check mark Icon"
            />
            <p className="font-medium text-foreground dark:text-muted-foreground">
              Full story access
            </p>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-3.5">
          <Button className="py-3 md:px-10 px-5 font-semibold text-sm leading-[150%] h-auto uppercase text-mustard-yellow dark:text-white">
            Become a premium subscriber
          </Button>
        </div>
      </div>
    </div>
  );
};