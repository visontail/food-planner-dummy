import { Link } from "react-router-dom";

function Header() {

  return (
    <header className="bg-orange-100 py-4 mb-10 rounded text-orange-800">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className=" text-2xl font-semibold"><h2>Heti Menü</h2></Link>
        <div className="block">
          <Link to="/recipes" className=" hover:text-hover-orange ml-4">
            Receptek
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
