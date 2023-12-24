const initialState = {
  token: null,
  userInfo: null,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'STORE_TOKEN':
      const { token, userInfo } = action.payload;
      const newState = {
        ...state,
        token: token,
        userInfo: userInfo,
      };
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      return newState;
    default:
      return state;
  }
};
