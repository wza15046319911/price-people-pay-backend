import { getCars as getDBCars } from "../database/cars.js";

export const getCars = async ({ maker, model, year }) => {
    const cars = await getDBCars({ maker, model, year });
    return cars;
}