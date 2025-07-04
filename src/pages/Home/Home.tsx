import BookTable from "@/components/BookTable";
import Container from "@/components/Container";
import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import type { IBook } from "@/types/types";

const Home = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const books: IBook[] = data?.data || [];

  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading books</div>;
  return (
    <Container>
      <BookTable books={books} onDelete={() => {}} onBorrow={() => {}} />
    </Container>
  );
};

export default Home;
