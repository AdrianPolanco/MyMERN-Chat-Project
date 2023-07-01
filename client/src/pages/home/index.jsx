import React, { useState } from "react";
import ChatArea from "./components/ChatArea";
import UserSearch from "./components/userSearch";
import UsersList from "./components/UsersList";

function Home({ username }) {
    const [searchKey, setSearchKey] = useState("");
    return (
        <div className="flex">
            <div className="w-96 p-5">
                <UserSearch searchKey={searchKey} setSearchKey={setSearchKey} />
                <UsersList searchKey={searchKey} />
            </div>
            <div>
                <ChatArea />
            </div>
        </div>
    );
}

export default Home;
