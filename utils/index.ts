import { CarProps, FilterProps } from "@/types";

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "f4f53d1f4fmsh390c9d4ee8bea68p1a36bdjsn6a1fed5cb9b0",
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    },
};

export async function fetchCars(filter: FilterProps) {
    const { manufacturer, fuel, year, model, limit } = filter;

    const headers = {
        "X-RapidAPI-Key": "f4f53d1f4fmsh390c9d4ee8bea68p1a36bdjsn6a1fed5cb9b0",
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    };

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}&make=${manufacturer}&fuel_type=${fuel}&year=${year}&limit=${limit}` , {
        headers: headers,
    });

    console.log(fuel)

    const result = await response.json();

    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;

    url.searchParams.append("customer", 'hrjavascript-mastery');
    url.searchParams.append("make", make);
    url.searchParams.append("modelFamily", model.split(" ")[0]);
    url.searchParams.append("zoomType", "fullscreen");
    url.searchParams.append("modelYear", `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append("angle", `${angle}`);

    return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value);

    const newPath = `${window.location.pathname}?${searchParams.toString()}`

    return newPath;
}