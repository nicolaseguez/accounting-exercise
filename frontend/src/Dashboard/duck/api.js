import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export function fetchDeposits(payload) {
  return axios.get(`${BASE_URL}/api`);
}

export function fetchDeposit(id) {
  return axios.get(`${BASE_URL}/api/${id}`);
}

export function fetchErrors() {
  return axios.get(`${BASE_URL}/api/errors`);
}
