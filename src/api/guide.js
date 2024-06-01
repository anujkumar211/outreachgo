import axios from "axios";
import instanceAxios from "./index";
export default function PostApiInstance() {
  const AllPosts = async () => {
    const res = await instanceAxios({
      url: `posts/`,
    });
    return res;
  };
  const CREATE = async (data) => {
    const res = await instanceAxios({
      method: "POST",
      url: `posts/`,
      data: data,
    });
    return res;
  };
  const UpdatePost = async (data) => {
    const res = await instanceAxios({
      method: "PATCH",
      url: `posts/${data.id}`,
      data: data,
    });
    return res;
  };
  const SinglePost = async (id) => {
    const res = await instanceAxios({
      url: `posts/${id}`,
    });
    return res;
  };
  const ThrashPost = async (id) => {
    const res = await instanceAxios({
      method: "Delete",
      url: `posts/${id}`,
    });
    return res;
  };
  return {
    CREATE,
    AllPosts,
    UpdatePost,
    SinglePost,
    ThrashPost,
  };
}
