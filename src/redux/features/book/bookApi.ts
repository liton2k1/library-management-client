import { baseApi } from "@/redux/api/baseApi";

export const bookApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ["Book"],
        }),

        addBook: builder.mutation({
            query: (data) => ({
                url: "/books",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Book"],
        }),

        updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Book"],
        }),

        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Book"],
        }),
        getBookById: builder.query({
            query: (id) => ({
                url: `/books/${id}`,
                method: "GET",
            }),
            providesTags: ["Book"],
        }),

    }),
    overrideExisting: false
})

export const { useGetBooksQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation, useGetBookByIdQuery } = bookApi