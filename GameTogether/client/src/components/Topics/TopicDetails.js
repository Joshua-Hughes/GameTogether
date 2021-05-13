import React, { useContext, useEffect, useState, useRef } from "react";
import { TopicContext } from "../../providers/TopicProvider";
import { ThreadContext } from "../../providers/ThreadProvider";
import { useParams, Link } from "react-router-dom";
import { Button } from "reactstrap";
import { ThreadCard } from "../Thread/ThreadCard";


const TopicDetails = () => {
  //Refs for popup windows
  let deletePopup = useRef()
  let addComment = useRef()

  //contexts
  const { getTopicDetails, DeleteTopic } = useContext(TopicContext);
  const { threads, getThreadByTopic, AddComment } = useContext(ThreadContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  //get the id of the current topic
  let { topicId } = useParams()
  //states
  const [topic, setTopic] = useState()
  const [newComment, setNewComment] = useState({
    "topicId": 0,
    "threadComment": "",
    "commentCreationDate": ""
  })

  //fetch details and thread
  useEffect(() => {
    getTopicDetails(topicId)
      .then((res) => {
        setTopic(res)
      })
      .then(getThreadByTopic(topicId))
  }, []);

  //handles the deletion of the current topic
  const handleDeleteTopic = (topic) => {
    DeleteTopic(topic.id)
  }

  //handles input
  const handleControlledInputChange = (event) => {
    const freshComment = { ...newComment };

    freshComment[event.target.id] = event.target.value
    setNewComment(freshComment);
  }

  //handles the saving of a comment to the thread
  const handleSaveComment = () => {
    if (newComment.threadComment === "") {
      window.alert("Please write a comment!")
    } else {
    AddComment({
      topicId: topicId,
      threadComment: newComment.threadComment,
      commentCreationDate: new Date()
    })
      .then(() => getThreadByTopic(topicId))
      .then(e => addComment.current.close())
  }
  };

  //renders the "Delete Topic" button if the topic belongs to the user
  const renderDelete = () => {
    if (userProfile.id === topic.topicAuthor?.id) {
      return (
        <Button color="primary" onClick={e => deletePopup.current.showModal()}>
          Delete Topic
        </Button>
      )
    }
  }

  //renders the "Edit Topic" button if the topic belongs to the user
  const renderEdit = (topicId) => {
    if (userProfile.id === topic.topicAuthor?.id) {
      return (
        <Link to={`/Topic/Edit/${topicId}`}>
          <Button color="primary">
            Edit Topic
        </Button>
        </Link>
      )
    }
  }

  if (!topic) return null
  return (
    <>
      <div className="topic-details-container">
        <div key={topic.id}>
          <h1 className="topic-title">
            {topic.topicTitle}
          </h1>

          <p className="topic-details">Published by {topic.topicAuthor?.displayName} on {topic.topicCreationDate}</p>
          <img src={topic.topicImage} alt="No image available" width='500'></img>
          <p className="topicContent">{topic.topicContent}</p>

          <dialog className="deletePopup" ref={deletePopup}>
            <section className="topicDeletePopup">
              <h3 className="popupHeader">Are you sure you wish to delete this topic?</h3>
              <Link to={`/`}>
                <button className="yesDelete" onClick={e => handleDeleteTopic(topic)}>Yes</button>
              </Link>
              <button className="NoDelete" onClick={e => deletePopup.current.close()}>No</button>
            </section>
          </dialog>

          <p>{renderDelete()}</p>
          <p>{renderEdit(topic.id)}</p>
        </div>

        <dialog className="addThread" ref={addComment}>
          <section className="commentBox">
            <h3 className="popupHeader">Add to the Thread:</h3>
            <div className="form-group">
              <label htmlFor="threadComment"></label>
              <textarea name="threadComment" id="threadComment" rows="20" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Content" value={newComment.threadComment} />
            </div>
            <Button onClick={handleSaveComment}>
              Post Comment
            </Button>
            <Button onClick={e => addComment.current.close()}>
              Cancel
            </Button>
          </section>
        </dialog>

        <Button color="primary" onClick={e => addComment.current.showModal()}>
          Add Comment
        </Button>
        <div>
          {threads.map((thread) => (
            <ThreadCard key={thread.id} comment={thread} userProfile={userProfile} topic={topicId}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopicDetails;