import { AxiosInstance } from ".";

export const LoginUser = async (user) => {
    const urlLogin = "http://localhost:3000/api/users/login";
    try {
        const response = await AxiosInstance.post(urlLogin, user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const RegisterUser = async (user) => {
    const urlRegister = "http://localhost:3000/api/users/register";
    try {
        const response = await AxiosInstance.post(urlRegister, user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const GetCurrentUser = async () => {
    const urlGetCurrentUser =
        "http://localhost:3000/api/users/get-current-user";
    try {
        const response = await AxiosInstance.get(urlGetCurrentUser);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
