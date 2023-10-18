sdk
=================

SDK for Goodtok Server

[![goodtok](https://img.shields.io/badge/goodtok-sdk-brightgreen.svg)](https://goodtok.io)
[![Version](https://img.shields.io/npm/v/@goodtok/sdk.svg)](https://npmjs.org/package/@goodtok/sdk)
[![Downloads/week](https://img.shields.io/npm/dw/@goodtok/sdk.svg)](https://npmjs.org/package/@goodtok/sdk)
[![License](https://img.shields.io/npm/l/@goodtok/sdk.svg)](https://github.com/fonoster/goodtok/blob/main/package.json)

* [Installation](#installation)
* [APIs](#apis)

# Installation

```sh-session
$ npm install --save @goodtok/sdk
```

# APIs

* [`Customers`](#Customers)
* [`Users`](#Users)
* [`Workspaces`](#Workspaces)
* [`Tokens`](#Tokens)


<a name="Customers"></a>

## Customers ⇐ <code>AbstractBaseClient</code>
Use the Goodtok Customers capability to retrieve and manage customers.
Ensure the Goodtok API Server is running for the Customers API to function.

**Kind**: global class  
**Extends**: <code>AbstractBaseClient</code>  
**See**: module:sdk:Client  

* [Customers](#Customers) ⇐ <code>AbstractBaseClient</code>
    * [new Customers(client)](#new_Customers_new)
    * [.getCustomerById(id)](#Customers+getCustomerById) ⇒ <code>Promise.&lt;Customer&gt;</code>

<a name="new_Customers_new"></a>

### new Customers(client)
Constructs a new Customers API object.


| Param | Type | Description |
| --- | --- | --- |
| client | <code>Client</code> | Object containing the client configuration |

**Example**  
```js
const SDK = require("@goodtok/sdk");

async function getCustomer() {
  const client = new SDK.Client({ workspace: "myworkspace" });
  await client.login("goodtok", "mysecretpassword");

  const customers = new SDK.Customers(client);
  const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";
  const customer = await customers.getCustomerById(id);

  console.log(customer);
}

getCustomer().catch(console.error);
```
<a name="Customers+getCustomerById"></a>

### customers.getCustomerById(id) ⇒ <code>Promise.&lt;Customer&gt;</code>
Retrieves a customer by its ID.

**Kind**: instance method of [<code>Customers</code>](#Customers)  
**Returns**: <code>Promise.&lt;Customer&gt;</code> - A promise resolving to the customer  
**Throws**:

- Will throw an error if the customer is not found


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The customer ID |

**Example**  
```js
const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";
customers.getCustomerById(id)
  .then(console.log)
  .catch(console.error); // handle any errors
```

<a name="Tokens"></a>

## Tokens ⇐ <code>AbstractBaseClient</code>
Use the Goodtok Tokens capability to create and verify JWT tokens.
Ensure the Goodtok API Server is running for the Tokens API to function.

**Kind**: global class  
**Extends**: <code>AbstractBaseClient</code>  
**See**: module:sdk:Client  

* [Tokens](#Tokens) ⇐ <code>AbstractBaseClient</code>
    * [new Tokens(client)](#new_Tokens_new)
    * [.createAnonymousToken(request)](#Tokens+createAnonymousToken) ⇒ <code>Promise.&lt;CreateAnonymousTokenResponse&gt;</code>
    * [.createToken(request)](#Tokens+createToken) ⇒ <code>Promise.&lt;CreateTokenResponse&gt;</code>

<a name="new_Tokens_new"></a>

### new Tokens(client)
Constructs a new Tokens API object.


| Param | Type | Description |
| --- | --- | --- |
| client | <code>Client</code> | Object containing the client configuration |

**Example**  
```js
const SDK = require("@goodtok/sdk");

async function createAnonymousToken() {
  const client = new SDK.Client({ workspace: "myworkspace" });
  await client.login("goodtok", "mysecretpassword");

  const tokens = new SDK.Tokens(client);
  const request = {
    ref: "myref",
    aor: "anonymous@sip.goodtok.io",
    aorLink: "anonymous@sip.goodtok.io",
  };

  const connectionObject = await tokens.createAnonymousToken(request);
  console.log(connectionObject);
}

createAnonymousToken().catch(console.error);
```
<a name="Tokens+createAnonymousToken"></a>

### tokens.createAnonymousToken(request) ⇒ <code>Promise.&lt;CreateAnonymousTokenResponse&gt;</code>
Creates a new anonymous token with `allowedMethods=[REGISTER]` permissions.
Does not require authentication. The token will be issued only if the workspace has the `anonymous` feature enabled.

**Kind**: instance method of [<code>Tokens</code>](#Tokens)  
**Returns**: <code>Promise.&lt;CreateAnonymousTokenResponse&gt;</code> - A promise resolving to the connection object which contains the token  
**Throws**:

- Will throw an error if the workspace does not have the `anonymous` feature enabled


| Param | Type | Description |
| --- | --- | --- |
| request | <code>CreateAnonymousTokenInput</code> | A request with claims required to create a token |
| request.ref | <code>string</code> | A reference for the anonymous user |
| request.aor | <code>string</code> | The address of record (AOR) for the user |
| request.aorLink | <code>string</code> | The address of record (AOR) for the user |

**Example**  
```js
const request = {
  ref: "myref",
  aor: "anonymous@sip.goodtok.io",
  aorLink: "anonymous@sip.goodtok.io"
}

tokens.createAnonymousToken(request)
  .then(console.log)
  .catch(console.error) // handle any errors
```
<a name="Tokens+createToken"></a>

### tokens.createToken(request) ⇒ <code>Promise.&lt;CreateTokenResponse&gt;</code>
Creates a new token with the specified permissions.

**Kind**: instance method of [<code>Tokens</code>](#Tokens)  
**Returns**: <code>Promise.&lt;CreateTokenResponse&gt;</code> - A promise resolving to the connection object containing the token  
**Throws**:

- Will throw an error if the user is not logged in


| Param | Type | Description |
| --- | --- | --- |
| request | <code>CreateTokenInput</code> | A request with claims required to create the token |
| request.ref | <code>string</code> | A reference for the user |
| request.aor | <code>string</code> | The address of record (AOR) for the user |
| request.aorLink | <code>string</code> | The address of record (AOR) for the user |
| request.allowedMethods | <code>Array.&lt;string&gt;</code> | The list of methods the token is permitted to use (e.g. ["INVITE", "REGISTER"]) |

**Example**  
```js
const request = {
  ref: "myref",
  aor: "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d@sip.goodtok.io",
  aorLink: "anonymous@sip.goodtok.io",
  allowedMethods: ["INVITE"],
};

tokens.createToken(request)
  .then(console.log)
  .catch(console.error); // handle any errors
```

<a name="Users"></a>

## Users ⇐ <code>AbstractBaseClient</code>
Use the Goodtok Users capability to retrieve and manage users.
Ensure the Goodtok API Server is running for the Users API to function.

**Kind**: global class  
**Extends**: <code>AbstractBaseClient</code>  
**See**: module:sdk:Client  

* [Users](#Users) ⇐ <code>AbstractBaseClient</code>
    * [new Users(client)](#new_Users_new)
    * [.getCurrentUser()](#Users+getCurrentUser) ⇒ <code>Promise.&lt;User&gt;</code>
    * [.getUserById(id)](#Users+getUserById) ⇒ <code>Promise.&lt;User&gt;</code>
    * [.updateUser(request)](#Users+updateUser) ⇒ <code>Promise.&lt;UpdateUserResponse&gt;</code>

<a name="new_Users_new"></a>

### new Users(client)
Constructs a new Users API object.


| Param | Type | Description |
| --- | --- | --- |
| client | <code>Client</code> | Object containing the client configuration |

**Example**  
```js
const SDK = require("@goodtok/sdk");

async function getUser() {
  const client = new SDK.Client({ workspace: "myworkspace" });
  await client.login("goodtok", "mysecretpassword");

  const users = new SDK.Users(client);
  const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";
  const user = await users.getUserById(id);

  console.log(user);
}

getUser().catch(console.error);
```
<a name="Users+getCurrentUser"></a>

### users.getCurrentUser() ⇒ <code>Promise.&lt;User&gt;</code>
Retrieves the logged-in user.

**Kind**: instance method of [<code>Users</code>](#Users)  
**Returns**: <code>Promise.&lt;User&gt;</code> - A promise resolving to the user  
**Throws**:

- Will throw an error if user is not logged in or the JWT token has expired

**Example**  
```js
const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";

users.getCurrentUser(id)
  .then(console.log)
  .catch(console.error); // handle any errors
```
<a name="Users+getUserById"></a>

### users.getUserById(id) ⇒ <code>Promise.&lt;User&gt;</code>
Retrieves a user by its ID. The calling user must have an admin role to retrieve other users.

**Kind**: instance method of [<code>Users</code>](#Users)  
**Returns**: <code>Promise.&lt;User&gt;</code> - A promise resolving to the user  
**Throws**:

- Will throw an error if the user is not found
- If the user is not an admin and the user ID does not match the logged-in user's ID


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The user ID |

**Example**  
```js
const id = "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d";

users.getUserById(id)
  .then(console.log)
  .catch(console.error); // handle any errors
```
<a name="Users+updateUser"></a>

### users.updateUser(request) ⇒ <code>Promise.&lt;UpdateUserResponse&gt;</code>
Updates a user's details. The calling user must have an admin role to update other users.

**Kind**: instance method of [<code>Users</code>](#Users)  
**Returns**: <code>Promise.&lt;UpdateUserResponse&gt;</code> - A promise resolving to the updated user's details  
**Throws**:

- Will throw an error if the user is not found
- If the user is not an admin and the user ID does not match the logged-in user's ID


| Param | Type | Description |
| --- | --- | --- |
| request | <code>UpdateUserRequest</code> | A request object containing the user ID and update data |
| request.id | <code>string</code> | The user ID |
| request.name | <code>string</code> | Optional parameter to update the user's name |
| request.email | <code>string</code> | Optional parameter to update the user's email |
| request.password | <code>string</code> | Optional parameter to update the user's password |
| request.avatar | <code>string</code> | Optional parameter to update the user's avatar |

**Example**  
```js
const request = {
  id: "5f9d7a3a-2b2b-4b7a-9b9b-8e9d9d9d9d9d",
  name: "John Doe",
  email: "john@example.com",
  password: "mysecretpassword",
  avatar: "https://example.com/avatar.png"
};

users.updateUser(request)
  .then(console.log)
  .catch(console.error); // handle any errors
```

<a name="Workspaces"></a>

## Workspaces ⇐ <code>AbstractBaseClient</code>
Use the Goodtok Workspaces capability to retrieve and manage workspaces.
Ensure the Goodtok API Server is running for the Workspaces API to function.

**Kind**: global class  
**Extends**: <code>AbstractBaseClient</code>  
**See**: module:sdk:Client  

* [Workspaces](#Workspaces) ⇐ <code>AbstractBaseClient</code>
    * [new Workspaces(client)](#new_Workspaces_new)
    * [.getDefaultWorkspaceId()](#Workspaces+getDefaultWorkspaceId) ⇒ <code>string</code>
    * [.getDefaultWorkspace()](#Workspaces+getDefaultWorkspace) ⇒ <code>Promise.&lt;Workspace&gt;</code>
    * [.getDefaultWorkspaceQueue()](#Workspaces+getDefaultWorkspaceQueue) ⇒ <code>Promise.&lt;GetQueueResponse&gt;</code>
    * [.getDefaultWorkspaceMembers()](#Workspaces+getDefaultWorkspaceMembers) ⇒ <code>Promise.&lt;GetQueueResponse&gt;</code>
    * [.getWorkspaceById(id)](#Workspaces+getWorkspaceById) ⇒ <code>Promise.&lt;Workspace&gt;</code>
    * [.getMembersByWorkspaceId(id)](#Workspaces+getMembersByWorkspaceId) ⇒ <code>Promise.&lt;Workspace&gt;</code>
    * [.getQueueByWorkspaceId(id)](#Workspaces+getQueueByWorkspaceId) ⇒ <code>Promise.&lt;Workspace&gt;</code>
    * [.updateWorkspace(request)](#Workspaces+updateWorkspace) ⇒ <code>Promise.&lt;Workspace&gt;</code>
    * [.getWorkspaces()](#Workspaces+getWorkspaces) ⇒ <code>Promise.&lt;Array.&lt;Workspace&gt;&gt;</code>
    * [.watchQueue(id, callback)](#Workspaces+watchQueue)

<a name="new_Workspaces_new"></a>

### new Workspaces(client)
Constructs a new Workspaces API object.


| Param | Type | Description |
| --- | --- | --- |
| client | <code>Client</code> | Object containing the client configuration |

**Example**  
```js
const SDK = require("@goodtok/sdk");

async function getWorkspace() {
  const client = new SDK.Client({ workspace: "myworkspace" });
  await client.login("goodtok", "mysecretpassword");

  const workspaces = new SDK.Workspaces(client);
  const workspace = await workspaces.getDefaultWorkspace();

  console.log(workspace);
}

getWorkspace().catch(console.error);
```
<a name="Workspaces+getDefaultWorkspaceId"></a>

### workspaces.getDefaultWorkspaceId() ⇒ <code>string</code>
Retrieves the default workspace ID.

**Kind**: instance method of [<code>Workspaces</code>](#Workspaces)  
**Returns**: <code>string</code> - The default workspace ID  
**Example**  
```js
workspaces.getDefaultWorkspaceId();
```
<a name="Workspaces+getDefaultWorkspace"></a>

### workspaces.getDefaultWorkspace() ⇒ <code>Promise.&lt;Workspace&gt;</code>
Retrieves the default workspace.

**Kind**: instance method of [<code>Workspaces</code>](#Workspaces)  
**Returns**: <code>Promise.&lt;Workspace&gt;</code> - A promise resolving to the workspace  
**Example**  
```js
workspaces.getDefaultWorkspace()
  .then(console.log)
  .catch(console.error); // handle any errors
```
<a name="Workspaces+getDefaultWorkspaceQueue"></a>

### workspaces.getDefaultWorkspaceQueue() ⇒ <code>Promise.&lt;GetQueueResponse&gt;</code>
Retrieves the queue for the default workspace.

**Kind**: instance method of [<code>Workspaces</code>](#Workspaces)  
**Returns**: <code>Promise.&lt;GetQueueResponse&gt;</code> - A promise resolving to the queue  
**Example**  
```js
workspaces.getDefaultWorkspaceQueue()
  .then(console.log)
  .catch(console.error); // handle any errors
```
<a name="Workspaces+getDefaultWorkspaceMembers"></a>

### workspaces.getDefaultWorkspaceMembers() ⇒ <code>Promise.&lt;GetQueueResponse&gt;</code>
Retrieves the members for the default workspace.

**Kind**: instance method of [<code>Workspaces</code>](#Workspaces)  
**Returns**: <code>Promise.&lt;GetQueueResponse&gt;</code> - A promise resolving to the queue  
**Example**  
```js
workspaces.getDefaultWorkspaceMembers()
  .then(console.log)
  .catch(console.error); // handle any errors
```
<a name="Workspaces+getWorkspaceById"></a>

### workspaces.getWorkspaceById(id) ⇒ <code>Promise.&lt;Workspace&gt;</code>
Retrieves a workspace by its ID.

**Kind**: instance method of [<code>Workspaces</code>](#Workspaces)  
**Returns**: <code>Promise.&lt;Workspace&gt;</code> - A promise resolving to the workspace  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The workspace ID |

**Example**  
```js
const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";

workspaces.getWorkspaceById(id)
  .then(console.log)
  .catch(console.error); // handle any errors
```
<a name="Workspaces+getMembersByWorkspaceId"></a>

### workspaces.getMembersByWorkspaceId(id) ⇒ <code>Promise.&lt;Workspace&gt;</code>
Retrieves the members for a workspace by its ID.

**Kind**: instance method of [<code>Workspaces</code>](#Workspaces)  
**Returns**: <code>Promise.&lt;Workspace&gt;</code> - A promise resolving to an object containing an array of members  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The workspace ID |

**Example**  
```js
const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";

workspaces.getMembersByWorkspaceId(id)
  .then(console.log)
  .catch(console.error); // handle any errors
```
<a name="Workspaces+getQueueByWorkspaceId"></a>

### workspaces.getQueueByWorkspaceId(id) ⇒ <code>Promise.&lt;Workspace&gt;</code>
Retrieves the queue for a workspace by its ID.

**Kind**: instance method of [<code>Workspaces</code>](#Workspaces)  
**Returns**: <code>Promise.&lt;Workspace&gt;</code> - A promise resolving to an object containing an array of queue entries  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The workspace ID |

**Example**  
```js
const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";

workspaces.getQueueByWorkspaceId(id)
  .then(console.log)
  .catch(console.error); // handle any errors
```
<a name="Workspaces+updateWorkspace"></a>

### workspaces.updateWorkspace(request) ⇒ <code>Promise.&lt;Workspace&gt;</code>
Updates the details of a workspace.

**Kind**: instance method of [<code>Workspaces</code>](#Workspaces)  
**Returns**: <code>Promise.&lt;Workspace&gt;</code> - A promise resolving to the updated workspace's details  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>UpdateWorkspaceRequest</code> | The request object containing the workspace ID and update data |
| request.id | <code>string</code> | The workspace ID |
| request.name | <code>string</code> | The workspace name |
| request.timezone | <code>string</code> | The workspace timezone |
| request.hoursOfOperation | <code>object</code> | The workspace hours of operation |

**Example**  
```js
const request = {
  id: "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d",
  name: "My Workspace",
  timezone: "America/New_York",
  hoursOfOperation: {
    monday: [
      {
        start: "09:00",
        end: "17:00"
      }
    ],
    // ...
  }
};

workspaces.updateWorkspace(request)
  .then(console.log)
  .catch(console.error); // handle any errors
```
<a name="Workspaces+getWorkspaces"></a>

### workspaces.getWorkspaces() ⇒ <code>Promise.&lt;Array.&lt;Workspace&gt;&gt;</code>
Retrieves all workspaces for the authenticated user.

**Kind**: instance method of [<code>Workspaces</code>](#Workspaces)  
**Returns**: <code>Promise.&lt;Array.&lt;Workspace&gt;&gt;</code> - A promise resolving to an array of workspaces  
<a name="Workspaces+watchQueue"></a>

### workspaces.watchQueue(id, callback)
Registers a callback for real-time updates on queue entries within a workspace.

**Kind**: instance method of [<code>Workspaces</code>](#Workspaces)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID of the workspace |
| callback | <code>function</code> | The callback to be invoked when a queue entry updates |

**Example**  
```js
const id = "4f9d5a3a-362b-7b7a-34gb-4e94969d7d2d";

workspaces.watchQueue(id, (err, data) => {
  if (err) {
   console.error(err);
   return;
  }

  console.log(data);
});
```
