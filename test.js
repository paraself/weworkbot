
let t = 89

function checkPalindrom (str) {
  return str === str.split('').reverse().join('');
}
console.log(t);
for(let i = 0; i < 100000000000; i++) {
  t = t + parseInt(t.toString().split('').reverse().join(''))
  console.log(t);
  if (checkPalindrom(t.toString()) ) {
    break;
  }
}
