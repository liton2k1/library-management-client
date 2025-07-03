import BookTable from "@/components/BookTable";
import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import type { IBook } from "@/types/types";

const Home = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
 const books: IBook[] = data?.data || [];


  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading books</div>;
  return (
    <div>
      <h1>Home</h1>
      <BookTable
        books={books}
        onDelete={() => {}}
        onBorrow={() => {}}
      />
    </div>
  );
};

export default Home;
