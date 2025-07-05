"use client";

import { useParams } from "react-router";
import { useGetBookByIdQuery } from "@/redux/features/book/bookApi";
import Container from "@/components/Container";

const BookDetails = () => {
  const { id } = useParams();
  const {
    data: book,
    isLoading,
    error,
  } = useGetBookByIdQuery(id as string, {
    skip: !id,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error || !book?.data) {
    return (
      <div className="text-center text-red-600 py-10">Book not found.</div>
    );
  }

  const {
    title,
    author,
    genre,
    isbn,
    description,
    copies,
    available,
    createdAt,
    updatedAt,
  } = book.data;

  const formattedGenre = genre
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char: string) => char.toUpperCase());

  return (
    <div className="my-10">
      <Container>
        <h1 className="text-3xl font-bold mb-5 text-center">Book Details</h1>

        <div className="overflow-x-auto">
          <table className="w-full max-w-3xl mx-auto text-left text-gray-700 border border-gray-200 rounded-md shadow-sm min-w-[600px]">
            <tbody>
              <tr className="border-b">
                <th className="bg-gray-100 px-4 py-3 font-semibold w-1/3">
                  Title
                </th>
                <td className="px-4 py-3">{title}</td>
              </tr>
              <tr className="border-b">
                <th className="bg-gray-100 px-4 py-3 font-semibold">Author</th>
                <td className="px-4 py-3">{author}</td>
              </tr>
              <tr className="border-b">
                <th className="bg-gray-100 px-4 py-3 font-semibold">Genre</th>
                <td className="px-4 py-3">{formattedGenre}</td>
              </tr>
              <tr className="border-b">
                <th className="bg-gray-100 px-4 py-3 font-semibold">ISBN</th>
                <td className="px-4 py-3">{isbn}</td>
              </tr>
              <tr className="border-b">
                <th className="bg-gray-100 px-4 py-3 font-semibold">Copies</th>
                <td className="px-4 py-3">{copies}</td>
              </tr>
              <tr className="border-b">
                <th className="bg-gray-100 px-4 py-3 font-semibold">
                  Available
                </th>
                <td className="px-4 py-3">{available ? "Yes" : "No"}</td>
              </tr>
              <tr className="border-b">
                <th className="bg-gray-100 px-4 py-3 font-semibold">
                  Added On
                </th>
                <td className="px-4 py-3">
                  {new Date(createdAt).toLocaleDateString()}
                </td>
              </tr>
              <tr className="border-b">
                <th className="bg-gray-100 px-4 py-3 font-semibold">
                  Last Updated
                </th>
                <td className="px-4 py-3">
                  {new Date(updatedAt).toLocaleString()}
                </td>
              </tr>
              <tr>
                <th className="bg-gray-100 px-4 py-3 font-semibold align-top">
                  Description
                </th>
                <td className="px-4 py-3 break-words">{description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default BookDetails;
