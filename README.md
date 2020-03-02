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

## Products

#### Create a product
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const product = new vosFacturesAPI.Products.Product({
    name: "MY_CAKE",
    code: "CAKEISLIE",
    priceGross: "200.00",
    currency: "EUR",
    tax: "20"
});
await product.save()
```

#### To update a product 
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const product = new vosFacturesAPI.Products.Product({
    name: "MY_CAKE",
    code: "CAKEISLIE",
    priceGross: "200.00",
    currency: "EUR",
    tax: "20"
});

// Then save it
await product.save();
product.name = "OUR_CAKE";
await product.update();
```

#### To delete a product 
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const product = new vosFacturesAPI.Products.Product({
    name: "MY_CAKE",
    code: "CAKEISLIE",
    priceGross: "200.00",
    currency: "EUR",
    tax: "20"
});

// Then save it
await product.save();
await product.remove();
```

#### To retrieve a product 
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const product = await vosFacturesAPI.Products.Product.findById(productId);
```

#### To retrieve many products
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const products = await vosFacturesAPI.Products.Product.findBy({currency: "EUR"}); // array of Product
```

#### To retrieve all products
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const products = await vosFacturesAPI.Products.Product.findAll(); // array of Product
```

## Invoices

#### Create a invoice
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const invoice = new vosFacturesAPI.Invoices.Invoice({
    clientId,
    kind: "estimate"
});
invoice.addProduct(product)
await invoice.save()
```

#### To update a invoice 
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

//....

await invoice.update();
```

#### To delete a invoice 
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

//....

await invoice.remove();
```

#### To retrieve a invoice 
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const invoice = await vosFacturesAPI.Invoices.Invoice.findById(invoiceId);
```

#### To retrieve many invoices
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const invoices = await vosFacturesAPI.Invoices.Invoice.findBy({clientId: clientId}); // array of Invoice
```

#### To retrieve all invoices
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const invoices = await vosFacturesAPI.Invoices.Invoice.findAll(); // array of Invoice
```

#### To create an invoice from an other invoice
```javascript
import * as vosFacturesAPI from "@rayand/vos_factures";

// vosFacturesAPI is initialized
const invoice = await vosFacturesAPI.Invoices.Invoice.findById(invoiceId);
const newInvoice = invoice.duplicateAs("vat")
await newInvoice.save();
```

### TESTS

You can run test thanks to `npm test` inside the package folder, before that you have to complete the `.env` file