import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export function fetchDeposits(payload) {
  return axios.get(`${BASE_URL}/api/transactions`);
}

export function fetchBalance() {
  return axios.get(`${BASE_URL}/api`)
}
