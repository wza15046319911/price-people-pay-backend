import dotenv from 'dotenv';
import request from 'supertest';
import app from './index.js';
import { neon } from '@neondatabase/serverless';

dotenv.config("../.env");

const db = neon(process.env.VITE_DATABASE_URL);

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
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      year: 2021,
      description: 'Economic and reliable',
      colour: 'White',
      engine: '2.0L 4-cylinder',
      transmission: 'Automatic',
      odometer: '40000 km',
      sale_date: '2024-03-17',
      accessories: 'Apple CarPlay, Android Auto',
      auction_information: 'Regular auction',
      vehicle_condition: 'Very Good',
      tyre_condition: { front: 'Good', rear: 'Good', spare: 'Good' },
      keys_and_books: { keys: 2, service_books: true, manual: true },
      sale_location: 'Brisbane',
      sale_category: 'Passenger',
      salvage_vehicle: false
    },
    {
      make: 'BMW',
      model: 'X5',
      year: 2022,
      description: 'Luxury SUV with low mileage',
      colour: 'Black',
      engine: '3.0L 6-cylinder',
      transmission: 'Automatic',
      odometer: '15000 km',
      sale_date: '2024-03-18',
      accessories: 'Premium Package, Leather seats',
      auction_information: 'Premium auction',
      vehicle_condition: 'Excellent',
      tyre_condition: { front: 'Excellent', rear: 'Excellent', spare: 'Excellent' },
      keys_and_books: { keys: 2, service_books: true, manual: true, extra_key: true },
      sale_location: 'Sydney',
      sale_category: 'SUV',
      salvage_vehicle: false
    }
  ];

  beforeAll(async () => {
    await db`TRUNCATE TABLE cars_test`;
    for (const car of testCars) {
        await db`
        INSERT INTO cars_test (
          make, model, year, description, colour, engine, transmission,
          odometer, sale_date, accessories, auction_information,
          vehicle_condition, tyre_condition, keys_and_books, 
          sale_location, sale_category, salvage_vehicle
        ) VALUES (
          ${car.make}, ${car.model}, ${car.year}, ${car.description},
          ${car.colour}, ${car.engine}, ${car.transmission},
          ${car.odometer}, ${car.sale_date}::date, ${car.accessories},
          ${car.auction_information}, ${car.vehicle_condition},
          ${JSON.stringify(car.tyre_condition)}, ${JSON.stringify(car.keys_and_books)},
          ${car.sale_location}, ${car.sale_category}, ${car.salvage_vehicle}
        )
      `;
    }
  });

  afterAll(async () => {
    await db`TRUNCATE TABLE cars_test`;
  });

  // Basic query tests
  describe('Basic Queries', () => {
    it('should return all cars when no query parameters are provided', async () => {
      const response = await request(app).get('/car');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(4);
    });

    it('should return empty array when querying non-existent data', async () => {
      const response = await request(app).get('/car?maker=nonexistent');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(0);
    });
  });

  // Single condition query tests
  describe('Single Condition Queries', () => {
    it('should filter by manufacturer', async () => {
      const response = await request(app).get('/car?maker=toyota');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body.every(car => car.make.toLowerCase() === 'toyota')).toBe(true);
    });

    it('should filter by model', async () => {
      const response = await request(app).get('/car?model=civic');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].model).toBe('Civic');
    });

    it('should filter by year', async () => {
      const response = await request(app).get('/car?year=2021');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body.every(car => car.year === 2021)).toBe(true);
    });
  });
}); 