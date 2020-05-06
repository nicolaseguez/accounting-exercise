export const GET_DEPOSITS = 'get_deposits';
export const FETCH_DEPOSITS = 'fetch_deposits';
export const GET_DEPOSIT = 'get_deposit';
export const FETCH_DEPOSIT = 'fetch_deposit';
export const GET_BALANCE = 'get_balance';
export const FETCH_BALANCE = 'fetch_balance';

const initialDeposits = {
  deposits: []
};

export function deposits(state = initialDeposits, action) {
  switch(action.type) {
    case GET_DEPOSITS:
      return { ...state, deposits: action.payload };
    default:
      return state;
  }
}

const initialBalance = { balance: 0 };

export function balance(state = initialBalance, action) {
  switch(action.type) {
    case GET_BALANCE:
      return action.payload;
    default:
      return state;
  }
}

// Actions

export const getDeposits = (payload) => ({
  type: GET_DEPOSITS,
  payload
});

export const fetchDeposits = () => ({
  type: FETCH_DEPOSITS,
});

export const getDeposit = (payload) => ({
  type: GET_DEPOSIT,
  payload
});

export const fetchDeposit = () => ({
  type: FETCH_DEPOSIT
});

export const fetchBalance = () => ({
  type: FETCH_BALANCE
});

export const getBalance = (payload) => ({
  type: GET_BALANCE,
  payload
});
