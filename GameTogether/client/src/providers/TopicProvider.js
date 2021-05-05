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
                .then((res) => res.json())
                .then(setTopics))
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


    return (
        <TopicContext.Provider value={{ topics, getAllTopics, searchTopics, getTopicDetails }}>
            {props.children}
        </TopicContext.Provider>
    );
}