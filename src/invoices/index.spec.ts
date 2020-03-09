import { Invoice } from "./index";

require("dotenv").config();
import * as API from "../index";
import { Client } from "../clients";
import { Product } from "../products";

const invoices: Invoice[] = [];
describe("vosFacturesAPI - Invoices", function() {
    describe("[ERROR] - No Credentials", function() {
        it("FindAll - Should have no credentials", async function() {
            try {
                await API.Invoices.Invoice.findAll();
            } catch (e) {
                expect(e.toString()).toEqual("Error: No credentials");
            }
        });
        it("findById - Should have no credentials", async function() {
            try {
                await API.Invoices.Invoice.findById(0);
            } catch (e) {
                expect(e.toString()).toEqual("Error: No credentials");
            }
        });
        it("findBy - Should have no credentials", async function() {
            try {
                await API.Invoices.Invoice.findBy({});
            } catch (e) {
                expect(e.toString()).toEqual("Error: No credentials");
            }
        });
    });
    describe("API Connected", function() {
        let client: Client;
        const products: Product[] = [];
        beforeAll(async () => {
            API.axiosInstance.enableTest();
            await API.authenticate(process.env.VOSFACTURES_KEY || "");
            client = new API.Clients.Client({
                name: "TEST - John Smith - Invoices",
                country: "France",
                postCode: "34000",
                accountingId: "CDIVERS",
                city: "Montpellier",
                email: "john.smith.invoices@unknown.fr",
                street: "42 rue des Cerise",
                taxNo: "TVA00585858",
            });
            await client.save();
            const product = new API.Products.Product({
                code: "T00001",
                name: "TEST-00001",
                priceGross: "100",
                tax: "20",
            });
            await product.save();
            products.push(product);
        });
        afterAll(async () => {
            await client.remove();
            for (const product of products) {
                await product.remove();
            }
        });
        it("findById - Should not find the invoice", async function() {
            try {
                await API.Invoices.Invoice.findById(0);
            } catch (e) {
                expect(e.toString()).toEqual("Error: Request failed with status code 404");
            }
        });
        it("Create - Should create the invoice", async function() {
            try {
                const invoice = new API.Invoices.Invoice({
                    clientId: +client.id,
                    kind: "estimate",
                });
                invoice.addProduct(products[0]);
                await invoice.save();
                invoices.push(invoice);
            } catch (e) {
                console.error(e);
                expect(false).toBeTruthy();
            }
        });
        it("Client - Should retrieve the invoice", async function() {
            try {
                const _invoices = await client.getInvoices();
                expect(_invoices.length).toBe(1);
                expect(_invoices[0].id).toBe(invoices[0].id);
                expect((await _invoices[0].getClient()).id).toBe(client.id);
            } catch (e) {
                expect(false).toBeTruthy();
            }
        });
        it("DuplicateAs - Should create the invoice as duplicate", async function() {
            try {
                const invoice = await invoices[0].duplicateAs("vat");
                await invoice.save();
                invoices.push(invoice);
            } catch (e) {
                console.error(e.toString());
                expect(false).toBeTruthy();
            }
        });
        it("Delete - Should delete the invoices", async function() {
            try {
                for (const invoice of invoices) {
                    await invoice.remove();
                }
                invoices.splice(0, invoices.length);
            } catch (e) {
                expect(false).toBeTruthy();
            }
        });
    });
});
