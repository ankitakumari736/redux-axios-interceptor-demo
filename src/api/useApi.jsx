import { useState } from "react";
import apiAxios, { authAxios, tmdbAxios } from "./axiosInstance";

const useApi = (apiObject) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const call = async (payload = null, onSuccess, onFail) => {

    setLoading(true);
    setError(null);

    try {
      // const instance = apiObject.isAuth ? authAxios : apiAxios;
      let instance = apiAxios;

      if (apiObject.isAuth) instance = authAxios;
      if (apiObject.isTmdb) instance = tmdbAxios;


      const res = await instance({
        method: apiObject.method,
        url:
          typeof apiObject.url === "function"
            ? apiObject.url(payload?.id || payload)
            : apiObject.url,

        data:
          apiObject.method === "POST" || apiObject.method === "PUT"
            ? payload
            : undefined,
      });

      setData(res);
      onSuccess && onSuccess(res);
      return res;
    } catch (err) {
      setError(err.message);
      onFail && onFail(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { call, data, loading, error };
};

export default useApi;
