const getTimestamp = () => {
  const today = new Date();
  const YYYY = today.getFullYear();
  let DD = formatSingle(today.getDate());
  let MM = formatSingle(today.getMonth() + 1);
  let hh = formatSingle(today.getHours());
  let mm = formatSingle(today.getMinutes());

  const fullDate = `${YYYY}-${MM}-${DD} ${hh}:${mm}`;

  return fullDate;
};

const formatSingle = (digit: Number) => {
  if (digit < 10) {
    return `0${digit}`;
  } else {
    return digit;
  }
};

export { getTimestamp };
