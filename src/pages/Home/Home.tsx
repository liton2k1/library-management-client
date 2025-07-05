"use client";

import BookTable from "@/components/BookTable";
import Container from "@/components/Container";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "@/redux/features/book/bookApi";

const Home = () => {
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

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">Error loading books</div>
    );

  return (
    <Container>
      {books.length === 0 ? (
        <div className="text-center text-gray-600 mt-10 text-lg">
          No books found. Please add some books.
        </div>
      ) : (
        <BookTable books={books} onDelete={handleDelete} onBorrow={() => {}} />
      )}
    </Container>
  );
};

export default Home;
