import fetch from 'isomorphic-fetch';
import queryString from 'query-string';


const decodeResponse = response => response.json();

class Rest {
  constructor(options) {
    this.options = options;
    this.headers = {
      'Content-Type': 'application/json',
    };

    if ('headers' in options) {
      this.headers = {
        ...this.headers,
        ...options.headers,
      };
    }
  }

  mergeHeaders(headers) {
    return {
      ...this.headers,
      ...headers,
    };
  }

  get(url, headers, params = null) {
    const getUrl = params ? `${url}?${queryString.stringify(params)}` : url;
    return fetch(getUrl, {
      headers: this.mergeHeaders(headers),
    })
    .then(decodeResponse);
  }

  post(url, headers, body) {
    return fetch(url, {
      method: 'POST',
      headers: this.mergeHeaders(headers),
      body: JSON.stringify(body),
    })
    .then(decodeResponse);
  }

  patch(url, headers, body) {
    return fetch(url, {
      method: 'PATCH',
      headers: this.mergeHeaders(headers),
      body: JSON.stringify(body),
    })
    .then(decodeResponse);
  }
}


export default new Rest();
