import React, { useContext, useEffect, useState } from "react";
import { TopicContext } from "../../providers/TopicProvider";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "reactstrap";


const TopicDetails = () => {
  const { getTopicDetails } = useContext(TopicContext);

  let { topicId } = useParams()
  const [topic, setTopic] = useState({})

  useEffect(() => {
    getTopicDetails(topicId)
      .then((res) => {
        setTopic(res)
      })
  }, []);


  return (
    <>
      <div className="topic-details-container">
        <div key={topic.id}>
          <h1 className="topic-title">
            {topic.topicTitle}
          </h1>
          <p className="post-details">Published by {topic.topicAuthor?.displayName}</p>
          <img src={topic.topicImage} alt="No image available" width = '500'></img>
          <p className="topicContent">{topic.topicContent}</p>
        </div>
      </div>
    </>
  );
};

export default TopicDetails;