import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@headlessui/react";
import { ThemeToggle } from "../ThemeToggle";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const [navHeight, setNavHeight] = useState<number>(0);
  const [isTitleBarVisible, setIsTitleBarVisible] = useState(true);

  // Check if we're on the landing page (home page)
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure navbar height so we can insert a spacer when using fixed positioning
  useLayoutEffect(() => {
    const setHeight = () => {
      const el = navRef.current;
      if (el) setNavHeight(el.getBoundingClientRect().height);
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, [isScrolled, isMenuOpen, isTitleBarVisible]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full flex flex-col transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md md:fixed px-3 py-2 border-b border-gray-200 dark:border-gray-800 shadow-md gap-2"
            : "p-5 md:py-6 md:px-28 md:sticky gap-2"
        } z-50`}
      >
        <div className="flex justify-between items-center rounded-lg px-4 py-8 w-full md:w-auto h-14 bg-white/90 dark:bg-gray-900/80 md:bg-white/50 dark:md:bg-gray-900/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-800 text-sm transition-colors">
          <div className="flex items-center gap-2">
            <RouterLink to="/" className="flex items-center cursor-pointer">
              <img src={logo} alt="logo" className="w-12" />
              <p className="text-orange-500 font-medium hidden lg:block lg:text-2xl">
                Certifyer
              </p>
            </RouterLink>
          </div>

          <button
            className="md:hidden text-orange-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <IoClose className="w-8 h-8" />
            ) : (
              <IoIosMenu className="w-8 h-8" />
            )}
          </button>

          <div className="hidden text-lg md:flex gap-12 items-center flex-1 justify-center min-w-0 z-20 text-gray-800 dark:text-gray-200">
            {isLandingPage ? (
              <>
                <Link
                  to="features"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="hover:text-orange-500 cursor-pointer"
                >
                  Features
                </Link>
                <Link
                  to="work"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="hover:text-orange-500 cursor-pointer"
                >
                  How It Works
                </Link>
                <Link
                  to="testimonials"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="hover:text-orange-500 cursor-pointer"
                >
                  Testimonials
                </Link>
                <Link
                  to="blog"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="hover:text-orange-500 cursor-pointer"
                >
                  Blog
                </Link>
              </>
            ) : (
              <>
                <RouterLink
                  to="/#features"
                  className="hover:text-orange-500 cursor-pointer"
                >
                  Features
                </RouterLink>
                <RouterLink
                  to="/#work"
                  className="hover:text-orange-500 cursor-pointer"
                >
                  How It Works
                </RouterLink>
                <RouterLink
                  to="/#testimonials"
                  className="hover:text-orange-500 cursor-pointer"
                >
                  Testimonials
                </RouterLink>
                <RouterLink
                  to="/blogs"
                  className="hover:text-orange-500 cursor-pointer"
                >
                  Blog
                </RouterLink>
              </>
            )}

            <RouterLink
              to="/story"
              className="hover:text-orange-500 cursor-pointer"
            >
              Our Story
            </RouterLink>
          </div>

          <div className="hidden md:flex gap-6 items-center justify-end flex-none">
            <ThemeToggle />
            <button
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
              className="text-orange-500 text-left text-lg cursor-pointer hover:text-orange-600 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-orange-500 rounded-full text-lg text-white px-5 py-2 cursor-pointer hover:bg-orange-600 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="transition ease-in duration-300 md:hidden right-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 shadow-lg p-6 w-2/3 h-full fixed"
            style={{ top: navHeight }}
          >
            <div className="flex flex-col gap-10">
              {isLandingPage ? (
                <>
                  <Link
                    to="features"
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    to="work"
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How It Works
                  </Link>
                  <Link
                    to="testimonials"
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Testimonials
                  </Link>
                  <Link
                    to="blog"
                    smooth={true}
                    duration={500}
                    offset={-50}
                    className="hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </>
              ) : (
                <>
                  <RouterLink
                    to="/#features"
                    className="hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </RouterLink>
                  <RouterLink
                    to="/#work"
                    className="hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How It Works
                  </RouterLink>
                  <RouterLink
                    to="/#testimonials"
                    className="hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Testimonials
                  </RouterLink>
                  <RouterLink
                    to="/blogs"
                    className="hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </RouterLink>
                </>
              )}
              <RouterLink
                to="/story"
                className="hover:text-orange-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </RouterLink>

              <div className="pt-2">
                <ThemeToggle />
              </div>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="text-orange-500 text-left"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-orange-500 rounded-full text-white px-5 py-2 cursor-pointer text-center"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content jump when navbar is fixed */}
      <div aria-hidden="true" style={{ height: navHeight }} />
    </>
  );
};

export default Navbar;
