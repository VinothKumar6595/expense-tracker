const endpoint = localStorage.getItem("endpoint");

export const signUpUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDby8Uxri9t7jhfBlwSQa4HydE1Qd2P7o8";
export const logInUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDby8Uxri9t7jhfBlwSQa4HydE1Qd2P7o8";
export const updateProfileUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDby8Uxri9t7jhfBlwSQa4HydE1Qd2P7o8";
export const getUserDetailsUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDby8Uxri9t7jhfBlwSQa4HydE1Qd2P7o8";
export const sendEmailVerificationUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDby8Uxri9t7jhfBlwSQa4HydE1Qd2P7o8";
export const changePwdUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDby8Uxri9t7jhfBlwSQa4HydE1Qd2P7o8";
export const addExpenseUrl = `https://expense-tracker-3befd-default-rtdb.firebaseio.com${endpoint}/expenses.json`;
