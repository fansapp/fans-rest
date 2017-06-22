const fetch = require('isomorphic-fetch');
const queryString = require('query-string');


const handleResponse = call => call.then(response => response.json());

class Rest {
  constructor(options) {
    this.headers = {
      'Content-Type': 'application/json',
    };

    if ('headers' in options) {
      this.headers = this.mergeHeaders(options.headers);
    }

    if ('handleResponse' in options) {
      this.handleResponse = options.handleResponse;
    } else {
      this.handleResponse = handleResponse;
    }
  }

  mergeHeaders(headers) {
    return { ...this.headers, ...headers };
  }

  get(url, params = null, headers = {}) {
    const getUrl = params ? `${url}?${queryString.stringify(params)}` : url;
    return this.handleResponse(fetch(getUrl, {
      headers: this.mergeHeaders(headers),
    }));
  }

  post(url, body, headers = {}) {
    return this.handleResponse(fetch(url, {
      method: 'POST',
      headers: this.mergeHeaders(headers),
      body: JSON.stringify(body),
    }));
  }

  patch(url, body, headers = {}) {
    return this.handleResponse(fetch(url, {
      method: 'PATCH',
      headers: this.mergeHeaders(headers),
      body: JSON.stringify(body),
    }));
  }
}

export default (options) => new Rest(options);
