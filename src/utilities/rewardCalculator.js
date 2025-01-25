const rewardCalculator = (data) => {
  const rewardData = data
    .filter((cust) => {
      // To consider only last 3 months records
      return (
        new Date(cust.purchase_date) >=
        new Date(new Date().setMonth(new Date().getMonth() - 3))
      );
    })
    .map((cust) => {
      let points = 0;
      let price = Math.round(cust.price);
      if (price > 100) {
        points = points + 2 * (price - 100);
        price = 100;
      }
      if (price >= 50 && price <= 100) points = points + 1 * (price - 50);
      return {
        ...cust,
        Rewards: points,
      };
    });
  return rewardData;
};
export default rewardCalculator;
