"use client";

import { LocationSelector } from "@/components/location-selector/LocationSelector";
import { PhoneInput } from "@/components/phone-input/PhoneInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../user.api";
import { UserFormSkeleton } from "./UserFormSkeleton";
import { userSchema, UserSchemaType } from "../user.schema";
import { IRole } from "../user.interface";

export const UserEditForm = ({ id }: { id: string }) => {
  const { data: userData, isLoading: isLoadingUser } = useGetUserByIdQuery(id, {
    skip: !id,
  });
  const user = userData?.data;
  const [updateUserFn, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      jobTitle: "",
      jobFunction: "",
      country: "",
      jobLevel: "Junior",
      companyIndustry: "",
      companySize: "100-200",
      postalCode: "",
      phone: "",
      role: IRole.USER,
      isActive: true,
    },
  });

  useEffect(() => {
    if (!user) return;

    form.reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      companyName: user?.companyName || "",
      jobTitle: user?.jobTitle || "",
      jobFunction: user?.jobFunction || "",
      country: user?.country || "",
      jobLevel: user?.jobLevel || "",
      companyIndustry: user?.companyIndustry || "",
      companySize: user?.companySize || "",
      postalCode: user?.postalCode || "",
      phone: user?.phone || "",
      role: user?.role || IRole.USER,
      isActive: user?.isActive,
    });
  }, [form, user]);

  const onSubmit = async (values: UserSchemaType) => {
    await handleMutationRequest(
      updateUserFn,
      { id, ...values },
      {
        loadingMessage: "Updating User Details",
        successMessage: (res: ApiResponse<string>) => res?.message,
      }
    );
  };

  if (isLoadingUser) return <UserFormSkeleton />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Tedex Pharma" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Manager"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="jobFunction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Function</FormLabel>
                  <FormControl>
                    <Input placeholder="Product" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <LocationSelector
                      onCountryChange={(country) =>
                        field.onChange(country ? country.name.common : "")
                      }
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="jobLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Level</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (value) field.onChange(value);
                    }}
                    value={String(field.value || "")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Senior" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="companyIndustry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="Technology" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="companySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Size</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (value) field.onChange(value);
                    }}
                    value={String(field.value || "")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="100-200" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="100-200">100-200</SelectItem>
                      <SelectItem value="200-400">200-400</SelectItem>
                      <SelectItem value="400-500">400-500</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="1204" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      {...field}
                      placeholder="Enter Your Phone"
                      defaultCountry="US"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (value) field.onChange(value);
                    }}
                    value={String(field.value || "")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="USER" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(IRole).map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (value !== "") field.onChange(value === "true");
                    }}
                    value={String(field.value) === "true" ? "true" : "false"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Active" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoadingUser || isUpdatingUser}>
            {isUpdatingUser ? (
              <>
                <Spinner />
                Saving Changes
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
