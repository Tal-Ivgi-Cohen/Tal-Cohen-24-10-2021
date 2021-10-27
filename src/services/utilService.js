export const utilService = {
  makeId,
  celsiusToFahrenheit
}

function makeId(length = 6) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

export function celsiusToFahrenheit(num) {
  return Math.floor((num * 9) / 5 + 32);
};
