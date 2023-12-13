import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import propTypes from "prop-types";

const AuthModal = ({setShowModal, isSignUp}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Password and confirm password not match!");
        return;
      }
      const response = await axios.post(
        `http://localhost:8080/api/${isSignUp ? "signup" : "login"}`,
        {email, password}
      );
      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);
      const success = response.status === 201;
      if (success && isSignUp) navigate("/onboarding");
      if (success && !isSignUp) navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-close-icon" onClick={handleClick}>
        ✖
      </div>
      <h2 className="auth-modal-title">{isSignUp ? "Register" : "Log In"}</h2>
      <p className="auth-modal-description">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
        asperiores inventore maxime.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="Enter your confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="secondary-button" type="submit" />
        <p className="form-error">{error}</p>
      </form>
    </div>
  );
};

AuthModal.propTypes = {
  setShowModal: propTypes.any,
  isSignUp: propTypes.any,
};

export default AuthModal;
