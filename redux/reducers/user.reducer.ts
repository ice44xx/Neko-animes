const initialState = {
  userData: null,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'STORE_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
