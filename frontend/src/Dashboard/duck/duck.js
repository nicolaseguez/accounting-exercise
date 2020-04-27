export const GET_DEPOSITS = 'get_deposits';
export const FETCH_DEPOSITS = 'fetch_deposits';
export const GET_DEPOSIT = 'get_deposit';
export const FETCH_DEPOSIT = 'fetch_deposit';
export const GET_ERRORS = 'get_errors';
export const FETCH_ERRORS = 'fetch_error';

const initialDeposits = {
  deposit: {},
  deposits: []
};

export function deposits(state = initialDeposits, action) {
  switch(action.type) {
    case GET_DEPOSITS:
      return { ...state, deposits: action.payload }
    case GET_DEPOSIT:
      return { ...state, deposit: action.payload }
    default:
      return state;
  }
}

const initialErrors = {
  errors: []
};

export function errors(state = initialErrors, action) {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, errors: action.payload }
    default:
      return state
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

export const getErrors = (payload) => ({
  type: GET_ERRORS,
  payload
});

export const fetchErrors = () => ({
  type: FETCH_ERRORS
});
