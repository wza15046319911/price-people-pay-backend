import dotenv from 'dotenv';
import request from 'supertest';
import app from './index.js';

// Mock the database module
jest.mock('./database/cars.js', () => ({
  getCars: jest.fn()
}));

// Import the mocked module
import { getCars } from './database/cars.js';

dotenv.config("../.env");

describe('GET /car', () => {
  // Test data
  const testCars = [
    {
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      description: 'Sedan in excellent condition',
      colour: 'Silver',
      engine: '2.5L 4-cylinder',
      transmission: 'Automatic',
      odometer: '50000 km',
      sale_date: '2024-03-15',
      accessories: 'Sunroof, Navigation',
      auction_information: 'Regular auction',
      vehicle_condition: 'Excellent',
      tyre_condition: { front: 'Good', rear: 'Good', spare: 'New' },
      keys_and_books: { keys: 2, service_books: true, manual: true },
      sale_location: 'Sydney',
      sale_category: 'Passenger',
      salvage_vehicle: false
    },
    {
      make: 'Honda',
      model: 'Civic',
      year: 2021,
      description: 'Well maintained city car',
      colour: 'Blue',
      engine: '1.8L 4-cylinder',
      transmission: 'CVT',
      odometer: '35000 km',
      sale_date: '2024-03-16',
      accessories: 'Bluetooth, Backup Camera',
      auction_information: 'Online auction',
      vehicle_condition: 'Good',
      tyre_condition: { front: 'Excellent', rear: 'Excellent', spare: 'Good' },
      keys_and_books: { keys: 1, service_books: true, manual: true },
      sale_location: 'Melbourne',
      sale_category: 'Passenger',
      salvage_vehicle: false
    }
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // Basic query tests
  describe('Basic Queries', () => {
    it('should return all cars when no query parameters are provided', async () => {
      // Mock the database response
      getCars.mockResolvedValueOnce(testCars);

      const response = await request(app).get('/car');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(getCars).toHaveBeenCalledWith({});
    });

    it('should return empty array when querying non-existent data', async () => {
      // Mock empty response
      getCars.mockResolvedValueOnce([]);

      const response = await request(app).get('/car?maker=nonexistent');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
      expect(getCars).toHaveBeenCalledWith({ maker: 'nonexistent' });
    });
  });

  // Single condition query tests
  describe('Single Condition Queries', () => {
    it('should filter by maker', async () => {
      // Mock filtered response
      const toyotaCars = testCars.filter(car => car.make === 'Toyota');
      getCars.mockResolvedValueOnce(toyotaCars);

      const response = await request(app).get('/car?maker=toyota');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(getCars).toHaveBeenCalledWith({ maker: 'toyota' });
    });

    it('should filter by model', async () => {
      // Mock filtered response
      const civicCars = testCars.filter(car => car.model === 'Civic');
      getCars.mockResolvedValueOnce(civicCars);

      const response = await request(app).get('/car?model=civic');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(getCars).toHaveBeenCalledWith({ model: 'civic' });
    });

    it('should filter by year', async () => {
      // Mock filtered response
      const cars2021 = testCars.filter(car => car.year === 2021);
      getCars.mockResolvedValueOnce(cars2021);

      const response = await request(app).get('/car?year=2021');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(getCars).toHaveBeenCalledWith({ year: '2021' });
    });
  });

  // Multiple conditions query tests
  describe('Multiple Conditions Queries', () => {
    it('should filter by maker and model', async () => {
      // Mock filtered response
      const filteredCars = testCars.filter(car => 
        car.make === 'Toyota' && car.model === 'Camry'
      );
      getCars.mockResolvedValueOnce(filteredCars);

      const response = await request(app).get('/car?maker=toyota&model=camry');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(getCars).toHaveBeenCalledWith({ 
        maker: 'toyota',
        model: 'camry'
      });
    });

    it('should return empty array when no cars match multiple conditions', async () => {
      // Mock empty response
      getCars.mockResolvedValueOnce([]);

      const response = await request(app).get('/car?maker=toyota&model=civic&year=2022');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
      expect(getCars).toHaveBeenCalledWith({ 
        maker: 'toyota',
        model: 'civic',
        year: '2022'
      });
    });
  });
});