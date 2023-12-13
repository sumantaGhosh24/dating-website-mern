import {Link} from "react-router-dom";
import propTypes from "prop-types";

import whiteLogo from "../assets/white-logo.png";
import colorLogo from "../assets/color-logo.png";

const Nav = ({authToken, minimal, setShowModal, showModal, setIsSignUp}) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav className="nav">
      <div className="nav-logo-container">
        <img
          className="nav-logo"
          src={minimal ? colorLogo : whiteLogo}
          alt="logo"
        />
      </div>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log In
        </button>
      )}
      {authToken && (
        <Link to="/dashboard" className="nav-button">
          Dashboard
        </Link>
      )}
    </nav>
  );
};

Nav.propTypes = {
  authToken: propTypes.any,
  minimal: propTypes.any,
  setShowModal: propTypes.any,
  showModal: propTypes.any,
  setIsSignUp: propTypes.any,
};

export default Nav;
