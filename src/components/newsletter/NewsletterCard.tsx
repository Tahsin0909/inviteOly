import inboxDarkIcon from "@/assets/trending/inbox-dark.svg";
import inboxIcon from "@/assets/trending/inbox.svg";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { Card, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export const NewsletterCard = () => {
  return (
    <Card className="bg-icy-green dark:bg-card py-6 px-5">
      <CardDescription>
        <div className="flex flex-col gap-3">
          <div className="p-3 w-[50px] h-[50px] rounded-full bg-soft-mint dark:bg-accent">
            <Image
              src={inboxIcon}
              width={23}
              height={23}
              className="object-contain dark:hidden"
              alt="Inbox Icon"
            />
            <Image
              src={inboxDarkIcon}
              width={23}
              height={23}
              className="object-contain not-dark:hidden"
              alt="Inbox Icon"
            />
          </div>
          <h3 className="text-primary capitalize text-2xl">
            <span className="text-sea-green">Insight you can trust,</span>{" "}
            trusted by professionals word wide
          </h3>
          <p>
            The daily digest newsletter delivers exclusive updates and expert
            analysis on breakthrough research, innovation, and trends
          </p>
          <NewsletterForm />
        </div>
      </CardDescription>
    </Card>
  );
};
