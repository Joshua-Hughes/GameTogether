import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import TopicsList from "./Topics/TopicsList";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { TopicProvider } from "../providers/TopicProvider";
import TopicDetails from "./Topics/TopicDetails";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <TopicProvider>
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
                </TopicProvider>
            </Switch>
        </main >

    );
};
