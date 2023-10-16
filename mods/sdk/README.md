sdk
=================

SDK for Goodtok Server

[![goodtok](https://img.shields.io/badge/goodtok-sdk-brightgreen.svg)](https://goodtok.io)
[![Version](https://img.shields.io/npm/v/@goodtok/sdk.svg)](https://npmjs.org/package/@goodtok/sdk)
[![Downloads/week](https://img.shields.io/npm/dw/@goodtok/sdk.svg)](https://npmjs.org/package/@goodtok/sdk)
[![License](https://img.shields.io/npm/l/@goodtok/sdk.svg)](https://github.com/fonoster/goodtok/blob/main/package.json)

<!-- toc -->
* [Installation](#installation)
* [APIs](#apis)
<!-- tocstop -->
# Installation
<!-- installation -->
```sh-session
$ npm install --save @goodtok/sdk
```
<!-- usagestop -->
# APIs
<!-- apis -->
* [`Customers`](#Customers)
* [`Users`](#Users)
* [`Workspaces`](#Workspaces)
* [`Tokens`](#Tokens)


<a name="module.exports"></a>

## module.exports ⇐ <code>Customers</code>
Use Goodtok Customers, a capability of Goodtok, to retrieve a list of Customers
The Customers API requires of a running Goodtok API Server.

**Kind**: static class of <code>module</code>  
**Extends**: <code>Customers</code>  
**See**: module:sdk:Client  
<a name="new_module.exports_new"></a>

### new module.exports(client)
Constructs a new Customers API object.


| Param | Type | Description |
| --- | --- | --- |
| client | <code>Client</code> | Options to indicate the objects endpoint |

**Example**  
```js
const SDK = require("@goodtok/sdk")
const customers = new SDK.Customers()

const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d"

acl.getCustomerById(id)
  .then(console.log)
  .catch(console.error)   // an error occurred
```

