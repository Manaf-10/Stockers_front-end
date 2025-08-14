import Client from "./api";

export const createTransaction = async (userId, transactionData) => {
  try {
    const res = await Client.post(`/transactions/${userId}`, transactionData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const GetTransaction = async (user_id) => {
  try {
    const res = await Client.get(`/transactions/${user_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
