import propTypes from "prop-types";

const Chat = ({descendingOrderMessages, userName}) => {
  return (
    <>
      <div className="chat-display">
        {descendingOrderMessages.map((message, _index) => (
          <div
            key={_index}
            className={`chat ${userName !== message.name && "user-chat"}`}
          >
            <div className="chat-message-header">
              <div className="chat-container-img">
                <img src={message.img} alt={message.name} />
              </div>
              <p>{message.name}</p>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

Chat.propTypes = {
  descendingOrderMessages: propTypes.any,
  userName: propTypes.string,
};

export default Chat;
