"use client";

import React from "react";
import type { IBook } from "@/types/types";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface BookTableProps {
  books: IBook[];
  onDelete: (id: string) => void;
  onBorrow: (book: IBook) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, onDelete, onBorrow }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>ISBN</TableHead>
          <TableHead>Copies</TableHead>
          <TableHead>Available</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book._id}>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.genre}</TableCell>
            <TableCell>{book.isbn}</TableCell>
            <TableCell>{book.copies}</TableCell>
            <TableCell>{book.available ? "Yes" : "No"}</TableCell>
            <TableCell className="flex gap-2">
              <NavLink to={`/edit-book/${book._id}`}>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </NavLink>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(book._id)}
              >
                Delete
              </Button>
              <Button
                size="sm"
                onClick={() => onBorrow(book)}
                disabled={!book.available || book.copies === 0}
              >
                Borrow
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookTable;
