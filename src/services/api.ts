import axios from "axios";

export const api = axios.create({
  baseURL: 'https://node-sequelize-les.onrender.com',
  headers: {
    "Content-Type": "application/json",
  },
});