import React from "react";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div>
      <header className="text-gray-600 body-font bg-lightBlue">
        <div className="container mx-auto flex flex-wrap py-1 px-3 flex-col md:flex-row items-center">
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link
              to="/Sign-in"
              className="px-2 py-1 ml-3 text-base font-medium text-white hover:text-darkYellow"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default TopBar;
