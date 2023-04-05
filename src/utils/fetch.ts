import { log } from 'next-axiom';

export const fetcher = async (
  functionName: string,
  url: string,
  method: 'PUT' | 'POST' | 'DELETE' | 'GET' = 'GET',
  body?: {}
) => {
  let options = null;
  if (method !== 'GET' && method !== 'DELETE') {
    options = {
      method: method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  try {
    const response = options ? await fetch(url, options) : await fetch(url);
    log.info(
      `${functionName} function -  ${method} ${url} response: ${response.status}`
    );
    return response.json();
  } catch (error) {
    log.error(`${functionName} function - ${method} ${url} error: ${error}`);
  }
};
