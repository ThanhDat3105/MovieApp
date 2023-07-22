import React, { useState, useEffect } from "react";
import "./header.scss";
import logo from "../../assets/movix-logo.svg";
import { VscChromeClose } from "react-icons/vsc";

import { HiOutlineSearch } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [show, setShow] = useState<any>("top");
  const [lastScrollY, setLastScrollY] = useState<any>(0);
  const [mobileMenu, setMobileMenu] = useState<any>(false);
  const [query, setQuery] = useState<any>("");
  const [showSearch, setShowSearch] = useState<any>("");
  const navigate = useNavigate();

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const searchQueryHandler = (event: any) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setShowSearch(false)
    }
  }

  return (
    <div className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <div className="headerSetting">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
        <ul className="menuItem">
          <li className="item" onClick={() => navigate("/explore/movie")}>
            Movies
          </li>
          <li className="item" onClick={() => navigate("/explore/tv")}>
            TV Shows
          </li>
          <li className="item">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
      </div>
      {showSearch && <div className="searchBar">
        <div className="ContentWrapper">
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose
              onClick={() => setShowSearch(false)}
            />
          </div>
        </div>
      </div>}
    </div>
  );
}
