"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmailFormValues, emailSchema } from "@/features/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";

export const NewsletterForm = () => {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: EmailFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <div className="grow relative">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="border-r-0 rounded-tr-[0] rounded-br-[0] bg-card h-[42px] pt-2.5 pb-2.5 pe-2.5 ps-8"
                    />
                  </FormControl>
                  <Image
                    src={"/mail.svg"}
                    width={14}
                    height={12}
                    className="absolute top-1/2 -translate-y-1/2 left-[10px] object-contain"
                    alt="Form Icon"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="rounded-tl-[0] rounded-bl-[0] uppercase p-2.5 font-work-sans h-[42px]"
        >
          Subscribe
        </Button>
      </form>
    </Form>
  );
};
