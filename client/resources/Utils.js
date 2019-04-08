const formatPrice = (priceInCents) => {
  let newPrice = priceInCents / 100;
  newPrice = `$${newPrice}`;
  return newPrice
};

const formatDate = (completeDate) => {
  const curDate = new Date(Date.now());
  let date = new Date(completeDate);
  let timeDiff = Math.abs(curDate.getTime() - date.getTime());
  var diffDays = Math.ceil(timeDiff / (24000 * 3600));
  if(diffDays <= 7) {
    return `${diffDays} day/s ago`;
  }
  return completeDate;
};

const getAdUrl = () => {
  let adId = Math.floor(Math.random() * 1000);
  return `/ads/?r=${adId}`;
};

module.exports = {
  formatDate,
  formatPrice,
  getAdUrl,
}