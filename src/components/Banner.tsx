import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { NavLink } from "react-router";

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            Welcome to LibManage
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Manage books, members, and borrow records with ease in your digital
            library.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <NavLink to="/books">
              <Button>
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Books
              </Button>
            </NavLink>
            <NavLink to="/about">
              <Button variant="outline">Learn More</Button>
            </NavLink>
          </div>
        </div>

        {/* Image or illustration */}
        <div className="flex-1">
          <img
            src="https://undraw.org/illustration/library-rafiki.svg"
            alt="Library Illustration"
            className="w-full h-auto max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
