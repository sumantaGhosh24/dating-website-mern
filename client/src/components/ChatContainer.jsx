import {useState} from "react";
import propTypes from "prop-types";

import {ChatHeader, ChatDisplay, MatchesDisplay} from "./";

const ChatContainer = ({user}) => {
  const [clickedUser, setClickedUser] = useState(null);

  return (
    <div className="chat-container">
      <ChatHeader user={user} />
      <div>
        <button className="option" onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className="option" disabled={!clickedUser}>
          Chat
        </button>
      </div>
      {!clickedUser && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}
      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
  );
};

ChatContainer.propTypes = {
  user: propTypes.any,
};

export default ChatContainer;
