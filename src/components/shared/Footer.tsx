import {
  BookOpen,
  Facebook,
  Mail,
  Phone,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { NavLink } from "react-router";
import Container from "../Container";

const Footer = () => {
  return (
    <div className="bg-gray-100">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm text-gray-600 py-10">
          {/* Logo & Description */}
          <div>
            <NavLink to="/" className="flex items-center gap-2">
              <BookOpen className="w-10 h-10" />
              <span className="text-lg font-semibold">BookHub</span>
            </NavLink>
            <p>
              Your trusted system for managing books, members, and borrow
              history efficiently.
            </p>
          </div>

          {/* Quick NavLinks */}
          <div>
            <h3 className="font-semibold mb-2">Quick NavLinks</h3>
            <ul className="space-y-1">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/books">Books</NavLink>
              </li>
              <li>
                <NavLink to="/members">Members</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <Mail size={16} /> bookhub@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +880 1234-567890
              </li>
            </ul>
          </div>

          {/* Social NavLinks */}
          <div>
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 py-10 border-t border-gray-300">
          &copy; {new Date().getFullYear()} BookHub. All rights reserved.
        </div>
      </Container>
    </div>
  );
};

export default Footer;
