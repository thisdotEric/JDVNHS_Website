import axios from 'axios';

type METHOD = 'GET' | 'POST';

export default async function apiFetch(
    endpoint: string,
    method: METHOD = 'GET'
) {
    return await axios({
        url: `${process.env.JDVNHS_API}${endpoint}`,
        method,
    });
}
