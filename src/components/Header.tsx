 export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-black text-white">
      {/* Logo */}
      <div className="text-2xl font-bold"> Cinéma Paris</div>

      {/* Menu */}
      <nav className="flex gap-6">
        <a href="/" className="hover:text-yellow-300">Home</a>
        <a href="/dashboard" className="hover:text-yellow-300">Dashboard</a>
        <a href="/graphs" className="hover:text-yellow-300">Graphiques</a>
      </nav>

      {/* Icone */}
      <button className="bg-yellow-400 text-black px-3 py-1 rounded-lg">
        Login
      </button>
    </header>
  );
}
