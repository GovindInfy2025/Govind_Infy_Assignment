import Logger from "../utilities/logger";
export const fetchCustomerData = async () => {
  try {
    const response = await fetch("/data/dummyData.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
      return
    }
    Logger.info("data is fetched")
    const dataJSON = await response.json();
    const data = dataJSON.data
    data.sort((a, b) => new Date(b.purchase_date) - new Date(a.purchase_date));
    return data;
  } catch (error) {
    Logger.error("Error fetching data: ", error);
    throw error
  }
};
