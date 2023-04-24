/** @format */

export const calculateTotlaPrice = (data) => {
  var price = 0;
  for (let i = 0; i < data.length; i++) {
    price = price + data[i].item.price;
  }
  return price;
};
