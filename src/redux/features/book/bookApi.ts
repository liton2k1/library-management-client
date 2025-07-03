import { baseApi } from "@/redux/api/baseApi";
import type { IBook, IBookResponse } from "@/types/types";

export const bookApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query<IBookResponse, void>({
            query: () => "/books",
            providesTags: ["Book"],
        }),

        addBook: builder.mutation<IBook, Partial<IBook>>({
            query: (data) => ({
                url: "/books",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Book"],
        }),

        updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Book"],
        }),

        deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Book"],
        }),
    }),
    overrideExisting: false
})

export const { useGetBooksQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation } = bookApi