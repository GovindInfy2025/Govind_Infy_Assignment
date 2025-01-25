export const monthlyCalculator = (data) => {
  let grpData = data.reduce((acc, obj) => {
    const month = new Date(obj.purchase_date).getMonth() + 1;
    const year = new Date(obj.purchase_date).getFullYear();
    let key =
      obj.customer_id + "-" + obj.customer_name + "-" + month + "-" + year;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += obj.Rewards;
    return acc;
  }, {});
  let monthArr = [];
  const col = ["customer_id", "customer_name", "Month", "Year"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthObj = {};
  for (const item in grpData) {
    let val = item.split("-");
    val.map((k, i) => (monthObj = { ...monthObj, [col[i]]: val[i] }));
    monthObj["Monthly Rewards"] = grpData[item];
    monthObj["Month"] = months[monthObj["Month"] - 1];
    monthArr.push(monthObj);
  }
  return monthArr;
};

export const totalRewardCal = (data) => {
  let grpData = data.reduce((acc, obj) => {
    let key = obj.customer_name;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += obj.Rewards;
    return acc;
  }, {});
  let totalArr = [];
  for (const item in grpData) {
    totalArr.push({ "Customer Name": item, "Total Rewards": grpData[item] });
  }
  return totalArr;
};
