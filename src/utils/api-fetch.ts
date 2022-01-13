import axios from 'axios';

export type METHOD = 'GET' | 'POST';

const instance = axios.create({
  baseURL: `${process.env.JDVNHS_API}`,
});

export default async function apiFetch(
  endpoint: string,
  method: METHOD = 'GET',
  data?: any
) {
  return instance({
    url: endpoint,
    method,
    data,
  });
}
