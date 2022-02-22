import IconPerson from "~icons/fluent/person-circle-20-regular";
import "./header.css";
import Search from "./search";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">madam3D</div>
      <div className="header__search">
        <Search />
      </div>
      <div className="header__profile">
        <IconPerson />
      </div>
    </header>
  );
};

export default Header;
