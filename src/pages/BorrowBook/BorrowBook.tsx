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

interface BorrowFormInputs {
    quantity: number;
    dueDate: string;
}

const BorrowBook: React.FC = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const { data, isLoading: bookLoading } = useGetBookByIdQuery(bookId as string, {
        skip: !bookId,
    });

    const book: IBook | undefined = data?.data;

    const [borrowBook, { isLoading, isSuccess, error }] = useBorrowBookMutation();

    const form = useForm<BorrowFormInputs>({
        defaultValues: {
            quantity: 1,
            dueDate: "",
        },
    });

    const onSubmit = async (data: BorrowFormInputs) => {
        if (!book) return;
        if (data.quantity > book.copies) {
            alert(`Quantity cannot exceed available copies (${book.copies})`);
            return;
        }

        try {
            await borrowBook({
                bookId: book._id,
                quantity: data.quantity,
                dueDate: data.dueDate,
            }).unwrap();
            alert("Book borrowed successfully!");
            navigate("/borrow-summary");
        } catch (err) {
            alert("Failed to borrow book, try again.");
            console.error(err);
        }
    };

    if (bookLoading || !book) {
        return <p className="text-center mt-10">Loading book info...</p>;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 max-w-md mx-auto p-4 bg-white rounded shadow m"
            >
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
                                <Input type="number" min={1} max={book.copies} {...field} />
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

                {error && <p className="text-red-600 mt-2">Failed to borrow book.</p>}
                {isSuccess && (
                    <p className="text-green-600 mt-2">Borrowed successfully!</p>
                )}
            </form>
        </Form>
    );
};

export default BorrowBook;
