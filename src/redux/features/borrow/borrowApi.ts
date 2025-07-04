import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBorrowSummary } from "@/types/types";

export const borrowApi = createApi({
    reducerPath: "borrowApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
    endpoints: (builder) => ({
        getBorrowSummary: builder.query<IBorrowSummary[], void>({
            query: () => "/borrow/summary",
        }),

        borrowBook: builder.mutation({
            query: ({ bookId, quantity, dueDate }) => ({
                url: `/borrow/${bookId}`,
                method: "POST",
                body: { quantity, dueDate },
            }),
        }),
    }),
});

export const { useGetBorrowSummaryQuery, useBorrowBookMutation } = borrowApi;
