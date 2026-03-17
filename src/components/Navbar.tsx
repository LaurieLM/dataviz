import { NavLink } from "react-router-dom";

export default function Navbar() {
  const baseClasses =
    "mx-4 px-3 py-1 rounded text-white no-underline";
  const activeClasses = "bg-blue-500 font-bold";

  return (
    <nav className="p-5 bg-gray-800 mb-5 flex">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${baseClasses} ${activeClasses}` : baseClasses
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? `${baseClasses} ${activeClasses}` : baseClasses
        }
      >
        About
      </NavLink>

      <NavLink
        to="/graphs"
        className={({ isActive }) =>
          isActive ? `${baseClasses} ${activeClasses}` : baseClasses
        }
      >
        Graphics
      </NavLink>
    </nav>
  );
}
