import { AxiosInstance } from ".";

export const GetAllChats = async () => {
    try {
        const response = await AxiosInstance.get(
            "http://localhost:3000/api/chats/get-all-chats"
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const CreateNewChat = async (members) => {
    try {
        const response = await AxiosInstance.post(
            "http://localhost:3000/api/chats/create-new-chat",
            { members }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
