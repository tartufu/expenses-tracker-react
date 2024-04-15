export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Logo</div>
        <ul className="flex">
          <li className="mr-4">
            <a href="#" className="text-white">
              Home
            </a>
          </li>
          <li className="mr-4">
            <a href="#" className="text-white">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
