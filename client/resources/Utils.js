const formatPrice = (priceInCents) => {
  let newPrice = priceInCents / 100;
  newPrice = `$${newPrice}`;
  return newPrice
};

const formatDate = (completeDate) => {
  const curDate = new Date(Date.now());
  let date = new Date(completeDate);
  let timeDiff = Math.abs(curDate.getTime() - date.getTime());
  var diffDays = Math.ceil(timeDiff / (24000 * 3600))
  if(diffDays <= 7) {
    return `${diffDays} days ago`
  }
  // Should the function return UTC or GMT accordingly?
  return completeDate
}

module.exports = {
  formatDate,
  formatPrice,
}