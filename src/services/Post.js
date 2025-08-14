import Client from "./api";

export const GetPosts = async () => {
  try {
    const res = await Client.get("/posts");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const userPosts = async (user_id) => {
  try {
    const res = await Client.get(`/posts/user/${user_id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const NewPost = async (data) => {
  try {
    const res = await Client.post(`/posts`, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetEditPost = async (post_id) => {
  try {
    const res = await Client.get(`/posts/${post_id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const EditPosts = async (post_id, data) => {
  try {
    const res = await Client.put(`/posts/${post_id}`, data);
    return res;
  } catch (error) {
    throw error;
  }
<<<<<<< HEAD
};
=======
}

export const DeletePosts = async (post_id, data) => {
  try {
    const res = await Client.delete(`/posts/${post_id}`, data)
    return res
  } catch (error) {
    throw error
  }
}
>>>>>>> 6aec15f42c0e239b41a8d3e15ec6e7e987d941b9
