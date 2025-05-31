import axios from 'axios';

const API_KEY = '1bf81500eb67321a38068b90';
const BASE_URL = "https://v6.exchangerate-api.com/v6/1bf81500eb67321a38068b90/latest/XPF";

export const getRates = async () => {
    const response = await axios.get(BASE_URL);
    return response.data.conversion_rates;
};