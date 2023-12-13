import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import propTypes from "prop-types";

const ChatHeader = ({user}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    navigate("/");
  };

  return (
    <div className="chat-container-header">
      <div className="chat-container-profile">
        <div className="chat-container-img">
          <img src={user.url} alt={user.first_name} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className="chat-log-out" onClick={logout}>
        ⬅
      </i>
    </div>
  );
};

ChatHeader.propTypes = {
  user: propTypes.any,
};

export default ChatHeader;
