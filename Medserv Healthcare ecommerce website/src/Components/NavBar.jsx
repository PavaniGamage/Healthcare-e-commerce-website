import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-lightBlue">
      <div className="mr-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="relative flex h-9 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 hover:text-darkYellow focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start flex-grow">
            <div className="flex-shrink-0 items-center">
              <span className="ml-2 mb-4 text-xl text-white font-semibold tracking-wide">MEDSERV</span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="px-2 py-1 text-base font-medium text-white hover:text-darkYellow tracking-wide"
                  //aria-current="page"
                >
                  Home
                </Link>
                <Link
                  to="/wellness"
                  className="px-2 py-1 text-base font-medium text-white hover:text-darkYellow tracking-wide"
                >
                  Wellness
                </Link>
                <Link
                  to="/medical-devices"
                  className="px-2 py-1 text-base font-medium text-white hover:text-darkYellow tracking-wide"
                >
                  Medical Devices
                </Link>
                <Link
                  to="/personal-care"
                  className="px-2 py-1 text-base font-medium text-white hover:text-darkYellow tracking-wide"
                >
                  Personal Care
                </Link>
                <Link
                  to="/medserv-hearts"
                  className="px-2 py-1 text-base font-medium text-white hover:text-darkYellow tracking-wide"
                >
                  Medserv Hearts
                </Link>
                <Link
                  to="/rent"
                  className="px-2 py-1 text-base font-medium text-white hover:text-darkYellow tracking-wide"
                >
                  Rent
                </Link>
                <Link
                  to="/blog"
                  className="px-2 py-1 text-base font-medium text-white hover:text-darkYellow tracking-wide"
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-white hover:text-darkYellow"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/wellness"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-darkYellow"
            >
              Wellness
            </Link>
            <Link
              to="/medical-devices"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-darkYellow"
            >
              Medical Devices
            </Link>
            <Link
              to="/personal-care"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-darkYellow"
            >
              Personal Care
            </Link>
            <Link
              to="/medserv-hearts"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-darkYellow"
            >
              Medserv Hearts
            </Link>
            <Link
              to="/rent"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-darkYellow"
            >
              Rent
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-darkYellow"
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
