import queryString from 'query-string';
import ContentTypes from './ContentTypes';


const globalObj = global || window;


const handleResponse = call =>
  call.then(response => response.text())
      .then(text => {
        if (text === '') {
          return {};
        }
        return JSON.parse(text);
      });

class Rest {
  constructor(options = {}) {
    this.headers = {
      'Content-Type': ContentTypes.json,
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

  head(url, params = null, headers = {}) {
    const headUrl = params ? `${url}?${queryString.stringify(params)}` : url;
    return this.handleResponse(fetch(headUrl, {
      method: 'HEAD',
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

  put(url, body, headers = {}) {
    return this.handleResponse(fetch(url, {
      method: 'PUT',
      headers: this.mergeHeaders(headers),
      body: JSON.stringify(body),
    }));
  }

  delete(url, body, headers = {}) {
    return this.handleResponse(fetch(url, {
      method: 'DELETE',
      headers: this.mergeHeaders(headers),
      body: JSON.stringify(body),
    }));
  }
}

export default (options) => {
  if (!globalObj.fetch) {
    throw new Error('Missing implementation of fetch API.');
  }

  return new Rest(options);
}
