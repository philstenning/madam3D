import IconPerson from "~icons/fluent/person-circle-20-regular";
import "./header.css";
import Search from "./search";
import logo from "/cube-purple.svg";
import {useLocation} from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  console.log(location)
  return (
    <header className="header">
      <div className="header__logo">
        MaDam3D
        <img className="header__logo-image" src={logo} alt="" />
      </div>

      <div className="header__search">
        {/* { location.pathname!=='/' &&  <Search /> } */}
        <Search />
      </div>
      <div className="header__profile">
        <IconPerson className="header__avatar" />
      </div>
    </header>
  );
};

export default Header;
