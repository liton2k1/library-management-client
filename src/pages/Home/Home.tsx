// app/page.tsx
"use client";

import BookTable from "@/components/BookTable";
import Container from "@/components/Container";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "@/redux/features/book/bookApi";
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
    <Container>
      <BookTable books={books} onDelete={handleDelete} onBorrow={() => {}} />
    </Container>
  );
};

export default Home;
