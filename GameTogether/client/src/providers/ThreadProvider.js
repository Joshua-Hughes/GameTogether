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
                .then((res) => res.json())
                .then(setThreads));
    }

    const AddComment = (comment) => {
        return getToken().then((token) =>
            fetch("/api/ThreadComment/add", {
                method: "POST",
                headers:
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment),
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
        )
    };

    const DeleteComment = (commentId) => {
        return getToken().then((token) =>
            fetch(`/api/ThreadComment/delete/${commentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentId),
            })
        )
    };

    const EditComment = (comment) => {
        getToken().then((token) => 
        fetch(`/api/ThreadComment/${comment.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }))
    }

    return (
        <ThreadContext.Provider value={{ threads, getThreadByTopic, AddComment, DeleteComment, EditComment }}>
            {props.children}
        </ThreadContext.Provider>
    );
}