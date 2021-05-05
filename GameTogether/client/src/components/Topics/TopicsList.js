import React, { useContext, useEffect } from "react";
import { TopicContext } from "../../providers/TopicProvider";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";

const TopicsList = () => {
  const { topics, getAllTopics, searchTopics } = useContext(TopicContext);

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

console.log(topics)

  return (
    <div className="topics-container">
      <Col className="topics-header">
        <h1>Topics</h1>
      </Col>
      <fieldset>
        <input type="text" id="topicSearch" autoFocus className="form-search" placeholder="Search Topics" />
        <button className="search-button" onClick={handleClickSearchList}>Search</button>
      </fieldset>
      <Col>
        {topics.map((topic) => (
          <div className="topic-card" key={topic.id}>
            <Link to={`/Topic/${topic.id}`}>
              <h3 className="topics-title">
                {topic.topicTitle}
              </h3>
            </Link>
            <p>Written By: {topic.topicAuthor.displayName}</p>
            <p>Likes: TODO</p>
          </div>
        ))}
      </Col>
    </div>
  );
};

export default TopicsList;