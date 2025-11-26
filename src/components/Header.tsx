import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-black text-white">
      
      {/* Logo */}
      <div className="text-2xl font-bold">Cinéma Paris</div>

      {/* Menu */}
      <nav className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-yellow-300">Home</Link>
        <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/graphs" className="hover:text-yellow-300">Charts</Link>
        <Link to="/about" className="hover:text-yellow-300">About</Link>
      </nav>

      {/* Bouton Login */}
      <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition">
        Login
      </button>

    </header>
  );
}

