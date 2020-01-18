// eslint-disable-next-line import/prefer-default-export
export const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
export const errorMessage = (error) => {
  console.log('venus---errorMessage', error);
  if (typeof(error) === 'object')
    return error.data.message;
  else return error;
}
