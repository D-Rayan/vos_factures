/* eslint-disable @typescript-eslint/camelcase */
import * as axiosInstance from "../axiosInstance";
import { camelizeObject } from "../helpers";

const axios = axiosInstance.instance;

export interface InterfaceProducts {
    id?: number | null;
    name?: string | null;
    description?: string | null;
    priceNet?: string | null;
    tax?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    automaticSales?: boolean | null;
    limited?: boolean | null;
    warehouseQuantity?: string | null;
    warehouseId?: number | null;
    availableFrom?: Date | null;
    availableTo?: Date | null;
    token?: string | null;
    quantity?: string | null;
    quantityUnit?: number | null;
    additionalInfo?: string | null;
    disabled?: boolean | null;
    priceGross?: string | null;
    priceTax?: string | null;
    deleted?: boolean | null;
    code?: string | null;
    currency?: string | "EUR" | null;
    ecommerce?: boolean | null;
    iid?: string | null;
    kind?: string | null;
    accountingId?: string | null;
    accountingId2?: string | null;
    accountingTaxCode?: string | null;
    accountingTaxCodeExp?: string | null;
    accountingActivityCode?: string | null;
    accountingSheetCode?: string | null;
}

export interface ParamsSearchProduct extends InterfaceProducts {
    page?: number;
    perPage?: number;
}

export class Product implements InterfaceProducts {
    static async findById(invoiceId: number): Promise<Product> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.get(`/products/${invoiceId}.json`);
        return new Product(camelizeObject(result.data));
    }

    static async findBy(params: ParamsSearchProduct): Promise<Product[]> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        let query = "";

        if (params.page) query = `${query}page=${params.page}&`;
        if (params.perPage) query = `${query}per_page=${params.perPage}&`;
        const result = await axios.get(`/products.json?${query}`);
        const results: Product[] = [];
        for (const dataProduct of result.data) {
            results.push(new Product(camelizeObject(dataProduct)));
        }
        return results;
    }

    static async findAll(params?: ParamsSearchProduct): Promise<Product[]> {
        const results: Product[] = [];
        let page = 1;
        let productToLoad;
        do {
            productToLoad = false;
            const tmp = await this.findBy({
                ...(params || {}),
                page,
                perPage: 100,
            });
            if (tmp.length > 0) {
                results.push(...tmp);
                productToLoad = true;
            }
            page++;
        } while (productToLoad);
        return results;
    }

    async save(): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.post("/products.json", {
            product: this.toParams(),
        });
        this.setValue(camelizeObject(result.data));
    }

    async update(): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.put(`/products/${this.id}.json`, {
            product: this.toParams(),
        });
        this.setValue(camelizeObject(result.data));
    }

    async remove(productId?: number): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        if (!productId && !this.id) throw new Error("Method invalid argument");
        await axios.delete(`/products/${productId || this.id}.json`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toParams(): Record<string, any> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: Record<string, any> = {};
        if (this.id) params["id"] = this.id;
        if (this.name) params["name"] = this.name;
        if (this.description) params["description"] = this.description;
        if (this.priceNet) params["price_net"] = this.priceNet;
        if (this.tax) params["tax"] = this.tax;
        if (this.createdAt) params["created_at"] = this.createdAt;
        if (this.updatedAt) params["updated_at"] = this.updatedAt;
        if (this.automaticSales) params["automatic_sales"] = this.automaticSales;
        if (this.limited) params["limited"] = this.limited;
        if (this.warehouseQuantity) params["warehouse_quantity"] = this.warehouseQuantity;
        if (this.warehouseId) params["warehouse_id"] = this.warehouseId;
        if (this.availableFrom) params["available_from"] = this.availableFrom;
        if (this.availableTo) params["available_to"] = this.availableTo;
        if (this.token) params["token"] = this.token;
        if (this.quantity) params["quantity"] = this.quantity;
        if (this.quantityUnit) params["quantity_unit"] = this.quantityUnit;
        if (this.additionalInfo) params["additional_info"] = this.additionalInfo;
        if (this.disabled) params["disabled"] = this.disabled;
        if (this.priceGross) params["price_gross"] = this.priceGross;
        if (this.priceTax) params["price_tax"] = this.priceTax;
        if (this.deleted) params["deleted"] = this.deleted;
        if (this.code) params["code"] = this.code;
        if (this.currency) params["currency"] = this.currency;
        if (this.ecommerce) params["ecommerce"] = this.ecommerce;
        if (this.iid) params["iid"] = this.iid;
        if (this.kind) params["kind"] = this.kind;
        if (this.accountingId) params["accounting_id"] = this.accountingId;
        if (this.accountingId2) params["accounting_id2"] = this.accountingId2;
        if (this.accountingTaxCode) params["accounting_tax_code"] = this.accountingTaxCode;
        if (this.accountingTaxCodeExp) params["accounting_tax_code_exp"] = this.accountingTaxCodeExp;
        if (this.accountingActivityCode) params["accounting_activity_code"] = this.accountingActivityCode;
        if (this.accountingSheetCode) params["accounting_sheet_code"] = this.accountingSheetCode;

        return params;
    }

    constructor(data?: InterfaceProducts) {
        this.setValue(data || {});
    }

    setValue(data: InterfaceProducts): void {
        this.id = data.id || null;
        this.name = data.name || null;
        this.description = data.description || null;
        this.priceNet = data.priceNet || null;
        this.tax = data.tax || null;
        this.createdAt = data.createdAt || null;
        this.updatedAt = data.updatedAt || null;
        this.automaticSales = data.automaticSales || null;
        this.limited = data.limited || null;
        this.warehouseQuantity = data.warehouseQuantity || null;
        this.warehouseId = data.warehouseId || null;
        this.availableFrom = data.availableFrom || null;
        this.availableTo = data.availableTo || null;
        this.token = data.token || null;
        this.quantity = data.quantity || null;
        this.quantityUnit = data.quantityUnit || null;
        this.additionalInfo = data.additionalInfo || null;
        this.disabled = data.disabled || null;
        this.priceGross = data.priceGross || null;
        this.priceTax = data.priceTax || null;
        this.deleted = data.deleted || null;
        this.code = data.code || null;
        this.currency = data.currency || null;
        this.ecommerce = data.ecommerce || null;
        this.iid = data.iid || null;
        this.kind = data.kind || null;
        this.accountingId = data.accountingId || null;
        this.accountingId2 = data.accountingId2 || null;
        this.accountingTaxCode = data.accountingTaxCode || null;
        this.accountingTaxCodeExp = data.accountingTaxCodeExp || null;
        this.accountingActivityCode = data.accountingActivityCode || null;
        this.accountingSheetCode = data.accountingSheetCode || null;
    }

    private _accountingActivityCode: string | null = null;
    private _accountingId: string | null = null;
    private _accountingId2: string | null = null;
    private _accountingSheetCode: string | null = null;
    private _accountingTaxCode: string | null = null;
    private _accountingTaxCodeExp: string | null = null;
    private _additionalInfo: string | null = null;
    private _automaticSales: boolean | null = null;
    private _availableFrom: Date | null = null;
    private _availableTo: Date | null = null;
    private _code: string | null = null;
    private _createdAt: Date | null = null;
    private _currency: string | "EUR" | null = null;
    private _deleted: boolean | null = null;
    private _description: string | null = null;
    private _disabled: boolean | null = null;
    private _ecommerce: boolean | null = null;
    private _id: number | null = null;
    private _iid: string | null = null;
    private _kind: string | null = null;
    private _limited: boolean | null = null;
    private _name: string | null = null;
    private _priceGross: string | null = null;
    private _priceNet: string | null = null;
    private _priceTax: string | null = null;
    private _quantity: string | null = null;
    private _quantityUnit: number | null = null;
    private _tax: string | null = null;
    private _token: string | null = null;
    private _updatedAt: Date | null = null;
    private _warehouseId: number | null = null;
    private _warehouseQuantity: string | null = null;

    get accountingActivityCode(): string | null {
        return this._accountingActivityCode;
    }

    set accountingActivityCode(value: string | null) {
        this._accountingActivityCode = value;
    }

    get accountingId(): string | null {
        return this._accountingId;
    }

    set accountingId(value: string | null) {
        this._accountingId = value;
    }

    get accountingId2(): string | null {
        return this._accountingId2;
    }

    set accountingId2(value: string | null) {
        this._accountingId2 = value;
    }

    get accountingSheetCode(): string | null {
        return this._accountingSheetCode;
    }

    set accountingSheetCode(value: string | null) {
        this._accountingSheetCode = value;
    }

    get accountingTaxCode(): string | null {
        return this._accountingTaxCode;
    }

    set accountingTaxCode(value: string | null) {
        this._accountingTaxCode = value;
    }

    get accountingTaxCodeExp(): string | null {
        return this._accountingTaxCodeExp;
    }

    set accountingTaxCodeExp(value: string | null) {
        this._accountingTaxCodeExp = value;
    }

    get additionalInfo(): string | null {
        return this._additionalInfo;
    }

    set additionalInfo(value: string | null) {
        this._additionalInfo = value;
    }

    get automaticSales(): boolean | null {
        return this._automaticSales;
    }

    set automaticSales(value: boolean | null) {
        this._automaticSales = value;
    }

    get availableFrom(): Date | null {
        return this._availableFrom;
    }

    set availableFrom(value: Date | null) {
        this._availableFrom = value;
    }

    get availableTo(): Date | null {
        return this._availableTo;
    }

    set availableTo(value: Date | null) {
        this._availableTo = value;
    }

    get code(): string | null {
        return this._code;
    }

    set code(value: string | null) {
        this._code = value;
    }

    get createdAt(): Date | null {
        return this._createdAt;
    }

    set createdAt(value: Date | null) {
        this._createdAt = value;
    }

    get currency(): string | "EUR" | null {
        return this._currency;
    }

    set currency(value: string | "EUR" | null) {
        this._currency = value;
    }

    get deleted(): boolean | null {
        return this._deleted;
    }

    set deleted(value: boolean | null) {
        this._deleted = value;
    }

    get description(): string | null {
        return this._description;
    }

    set description(value: string | null) {
        this._description = value;
    }

    get disabled(): boolean | null {
        return this._disabled;
    }

    set disabled(value: boolean | null) {
        this._disabled = value;
    }

    get ecommerce(): boolean | null {
        return this._ecommerce;
    }

    set ecommerce(value: boolean | null) {
        this._ecommerce = value;
    }

    get id(): number | null {
        return this._id;
    }

    set id(value: number | null) {
        this._id = value;
    }

    get iid(): string | null {
        return this._iid;
    }

    set iid(value: string | null) {
        this._iid = value;
    }

    get kind(): string | null {
        return this._kind;
    }

    set kind(value: string | null) {
        this._kind = value;
    }

    get limited(): boolean | null {
        return this._limited;
    }

    set limited(value: boolean | null) {
        this._limited = value;
    }

    get name(): string | null {
        return this._name;
    }

    set name(value: string | null) {
        this._name = value;
    }

    get priceGross(): string | null {
        return this._priceGross;
    }

    set priceGross(value: string | null) {
        this._priceGross = value;
    }

    get priceNet(): string | null {
        return this._priceNet;
    }

    set priceNet(value: string | null) {
        this._priceNet = value;
    }

    get priceTax(): string | null {
        return this._priceTax;
    }

    set priceTax(value: string | null) {
        this._priceTax = value;
    }

    get quantity(): string | null {
        return this._quantity;
    }

    set quantity(value: string | null) {
        this._quantity = value;
    }

    get quantityUnit(): number | null {
        return this._quantityUnit;
    }

    set quantityUnit(value: number | null) {
        this._quantityUnit = value;
    }

    get tax(): string | null {
        return this._tax;
    }

    set tax(value: string | null) {
        this._tax = value;
    }

    get token(): string | null {
        return this._token;
    }

    set token(value: string | null) {
        this._token = value;
    }

    get updatedAt(): Date | null {
        return this._updatedAt;
    }

    set updatedAt(value: Date | null) {
        this._updatedAt = value;
    }

    get warehouseId(): number | null {
        return this._warehouseId;
    }

    set warehouseId(value: number | null) {
        this._warehouseId = value;
    }

    get warehouseQuantity(): string | null {
        return this._warehouseQuantity;
    }

    set warehouseQuantity(value: string | null) {
        this._warehouseQuantity = value;
    }
}
