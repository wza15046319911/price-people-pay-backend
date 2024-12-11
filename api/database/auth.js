import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config("../../.env");

export const login = async (data) => {
    const { username, password } = data;
    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } else {
        throw new Error('Invalid username or password');
    }
}   