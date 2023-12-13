import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import axios from "axios";
import propTypes from "prop-types";

const MatchesDisplay = ({matches, setClickedUser}) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies] = useCookies(null);

  const matchedUserIds = matches?.map(({user_id}) => user_id);
  const userId = cookies.UserId;

  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users", {
        params: {userIds: JSON.stringify(matchedUserIds)},
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, [matches]);

  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id == userId)
        .length > 0
  );

  return (
    <div className="matches-display">
      {filteredMatchedProfiles?.map((match, _index) => (
        <div
          key={_index}
          className="match-card"
          onClick={() => setClickedUser(match)}
        >
          <div className="chat-container-img">
            <img src={match?.url} alt={match?.first_name} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  );
};

MatchesDisplay.propTypes = {
  matches: propTypes.any,
  setClickedUser: propTypes.any,
};

export default MatchesDisplay;
