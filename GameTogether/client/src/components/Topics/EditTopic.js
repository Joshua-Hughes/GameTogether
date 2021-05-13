import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "reactstrap";
import { TopicContext } from "../../providers/TopicProvider"

export const EditTopicForm = () => {
    const { EditTopic, getTopicDetails } = useContext(TopicContext)

    let { topicId } = useParams();
    
    const [topic, setTopic] = useState({});

    useEffect(() => {
        getTopicDetails(topicId)
            .then((res) => setTopic(res))
    }, [])

    const handleControlledInputChange = (event) => {
        const newTopic = { ...topic};

        newTopic[event.target.id] = event.target.value
        setTopic(newTopic);
    }

    const handleUpdateTopic = () => {
        EditTopic({
            id: topic.id,
            topicTitle: topic.topicTitle,
            topicContent: topic.topicContent,
            topicImage: topic.topicImage
        })
    };

    return (
        <section className="topic_form">
        <h2 className="topic_form_header">Edit Topic</h2>
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
        <Button color="primary" onClick={handleUpdateTopic}>
            <Link className="saveTopic" to={`/Topic/${topic.id}`} style={{ color: `#FFF` }}>
                Update Topic
            </Link>
        </Button>

    </section>
    );
};
export default EditTopicForm;