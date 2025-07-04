"use client";
import Container from "@/components/Container";
import { useGetBorrowSummaryQuery } from "@/redux/features/borrow/borrowApi";
import type { IBorrowSummary } from "@/types/types";

const BorrowSummary = () => {
  const { data, error, isLoading } = useGetBorrowSummaryQuery(undefined);
  const bookSummary: IBorrowSummary[] = data?.data || [];

  if (isLoading) return <p>Loading borrow summary...</p>;
  if (error) return <p>Error loading borrow summary</p>;

  return (
    <div className="my-10">
      <Container>
        <h2 className="text-xl text-center font-bold mb-5">Borrow Summary</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookSummary?.map((item, index) => (
            <li key={index} className="border border-gray-300 p-5 rounded-md">
              <p>
                <strong>Title:</strong> {item.book.title}
              </p>
              <p>
                <strong>ISBN:</strong> {item.book.isbn}
              </p>
              <p>
                <strong>Total Borrowed Quantity:</strong> {item.totalQuantity}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default BorrowSummary;
