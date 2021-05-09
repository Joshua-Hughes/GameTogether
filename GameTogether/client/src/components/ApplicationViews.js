import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import TopicsList from "./Topics/TopicsList";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { TopicProvider } from "../providers/TopicProvider";
import TopicDetails from "./Topics/TopicDetails";
import { ThreadProvider } from "../providers/ThreadProvider";
import AddTopicForm from "./Topics/AddTopic";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <TopicProvider>
                    <ThreadProvider>
                        <Route path="/login">
                            <Login />
                        </Route>

                        <Route path="/register">
                            <Register />
                        </Route>

                        <Route exact path="/">
                            {isLoggedIn ? <TopicsList /> : <Redirect to="/login" />}
                        </Route>

                        <Route exact path="/Topic/:topicId(\d+)">
                            {isLoggedIn ? <TopicDetails /> : <Redirect to="/login" />}
                        </Route>

                        <Route exact path="/Topic/New">
                            {isLoggedIn ? <AddTopicForm /> : <Redirect to="/login" />}
                        </Route>
                    </ThreadProvider>
                </TopicProvider>
            </Switch>
        </main >

    );
};
