import React, { useContext, useEffect, useState, useRef } from "react";
import { TopicContext } from "../../providers/TopicProvider";
import { ThreadContext } from "../../providers/ThreadProvider";
import { useParams, Link } from "react-router-dom";
import { Button } from "reactstrap";


const TopicDetails = () => {
  let deletePopup = useRef()
  const { getTopicDetails, DeleteTopic } = useContext(TopicContext);
  const { getThreadByTopic } = useContext(ThreadContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  let { topicId } = useParams()
  const [topic, setTopic] = useState({})
  const [thread, setThread] = useState([])

  useEffect(() => {
    getTopicDetails(topicId)
      .then((res) => {
        setTopic(res)
      })
      .then(getThreadByTopic(topicId)
        .then(setThread))
  }, []);

  const renderDelete = () => {
    if (userProfile.id === topic.topicAuthor?.id) {
      return (
        <Button color="primary" onClick={e => deletePopup.current.showModal()}>
          Delete Topic
        </Button>
      )
    }
  }

  const handleDeleteTopic = (topic) => {
    console.log(topic)
    DeleteTopic(topic.id)
  }

  return (
    <>
      <div className="topic-details-container">
        <div key={topic.id}>
          <h1 className="topic-title">
            {topic.topicTitle}
          </h1>

          <p className="post-details">Published by {topic.topicAuthor?.displayName} on {topic.topicCreationDate}</p>
          <img src={topic.topicImage} alt="No image available" width='500'></img>
          <p className="topicContent">{topic.topicContent}</p>
          <dialog className="deletePopup" ref={deletePopup}>
            <section className="topicDeletePopup">
              <h3 className="popupHeader">Are you sure you wish to delete this topic?</h3>
              <Link to={"/"}>
                <button className="yesDelete" onClick={e => handleDeleteTopic(topic)}>Yes</button>
              </Link>
              <button className="NoDelete" onClick={e => deletePopup.current.close()}>No</button>
            </section>
          </dialog>

          <p>{renderDelete()}</p>
        </div>

        <div>
          {thread.map((thread) => (
            <div key={thread.id}>
              <div className='comment'>{thread.threadComment}</div>
              <div className='author'>{thread.author.displayName}</div>
              <div className='commentDate'>{thread.commentCreationDate}</div>
            </div>
          ))}

        </div>

      </div>

    </>
  );
};

export default TopicDetails;