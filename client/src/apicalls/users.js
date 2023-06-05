import { AxiosInstance } from ".";

const url = "http://localhost:5173/api/users/register";
export const LoginUser = async (user) => {
    try {
        const response = await AxiosInstance.post("/api/users/login", user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const RegisterUser = async (user) => {
    try {
        const response = await AxiosInstance.post(url, user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
