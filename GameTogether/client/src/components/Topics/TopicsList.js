import React, { useContext, useEffect } from "react";
import { TopicContext } from "../../providers/TopicProvider";
import { Link } from "react-router-dom";
import { Col, Button } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const TopicsList = () => {
  const { topics, getAllTopics, searchTopics } = useContext(TopicContext);
  const { userProfile } = useContext(UserProfileContext);

  useEffect(() => {
    getAllTopics();
  }, []);

  const handleClickSearchList = (event) => {
    event.preventDefault()

    const query = document.querySelector("#topicSearch").value

    if (query === "") {
      getAllTopics()
    } else {
      searchTopics(query)
    }
  }

  return (
    <div className="topics-container">
      <Col className="topics-header">
        <h1>Topics</h1>
      </Col>
      <fieldset>
        <input type="text" id="topicSearch" autoFocus className="form-search" placeholder="Search Topics" />
        <button className="search-button" onClick={handleClickSearchList}>Search</button>
      </fieldset>
      <Button color="primary">
        <Link className="NewTopicButton" to={"/Topic/New"} style={{ color: `#7B68EE` }}>
          Create a Topic
        </Link>
      </Button>
      <Col>
        {topics.map((topic) => (
          <div className="topic-card" key={topic.id}>
            <Link to={`/Topic/${topic.id}`}>
              <h3 className="topics-title">
                {topic.topicTitle}
              </h3>
            </Link>
            <p>Written By: {topic.topicAuthor.displayName}</p>
            <p>Published: {topic.topicCreationDate}</p>
            <p>Likes: TODO</p>
          </div>
        ))}
      </Col>
    </div>
  );
};

export default TopicsList;