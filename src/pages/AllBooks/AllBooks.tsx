"use client";

import BookTable from "@/components/BookTable";
import Container from "@/components/Container";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "@/redux/features/book/bookApi";

const AllBooks = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const books = data?.data || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
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

export default AllBooks;
