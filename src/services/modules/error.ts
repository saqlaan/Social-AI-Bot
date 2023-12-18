import { showMessage } from 'react-native-flash-message';

export const showErrorMessage = () =>
  showMessage({
    message: 'Error!',
    description: 'Something went wrong. Please try again',
    type: 'danger',
  });
