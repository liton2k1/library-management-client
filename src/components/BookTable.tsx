import type { IBook } from "@/types/types";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import ConfirmDialog from "./ConfirmDialog";
import { BookOpenCheck, SquarePen, Trash2, View } from "lucide-react";

interface BookTableProps {
  books: IBook[];
  onDelete: (id: string) => void;
  onBorrow: (book: IBook) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, onDelete, onBorrow }) => {
  return (
    <div className="overflow-x-auto my-20">
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="text-gray-600 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-center">Author</th>
            <th className="px-4 py-3 text-center">Genre</th>
            <th className="px-4 py-3 text-center">ISBN</th>
            <th className="px-4 py-3 text-center">Copies</th>
            <th className="px-4 py-3 text-center">Available</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {books.map((book) => (
            <tr key={book._id}>
              <td className="px-4 py-3 text-gray-700 text-left whitespace-nowrap">
                {book.title}
              </td>
              <td className="px-4 py-3 text-gray-700 text-left whitespace-nowrap">
                {book.author}
              </td>
              <td className="px-4 py-3 text-gray-700 text-center whitespace-nowrap">
                {book.genre
                  .toLowerCase()
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </td>

              <td className="px-4 py-3 text-gray-700 text-center whitespace-nowrap">
                {book.isbn}
              </td>
              <td className="px-4 py-3 text-gray-700 text-center whitespace-nowrap">
                {book.copies}
              </td>
              <td className="px-4 py-3 text-gray-700 text-center whitespace-nowrap">
                {book.copies !== 0 ? "Yes" : "No"}
              </td>

              <td className="px-4 py-3 flex justify-end gap-2">
                <NavLink to={`/book-details/${book._id}`} title="View Book">
                  <Button size="sm" variant="outline">
                    <View className="w-4 h-4 text-blue-600" />
                  </Button>
                </NavLink>

                <NavLink to={`/edit-book/${book._id}`} title="Edit Book">
                  <Button size="sm" variant="outline">
                    <SquarePen className="w-4 h-4 text-emerald-600" />
                  </Button>
                </NavLink>

                <ConfirmDialog
                  onConfirm={() => onDelete(book._id)}
                  trigger={
                    <Button size="sm" variant="outline" title="Delete Book">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  }
                />

                <NavLink to={`/borrow-book/${book._id}`} title="Borrow Book">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onBorrow(book)}
                    disabled={!book.available || book.copies === 0}
                  >
                    <BookOpenCheck className="w-4 h-4 text-indigo-600" />
                  </Button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
