import { useMutation } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { PostQuery } from "../types/post-query";

export default function usePostData({ key, url, data, token }: PostQuery) {
  const { httpPost } = useFetch();
  return useMutation({
    mutationKey: [`${key}`],
    mutationFn: async () => {
      return await httpPost(`${url}`, data, token);
    },
  });
}
