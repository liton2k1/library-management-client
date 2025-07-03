import type { IBorrowSummary } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const borrowApi = createApi({
    reducerPath: "borrowApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
    endpoints: (builder) => ({
        getBorrowSummary: builder.query<IBorrowSummary[], void>({
            query: () => "/borrows/summary",
        }),
    }),
});

export const { useGetBorrowSummaryQuery } = borrowApi;
