"use client";

import React from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useBorrowBookMutation } from "@/redux/features/borrow/borrowApi";
import { useGetBookByIdQuery } from "@/redux/features/book/bookApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { IBook } from "@/types/types";
import toast from "react-hot-toast";

interface BorrowFormInputs {
  quantity: number;
  dueDate: string;
}

const BorrowBook: React.FC = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading: bookLoading } = useGetBookByIdQuery(
    bookId as string,
    {
      skip: !bookId,
    }
  );

  const book: IBook = data?.data || [];

  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const form = useForm<BorrowFormInputs>({
    defaultValues: {
      quantity: undefined,
      dueDate: "",
    },
  });

  const onSubmit = async (data: BorrowFormInputs) => {
    if (!book) return;
    if (data.quantity > book.copies) {
      toast.error(`Quantity cannot exceed available copies (${book.copies})`);
      return;
    }

    try {
      await borrowBook({
        bookId: book._id,
        quantity: data.quantity,
        dueDate: data.dueDate,
      }).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (error) {
      toast.error("Failed to borrow book");
      console.error("Failed to borrow book", error);
    }
  };

  if (bookLoading || !book) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full max-w-md mx-auto p-5 bg-white rounded-md border border-gray-300">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="quantity"
              rules={{
                required: "Quantity is required",
                min: { value: 1, message: "Minimum 1 copy" },
                max: {
                  value: book.copies,
                  message: `Cannot exceed ${book.copies}`,
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      min={1}
                      max={book.copies}
                      {...field}
                      placeholder="Quantity"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              rules={{ required: "Due date is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Borrowing..." : "Borrow Book"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BorrowBook;
