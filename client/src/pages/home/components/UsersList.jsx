import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewChat } from "../../../apicalls/chat";
import { HideLoader, ShowLoader } from "../../../redux/loaderSlice";
import { toast } from "react-toastify";
import { SetAllChats } from "../../../redux/userSlice";

const UsersList = ({ searchKey }) => {
    const { allUsers, allChats, user } = useSelector(
        (state) => state.userReducer
    );
    const dispatch = useDispatch();
    const createNewChat = async (userId) => {
        try {
            dispatch(ShowLoader());
            const response = await CreateNewChat(userId);
            dispatch(HideLoader());
            if (response.success) {
                toast.done(response.message);
                const newChat = response.data;
                const updatedChats = [...allUsers, newChat];
                dispatch(SetAllChats(updatedChats));
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoader());
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col gap-1 mt-5">
            {allUsers
                .filter(
                    (userObj) =>
                        userObj.name
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) && searchKey
                )
                .map((userObj) => {
                    return (
                        <div className="shadow-sm border p-5 rounded-2xl bg-white flex justify-between items-center">
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
                            <div onClick={() => createNewChat(userObj._id)}>
                                {!allChats.find((chat) =>
                                    chat.members.includes(userObj._id)
                                ) && (
                                    <button className="border border-primary text-primary bg-white p-1.5 rounded-full hover:bg-primary hover:text-white hover:border-white">
                                        Message
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default UsersList;
