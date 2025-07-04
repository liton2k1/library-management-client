import type { IBook } from "@/types/types";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import ConfirmDialog from "./ConfirmDialog";

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
              <td className="px-4 py-3 text-gray-700 text-left">
                {book.title}
              </td>
              <td className="px-4 py-3 text-gray-700 text-left">
                {book.author}
              </td>
              <td className="px-4 py-3 text-gray-700 text-center">
                {book.genre}
              </td>
              <td className="px-4 py-3 text-gray-700 text-center">
                {book.isbn}
              </td>
              <td className="px-4 py-3 text-gray-700 text-center">
                {book.copies}
              </td>
              <td className="px-4 py-3 text-gray-700 text-center">
                {book.available ? "Yes" : "No"}
              </td>

              <td className="px-4 py-3 text-right space-x-2">
                <NavLink to={`/edit-book/${book._id}`}>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </NavLink>
                <ConfirmDialog
                  onConfirm={() => onDelete(book._id)}
                  trigger={
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  }
                />
                <NavLink to={`/borrow-book/${book._id}`}>
                  <Button
                    size="sm"
                    onClick={() => onBorrow(book)}
                    disabled={!book.available || book.copies === 0}
                  >
                    Borrow
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
