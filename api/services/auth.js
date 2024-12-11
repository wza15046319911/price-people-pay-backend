import { login as loginDB } from "../database/auth.js";

export const login = async (data) => {
    const { username, password } = data;
    if (!username || !password) {
        throw new Error('Username and password are required');
    }
    try {
        const token = await loginDB(data);
        return token;
    } catch (error) {
        throw new Error('Invalid username or password');
    }
}