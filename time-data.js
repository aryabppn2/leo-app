const date = new Date();
const hours = {
  h: date.getHours(),
  m: date.getMinutes(),
};
const day = {
  d: date.getDate(),
  m: date.getMonth()+1  ,
  y: date.getFullYear(),
};

module.exports = { hours, day };
