"use client";

import { useParams, useNavigate } from "react-router";
import {
    useGetBookByIdQuery,
    useUpdateBookMutation,
} from "@/redux/features/book/bookApi";
import type { IBookRequest } from "@/types/types";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const genreOptions = [
    { value: "FANTASY", label: "Fantasy" },
    { value: "SCIENCE", label: "Science" },
    { value: "HISTORY", label: "History" },
    { value: "FICTION", label: "Fiction" },
    { value: "NONFICTION", label: "Non-fiction" },
];

const EditBook = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { data: book, isLoading } = useGetBookByIdQuery(id as string, { skip: !id });
    const [updateBook, { isLoading: isUpdating, isSuccess }] = useUpdateBookMutation();

    const form = useForm<IBookRequest>({
        values: book?.data || {
            title: "",
            author: "",
            genre: "",
            isbn: "",
            description: "",
            copies: 1,
        },
    });


    const onSubmit = async (data: IBookRequest) => {
        try {
            await updateBook({ id: id as string, data }).unwrap();
            navigate("/");
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    if (isLoading || !book) {
        return <div className="text-center">Loading book details...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md my-10">
            <h1 className="text-2xl font-bold mb-6">Edit Book</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="title"
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Book title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="author"
                        rules={{ required: "Author is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Author name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="genre"
                        rules={{ required: "Genre is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Genre</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select genre" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {genreOptions.map(({ value, label }) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isbn"
                        rules={{ required: "ISBN is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                    <Input placeholder="ISBN number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        rules={{ required: "Description is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Brief description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="copies"
                        rules={{
                            required: "Copies is required",
                            min: { value: 1, message: "At least 1 copy is required" },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Copies</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isUpdating} className="w-full">
                        {isUpdating ? "Updating..." : "Update Book"}
                    </Button>

                    {isSuccess && (
                        <p className="text-green-600 text-center mt-2">
                            Book updated successfully!
                        </p>
                    )}
                </form>
            </Form>
        </div>
    );
};

export default EditBook;
