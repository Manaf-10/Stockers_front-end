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
<<<<<<< HEAD
};
=======
}

>>>>>>> 6aec15f42c0e239b41a8d3e15ec6e7e987d941b9
