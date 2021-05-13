import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TopicContext = React.createContext();

export const TopicProvider = (props) => {
    const [topics, setTopics] = useState([])
    const { getToken } = useContext(UserProfileContext)
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))

    const getAllTopics = () => {
        return getToken().then((token) =>
            fetch("/api/Topic", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json()))
                .then(setTopics)
    }

    const searchTopics = (query) => {
        if (query != "") {
            return getToken().then((token) =>
                fetch(`/api/Topic/${query}/SearchTopics`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((res) => res.json())
                    .then(setTopics))
        }
    }

    const getTopicDetails = (id) => {
        return getToken().then((token) =>
            fetch(`/api/Topic/${id}/TopicDetails`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))
    }

    const addTopic = (topic) => {
        return getToken().then((token) =>
            fetch("/api/Topic/add", {
                method: "POST",
                headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(topic),
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Unauthorized");
            })
        )
    };

    const DeleteTopic = (topicId) => {
        return getToken().then((token) =>
            fetch(`/api/Topic/delete/${topicId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(topicId),
            })
        )
    };

    const EditTopic = (topic) => {
        getToken().then((token) => 
        fetch(`/api/Topic/${topic.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(topic),
        })
            .then(getTopicDetails(topic.id)))
    }


    return (
        <TopicContext.Provider value={{ topics, getAllTopics, searchTopics, getTopicDetails, addTopic, DeleteTopic, EditTopic }}>
            {props.children}
        </TopicContext.Provider>
    );
}