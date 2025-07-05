import { baseApi } from "@/redux/api/baseApi";

export const borrowApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBorrowSummary: builder.query({
            query: () => ({
                url: "/borrow",
                method: "GET",
            }),
            providesTags: ["Borrow"],
        }),

        borrowBook: builder.mutation({
            query: ({ bookId, quantity, dueDate }) => ({
                url: "/borrow",
                method: "POST",
                body: { book: bookId, quantity, dueDate },
            }),
            invalidatesTags: ["Borrow", "Book"],
        }),
    }),
    overrideExisting: false,
});

export const { useGetBorrowSummaryQuery, useBorrowBookMutation } = borrowApi;
