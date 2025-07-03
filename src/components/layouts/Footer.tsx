import { Facebook, Mail, Phone, Twitter } from "lucide-react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-700">
        {/* Logo & Description */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">📚 LibManage</h2>
          <p>
            Your trusted system for managing books, members, and borrow history
            efficiently.
          </p>
        </div>

        {/* Quick NavLinks */}
        <div>
          <h3 className="font-semibold mb-2">Quick NavLinks</h3>
          <ul className="space-y-1">
            <li>
              <NavLink to="/" className="hover:text-blue-600">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/books" className="hover:text-blue-600">
                Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/members" className="hover:text-blue-600">
                Members
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-blue-600">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <Mail size={16} /> library@example.com
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
            <a href="#" className="hover:text-blue-600">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-blue-600">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t">
        &copy; {new Date().getFullYear()} LibManage. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
