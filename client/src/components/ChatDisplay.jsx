import {useState, useEffect} from "react";
import axios from "axios";
import propTypes from "prop-types";

import {Chat, ChatInput} from "./";

const ChatDisplay = ({user, clickedUser}) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

  const getUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/message", {
        params: {userId: userId, correspondingUserId: clickedUserId},
      });
      setUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClickedUsersMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/message", {
        params: {userId: clickedUserId, correspondingUserId: userId},
      });
      setClickedUsersMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, []);

  const messages = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.first_name;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["createdAt"] = message.createdAt;
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = clickedUser?.first_name;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["createdAt"] = message.createdAt;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.createdAt?.localeCompare(b.createdAt)
  );

  return (
    <>
      <Chat
        descendingOrderMessages={descendingOrderMessages}
        userName={user?.first_name}
      />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUserMessages={getUsersMessages}
        getClickedUsersMessages={getClickedUsersMessages}
      />
    </>
  );
};

ChatDisplay.propTypes = {
  user: propTypes.any,
  clickedUser: propTypes.any,
};

export default ChatDisplay;
