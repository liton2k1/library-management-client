"use client";
import { useAddBookMutation } from "@/redux/features/book/bookApi";
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
import { useForm, type FieldValues } from "react-hook-form";

const genreOptions = [
  { value: "FANTASY", label: "Fantasy" },
  { value: "SCIENCE", label: "Science" },
  { value: "HISTORY", label: "History" },
  { value: "FICTION", label: "Fiction" },
  { value: "NONFICTION", label: "Non-fiction" },
];

const CreateBook = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: "",
    },
  });

  const [addBook, { isLoading, isError, isSuccess }] = useAddBookMutation();

  async function onSubmit(data: FieldValues) {
    try {
      await addBook(data).unwrap();
      form.reset();
      alert("Book created successfully!");
    } catch (error) {
      console.error("Failed to create book:", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white rounded-md border border-gray-300 my-10">
      <h1 className="text-2xl text-center font-bold mb-5">Create Book</h1>

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
                  value={field.value}
                  defaultValue=""
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
                    placeholder="Number of copies"
                  />
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

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Book"}
          </Button>

          {isError && (
            <p className="text-red-600 text-center mt-2">
              Failed to create book. Please try again.
            </p>
          )}

          {isSuccess && (
            <p className="text-green-600 text-center mt-2">
              Book created successfully!
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateBook;
