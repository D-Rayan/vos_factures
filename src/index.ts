import * as axiosInstance from "./axiosInstance";
import * as Banking from "./banking";
import * as Categories from "./categories";
import * as Clients from "./clients";
import * as Departments from "./departments";
import * as Invoices from "./invoices";
import * as Products from "./products";
import * as WarehouseDocuments from "./warehouse_documents";

export const authenticate = async (ApiToken: string): Promise<boolean> => {
    if (!ApiToken) return false;
    const ids = ApiToken.split("/")
    if (!ids || ids.length !== 2) return false;
    axiosInstance.addInterceptor(`https://${ids[1]}.vosfactures.fr`, ApiToken);
    return true;
};

export { axiosInstance, Banking, Categories, Clients, Departments, Invoices, Products, WarehouseDocuments };
