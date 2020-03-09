require("dotenv").config();
import * as API from "./index";

describe("vosFacturesAPI", function() {
    it("Shouldn't not be connected to the API", function() {
        expect(API.axiosInstance.isConnected).toBe(false);
    });
    it("Shouldn't connect the API", async function() {
        expect(await API.authenticate("")).toBe(false);
        expect(API.axiosInstance.isConnected).toBe(false);
    });
    it("Should connect the API", async function() {
        expect(
            await API.authenticate(process.env.VOSFACTURES_KEY || ""),
        ).toBe(true);
        expect(API.axiosInstance.isConnected).toBe(true);
    });
});
