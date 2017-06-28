![](https://travis-ci.org/fansapp/fans-rest.svg?branch=master)

# fans-rest

A library that lets you build pre-configured rest clients.  
Runs on browser and Node.

## Getting started

```
npm install --save fans-rest
```

## Usage

Use `create()` to create a new Rest client instance. Once done, reuse that instance anywhere you need.

**Note:** you will need to make sure `fetch` resolves by the time your first client is initialized.  
Any implementation of [WHATWG fetch](https://github.com/whatwg/fetch) will do. We recommend [`isomorphic-fetch`](https://github.com/matthew-andrews/isomorphic-fetch) to handle both client and server needs.

```js
import 'isomorphic-fetch';
import { create } from 'fans-rest';

const rest = create();

rest.get('http://my-endpoint').then(response => {
  // do stuff
});
```

## Configuration

The library is built so you only have to setup your client once and then re-use it anywhere.
A configuration object can be passed to setup custom headers or response handling.

### Headers

For instance, if your API requires you to send the same headers for every call, pass your headers on construction:

```js
import { create } from 'fans-rest';

const rest = create({
  headers: {
    'my-custom-header': 'hello-world',
  },
});
```

### Response handling

By default, your module will return an object read directly from the server response.
This behavior can be completely replaced if need be. Use `handleResponse` for that.

**Note:** this module uses `isomorphic-fetch` to handle communication, check the docs to know what methods are available.

For instance, in this example, we return the response as text, and we log a javascript version of it.

```js
import { create } from 'fans-rest';

const rest = create({
  handleResponse: (call) =>
    call.then(response => {
      const text = response.text();
      console.log(text === '' ? {} : JSON.parse(text));
      return text;
    }),
});
```

## ContentTypes

Some of the most common content types strings are available by importing `ContentTypes`;

```js
// Module: src/app/utils/rest

import { ContentTypes } from 'fans-rest';

const rest = create({
  headers: {
    'Content-Types': ContentTypes.html,
  }
});
```
