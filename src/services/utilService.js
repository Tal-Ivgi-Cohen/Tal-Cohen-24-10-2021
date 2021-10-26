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

/*function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getCurrencyIcon(currencyCode) {
    switch (currencyCode) {
      case 'EUR':
        return '€'
      case 'ILS':
        return '₪'
      case 'USD':
        return '$'
      default:
        return '£'
    }
  }

  function getRandomNum(){
    return Math.floor(Math.random*10000);
}*/