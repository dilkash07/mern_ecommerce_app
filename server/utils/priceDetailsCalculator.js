exports.priceDetailsCalculator = (cart) => {
  // calculate total mrp
  cart.totalMrp = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // calculate discount on mrp
  cart.discountOnMrp = cart.items.reduce(
    (acc, item) => acc + item.quantity * (item.price - item.sellingPrice),
    0
  );

  // calculate total amount
  cart.totalAmount = cart.items.reduce(
    (acc, item) =>
      acc + item.quantity * (item.price - (item.price - item.sellingPrice)),
    0
  );
};
