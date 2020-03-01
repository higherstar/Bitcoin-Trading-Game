// eslint-disable-next-line import/prefer-default-export
export const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
export const errorMessage = (error) => {
  console.log('venus---errorMessage', error);
  if (typeof(error) === 'object')
    return error.data.message;
  else return error;
}

export const changeAmountUnit = (amount) => {
  return Math.abs(amount) > 999999 
    ? Math.sign(amount)*((Math.abs(amount)/1000000).toFixed(1)) + 'M' 
    : Math.abs(amount) > 999 
    ? Math.sign(amount)*((Math.abs(amount)/1000).toFixed(1)) + 'K' 
    : Math.sign(amount)*Math.abs(amount);
}