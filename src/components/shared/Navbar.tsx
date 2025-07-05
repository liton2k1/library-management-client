"use client";
import { Menu, BookOpen } from "lucide-react"; // ✅ Import Book icon
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "react-router";
import Container from "../Container";

const navItems = [
  { label: "All Books", href: "/all-books" },
  { label: "Add Book", href: "/add-book" },
  { label: "Borrow Summary", href: "/borrow-summary" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full shadow-sm bg-white py-5">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <BookOpen className="w-10 h-10" />
            <span className="text-lg font-semibold">BookHub</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className="text-sm font-medium"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 ml-4 mt-5">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className="text-base font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
