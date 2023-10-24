/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});
