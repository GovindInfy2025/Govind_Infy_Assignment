const rewardCalculator = (data) => {
  data.forEach((cust) => {
    let points = 0;
    let price = Math.round(cust.price);
    if (price > 100) {
      points = points + 2 * (price - 100);
      price = 100;
    }
    if (price >= 50 && price <= 100) points = points + 1 * (price - 50);
    cust['Rewards'] = points;
  });
  console.log('data', data);
  return data;
};
export default rewardCalculator;
