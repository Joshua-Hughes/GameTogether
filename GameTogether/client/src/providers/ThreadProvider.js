import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ThreadContext = React.createContext();

export const ThreadProvider = (props) => {
    const [threads, setThreads] = useState([])
    const { getToken } = useContext(UserProfileContext)
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))

    const getThreadByTopic = (topicId) => {
        return getToken().then((token) =>
            fetch(`/thread/${topicId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()));
    }
    return (
        <ThreadContext.Provider value={{ threads, getThreadByTopic }}>
            {props.children}
        </ThreadContext.Provider>
    );
}