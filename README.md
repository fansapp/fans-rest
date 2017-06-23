# fans-rest

An opinionated, isomorphic library built on top of `isomorphic-fetch`.
Made with JSON in mind, but configurable.

Any call

## Getting started

```
npm install --save fans-rest
```

## Usage

Use `create()` to create a new Rest client instance. Once done, reuse that instance anywhere you need.

```js
// File: src/app/utils/rest

import { create } from 'fans-rest';

export default create();


// File: src/app/business

import rest from '../utils/rest';

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
// Module: src/app/utils/rest

import { create } from 'fans-rest';

const rest = create({
  headers: {
    'my-custom-header': 'hello-world',
  },
});
```

### Response middleware

If you only need to hook up on the default behavior of the module, use `middleware`.
This function will expose the response as an object and we will have the opportunity to operate some alterations on it before it comes back.
In this example, we always add a key `failure` to the output based on the value of `success` in the server response.

```js
// Module: src/app/utils/rest

import { create } from 'fans-rest';

const rest = create({
  middleware: (response) => {
    ...response,
    failure: !response.success,
  },
});
```

### Response handling

By default, your module will return an object read directly from the server response.
This behavior can be completely replaced if need be. Use `handleResponse` for that.

**Note :** this module uses `isomorphic-fetch` to handle communication, check the docs to know what methods are available.

For instance, in this example, we return the response as text, and we log a javascript version of it.

```js
// Module: src/app/utils/rest

import { create } from 'fans-rest';

const rest = create({
  handleResponse: (call) =>
    call.then(response => {
      const text = response.text();
      console.log(text === '' ? {} : JSON.parse(text));
      return text;
    },
  },
});
```
