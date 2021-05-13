import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap";
import { TopicContext } from "../../providers/TopicProvider"

export const AddTopicForm = () => {
    const { addTopic, getAllTopics } = useContext(TopicContext)

    const [topic, setTopic] = useState({
        "topicTitle": "",
        "topicContent": "",
        "topicCreationDate": "",
        "topicImage": ""
    });

    useEffect(() => {
        getAllTopics()
    }, [])

    const handleControlledInputChange = (event) => {
        const newTopic = { ...topic };

        newTopic[event.target.id] = event.target.value
        setTopic(newTopic);
    }

    const handleSaveTopic = () => {
        if (topic.topicTitle === "") {
            window.alert("No Topic for you!")
        } else {
            addTopic({
                topicTitle: topic.topicTitle,
                topicContent: topic.topicContent,
                topicCreationDate: new Date(),
                topicImage: topic.topicImage
            })
        }
    };

    return (
        <section className="topic_form">
            <h2 className="topic_form_header">New Topic</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="topicTitle">Title:</label>
                    <input
                        type="text" id="topicTitle" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title" value={topic.topicTitle} />
                </div>
                <div className="form-group">
                    <label htmlFor="topicContent">Content:</label>
                    <textarea name="topicContent" id="topicContent" rows="20" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Content" value={topic.topicContent} />
                </div>
                <div className="form-group">
                    <label htmlFor="topicImage">Image Location:</label>
                    <input
                        type="text" id="topicImage" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Image Location" value={topic.topicImage} />
                </div>
            </fieldset>
            <Link className="saveTopic" to={"/"} style={{ color: `#FFF` }}>
                <Button color="primary" onClick={handleSaveTopic}>
                    Save Post
                </Button>
            </Link>

        </section>
    );
};
export default AddTopicForm;