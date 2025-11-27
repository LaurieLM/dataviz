import { Link } from "react-router-dom";

export default function Footer() { 
    return (
        <footer className="flex flex-col items-center mb-[1vh]">
            <Link to="/about" className="hover:text-yellow-300">About</Link>
            <p className="italic text-[0.9vw]" >© 2025 Dataviz App. All rights reserved.</p>
        </footer>
    )
}