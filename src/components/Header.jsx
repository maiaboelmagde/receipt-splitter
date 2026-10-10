import { Link, NavLink } from "react-router-dom";
import { FaReceipt } from "react-icons/fa";

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:text-indigo-600"
  }`;

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-indigo-600">
          <span className="rounded-lg bg-indigo-500 p-2 text-white">
            <FaReceipt />
          </span>
          receipt-splitter
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/split" className={linkClass}>
            Split a bill
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
