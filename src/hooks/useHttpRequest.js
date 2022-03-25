import { useEffect, useState } from 'react';

import axios from 'axios';

export function useAxiosGet(url) {
  const [request, setRequest] = useState({
    loading: false,
    data: null,
    error: false,
  });

  useEffect(() => {
    setRequest({
      loading: true,
      data: null,
      error: false,
    });
    axios
      .get(url)
      .then((response) => {
        setRequest({
          loading: false,
          data: response.data,
          error: false,
        });
      })
      .catch((e) => {
        setRequest({
          loading: false,
          data: null,
          error: true,
          message: e.message,
        });
      });
  }, [url]);
  return request;
}

export function useAxiosPost(url, payload) {
  const [request, setRequest] = useState({
    loading: false,
    data: null,
    error: false,
  });

  useEffect(() => {
    setRequest({
      loading: true,
      data: null,
      error: false,
    });
    axios
      .post(url, payload)
      .then((response) => {
        setRequest({
          loading: false,
          data: response.data,
          error: false,
        });
      })
      .catch((e) => {
        setRequest({
          loading: false,
          data: null,
          error: true,
          message: e.message,
        });
      });
  }, [url, payload]);
  return request;
}
