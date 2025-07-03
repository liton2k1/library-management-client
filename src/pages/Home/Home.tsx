// app/page.tsx
"use client";

import BookTable from "@/components/BookTable";
import { useGetBooksQuery, useDeleteBookMutation } from "@/redux/features/book/bookApi";
import type { IBook } from "@/types/types";

const Home = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const books: IBook[] = data?.data || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      // You can show a toast here if using shadcn toast
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading books</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <BookTable books={books} onDelete={handleDelete} onBorrow={() => {}} />
    </div>
  );
};

export default Home;
