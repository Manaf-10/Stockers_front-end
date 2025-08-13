import Client from "./api";

export const RegisterUser = async (formData) => {
  try {
    const res = await Client.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const SignInUser = async (data) => {
  try {
    const res = await Client.post("/auth/login", data);
    if (res.data.msg) return res.data;
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const CheckSession = async () => {
  try {
    const res = await Client.get("/auth/session");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdatePassword = async (user_id, data) => {
  try {
    const res = await Client.put(`/auth/update/${user_id}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (user_id, data) => {
  try {
    const res = await Client.put(`/auth/updateProfile/${user_id}`, data);
    console.log(res)
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
