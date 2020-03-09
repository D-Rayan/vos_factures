import { Client } from "./index";

require("dotenv").config();
import * as API from "../index";

const clients: Client[] = [];

describe("vosFacturesAPI - Clients", function() {
    describe("[ERROR] - No Credentials", function() {
        it("FindAll - Should have no credentials", async function() {
            try {
                await API.Clients.Client.findAll();
            } catch (e) {
                expect(e.toString()).toEqual("Error: No credentials");
            }
        });
        it("findById - Should have no credentials", async function() {
            try {
                await API.Clients.Client.findById(0);
            } catch (e) {
                expect(e.toString()).toEqual("Error: No credentials");
            }
        });
        it("findBy - Should have no credentials", async function() {
            try {
                await API.Clients.Client.findBy({});
            } catch (e) {
                expect(e.toString()).toEqual("Error: No credentials");
            }
        });
    });
    describe("API Connected", function() {
        beforeAll(async () => {
            API.axiosInstance.enableTest();
            await API.authenticate(process.env.VOSFACTURES_KEY || "");
        });
        it("findById - Should not find the client", async function() {
            try {
                await API.Clients.Client.findById(0);
            } catch (e) {
                expect(e.toString()).toEqual("Error: Request failed with status code 404");
            }
        });
        it("Create - Should create the client", async function() {
            try {
                const client = new API.Clients.Client({
                    name: "TEST - John Smith",
                    country: "France",
                    postCode: "34000",
                    accountingId: "CDIVERS",
                    city: "Montpellier",
                    email: "john.smith@unknown.fr",
                    street: "42 rue des Cerise",
                    taxNo: "TVA00585858",
                });
                await client.save();
                expect(client.id).toBeTruthy();
                clients.push(client);
            } catch (e) {
                expect(false).toBeTruthy();
            }
        });
        it("Retrieve - Should retrieve the client", async function() {
            try {
                await API.Clients.Client.findById(+clients[0].id);
            } catch (e) {
                expect(false).toBeTruthy();
            }
        });
        it("Update - Should update the client", async function() {
            try {
                clients[0].name = "TEST - John Updated";
                await clients[0].update();
            } catch (e) {
                console.error(e);
                expect(false).toBeTruthy();
            }
        });
        it("Retrieve - Should retrieve the client and it should be updated", async function() {
            try {
                const _clients = await API.Clients.Client.findBy({ id: clients[0].id, name: "TEST - John Updated" });
                expect(_clients.length).toBe(1);
            } catch (e) {
                expect(false).toBeTruthy();
            }
        });
        it("Retrieve - Should get his invoices", async function() {
            try {
                const invoices = await clients[0].getInvoices();
                expect(invoices.length).toBe(0);
            } catch (e) {
                console.error(e);
                expect(false).toBeTruthy();
            }
        });
        it("Delete - Should delete the client", async function() {
            try {
                await clients[0].remove();
                clients.pop();
            } catch (e) {
                expect(false).toBeTruthy();
            }
        });
    });
});
