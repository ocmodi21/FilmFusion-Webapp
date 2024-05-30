export default function useFetch() {
  const httpGet = async (
    endpoint: string,
    token?: string | null
  ): Promise<any> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();

      if (response.status !== 200) {
        return { isError: true, data: res.message };
      }
      return res;
    } catch (error) {
      return { isError: true, data: "Something went wrong!!" };
    }
  };

  const httpPost = async (
    endpoint: string,
    data: any,
    token?: string | null
  ): Promise<any> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();

      if (response.status !== 200) {
        return { isError: true, data: res.message };
      }
      return res;
    } catch (error) {
      return { isError: true, data: "Something went wrong!!" };
    }
  };

  const httpPut = async (
    endpoint: string,
    data: any,
    token?: string | null
  ): Promise<any> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();

      if (response.status !== 200) {
        return { isError: true, data: res.message };
      }
      return res;
    } catch (error) {
      return { isError: true, data: "Something went wrong!!" };
    }
  };

  return { httpGet, httpPost, httpPut };
}
