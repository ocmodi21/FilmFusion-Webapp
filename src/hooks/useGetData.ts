import { useQuery } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { GetQuery } from "../types/get-query";

export default function useGetData({ key, url, token }: GetQuery) {
  const { httpGet } = useFetch();
  return useQuery({
    queryKey: [`${key}`],
    queryFn: async () => {
      return await httpGet(`${url}`, token);
    },
  });
}
