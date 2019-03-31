const formatPrice = (priceInCents) => {
  let newPrice = priceInCents / 100;
  newPrice = `$${newPrice}`;
  return newPrice
};

module.exports = {
  formatPrice,
}