import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      let token: string | undefined = (getState() as RootState).auth?.token;

      if (!token && typeof window !== "undefined") {
        token = localStorage.getItem("token") || undefined;
      }

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "promotional-codes",
    "reward",
    "hostandpartner",
    "venue",
    "marketing",
    "event",
    "metrics",
    "payment",
    "catalyst-calendar",
    "drug-database",
    "pricing",
    "newsletter",
    "stripe",
    "onboarding",
    "profile",
    "poll-category",
    "article-category",
    "articles",
    "articleCategories",
    "users",
    "images",
    "polls",
    "pollCategories",
    "subscription",
    "payments",
    "auth",
  ],
  endpoints: () => ({}),
});
