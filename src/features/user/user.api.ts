import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IUser, TCreateUser } from "./user.interface";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<IUser[], true>, Partial<ApiParams>>({
      query: ({ page, limit, searchTerm }) => ({
        url: "/users",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["users"],
    }),

    getUserById: builder.query<ApiResponse<IUser>, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["users"],
    }),

    createUser: builder.mutation<ApiResponse<{ token: string }>, Partial<TCreateUser>>({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),

    updateUser: builder.mutation<
      ApiResponse<IUser>,
      Partial<IUser> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
