import { login } from './services/auth.js';
import { login as loginDB } from './database/auth.js';

// Mock the database module
jest.mock('./database/auth.js');

describe('Auth Service', () => {
    // Reset all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should successfully login with admin credentials', async () => {
            const mockToken = 'mock-jwt-token';
            const credentials = {
                username: 'admin',
                password: 'admin'
            };

            loginDB.mockResolvedValueOnce(mockToken);

            const result = await login(credentials);

            expect(result).toBe(mockToken);
            expect(loginDB).toHaveBeenCalledWith(credentials);
            expect(loginDB).toHaveBeenCalledTimes(1);
        });

        it('should throw error when admin password is incorrect', async () => {
            const credentials = {
                username: 'admin',
                password: 'wrongpassword'
            };

            loginDB.mockRejectedValueOnce(new Error('Database error'));

            await expect(login(credentials))
                .rejects
                .toThrow('Invalid username or password');
            
            expect(loginDB).toHaveBeenCalledWith(credentials);
            expect(loginDB).toHaveBeenCalledTimes(1);
        });

        it('should throw error when username is not admin', async () => {
            const credentials = {
                username: 'notadmin',
                password: 'admin'
            };

            loginDB.mockRejectedValueOnce(new Error('Database error'));

            await expect(login(credentials))
                .rejects
                .toThrow('Invalid username or password');
            
            expect(loginDB).toHaveBeenCalledWith(credentials);
            expect(loginDB).toHaveBeenCalledTimes(1);
        });
    });
});
