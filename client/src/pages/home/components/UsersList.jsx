import { useReducer } from "react";
import { useSelector } from "react-redux";

const UsersList = ({ searchKey }) => {
    const { allUsers } = useSelector((state) => state.userReducer);

    return (
        <div className="flex flex-col gap-1 mt-5">
            {allUsers
                .filter(
                    (user) =>
                        user.name
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) && searchKey
                )
                .map((userObj) => {
                    return (
                        <div className="shadow-sm border p-5 rounded-2xl bg-white">
                            <div className="flex gap-5 items-center">
                                {userObj.profilePic && (
                                    <img
                                        src={userObj.profilePic}
                                        alt="Profile pic"
                                        className="w-10 h-10 rounded-full"
                                    />
                                )}
                                {!userObj.profilePic && (
                                    <div className="bg-gray-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-thin">
                                        <h1 className="uppercase text-2xl font-thin">
                                            {userObj.name[0]}
                                        </h1>
                                    </div>
                                )}
                                <h1>{userObj.name}</h1>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default UsersList;
