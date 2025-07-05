"use client";
import Container from "@/components/Container";
import { useGetBorrowSummaryQuery } from "@/redux/features/borrow/borrowApi";
import type { IBorrowSummary } from "@/types/types";

const BorrowSummary = () => {
  const { data, error, isLoading } = useGetBorrowSummaryQuery(undefined);
  const bookSummary: IBorrowSummary[] = data?.data || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to fetch data</p>;

  return (
    <div className="my-10">
      <Container>
        <h2 className="text-xl text-center font-bold mb-5">Borrow Summary</h2>

        <div className="overflow-x-auto">
          <table className="w-full max-w-xl mx-auto text-sm text-left border border-gray-200">
            <thead className="text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-center">ISBN</th>
                <th className="px-4 py-3 text-center">
                  Total Borrowed Quantity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookSummary.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {item.book.title}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-center whitespace-nowrap">
                    {item.book.isbn}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-center whitespace-nowrap">
                    {item.totalQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default BorrowSummary;
