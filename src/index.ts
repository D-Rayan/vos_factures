import * as axiosInstance from "./axiosInstance";
import * as Banking from "./banking";
import * as Categories from "./categories";
import * as Clients from "./clients";
import * as Departments from "./departments";
import * as Invoices from "./invoices";
import * as Products from "./products";
import * as WarehouseDocuments from "./warehouse_documents";

/**
 *
 * @param login
 * @param password
 * @returns {Promise<boolean>}
 */
export const authenticate = async (login: string, password: string): Promise<boolean> => {
    try {
        const response = await axiosInstance.instance.post("https://app.vosfactures.fr/login.json", {
            login,
            password,
        });
        if (response && response.data && response.data.url && response.data.api_token) {
            axiosInstance.addInterceptor(response.data.url, response.data.api_token);
            return true;
        }
    } catch (error) {}
    return false;
};

export { axiosInstance, Banking, Categories, Clients, Departments, Invoices, Products, WarehouseDocuments };
