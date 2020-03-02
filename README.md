# VOS FACTURES

Package to help with the API from "vosFactures"

## Authentication

To start you'll need to give to the API your credentials from vosFactures.

```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

if (await vosFacturesAPI.authenticate(LOGIN, PASSWORD)) {
    // The package is initialized
} else {
    // We've got an error
}
```

## Client

#### To create a client 
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const client = new vosFacturesAPI.Clients.Client();
client.name = "John Smith";
// Equal to
const client = new vosFacturesAPI.Clients.Client({ name: "John Smith" });

// Then save it
await client.save();
console.log(client.id);
```

#### To update a client 
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const client = new vosFacturesAPI.Clients.Client({ name: "John Smith" });

// Then save it
await client.save();
client.name = "John Doe";
await client.update();
```

#### To delete a client 
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const client = new vosFacturesAPI.Clients.Client({ name: "John Smith" });

// Then save it
await client.save();
client.name = "John Doe";
await client.remove();
```

#### To retrieve a client 
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const client = await vosFacturesAPI.Clients.Client.findById(clientId);
```

#### To retrieve many clients
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const clients = await vosFacturesAPI.Clients.Client.findBy({name: "John"}); // array of Client
```

#### To retrieve all clients
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const clients = await vosFacturesAPI.Clients.Client.findAll(); // array of Client
```

#### To retrieve invoices from a client
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const client = await vosFacturesAPI.Clients.Client.findById(clientId);
await client.getInvoices();
```

