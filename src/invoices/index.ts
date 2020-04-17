/* eslint-disable @typescript-eslint/camelcase */
import * as axiosInstance from "../axiosInstance";
import moment from "moment";
import {camelizeObject, unCamelizeObject} from "../helpers";
import {Product} from "../products";
import {Client} from "../clients";

const axios = axiosInstance.instance;

declare type INVOICE_DATE = Date | string;
const convertStringToDate = (value: Date | null | undefined | string): Date | null | undefined => {
    let valueConverted: Date | null | undefined;
    if (typeof value === "string") {
        const tmp = value.split("-");
        valueConverted = moment()
            .set({year: +tmp[0], month: +tmp[1] - 1, date: +tmp[2]})
            .toDate();
    } else {
        valueConverted = value;
    }

    return valueConverted;
};
const convertDateToString = (value: Date | null | undefined | string, format: string = "YYYY-MM-DD"): string | null | undefined => {
    let valueConverted: string | null | undefined;
    if (value instanceof Date) {
        valueConverted = moment(value).format(format);
    } else {
        valueConverted = value;
    }

    return valueConverted;
};
export const PAYMENT_TYPE = {
    VIREMENT_BANCAIRE: "transfer",
    CARTE_BANCAIRE: "card",
    ESPECE: "cash",
    CHEQUE: "cheque",
    PAYPAL: "paypal",
    NE_PAS_AFFICHER: "off",
};

export const STATUS = {
    CREATE: "issued",
    SENT: "sent",
    PAID: "paid",
    PAID_PARTIALLY: "partial",
    REFUSED: "rejected",
    ACCEPTED: "accepted",
};

export interface InterfaceInvoice {
    id?: number | null;
    userId?: number | null;
    app?: null;
    number?: string | null;
    place?: null;
    sellDate?: INVOICE_DATE | null;
    paymentType?: null | "transfer" | "card" | "cash" | "cheque" | "paypal" | "off" | string;
    priceNet?: string | null;
    priceGross?: string | null;
    currency?: string | null;
    status?: "issued" | "sent" | "paid" | "partial" | "rejected" | "accepted" | null;
    description?: string | null;
    sellerName?: string | null;
    sellerTaxNo?: string | null;
    sellerStreet?: string | null;
    sellerPostCode?: string | null;
    sellerCity?: string | null;
    sellerCountry?: string | null;
    sellerEmail?: string | null;
    sellerPhone?: string | null;
    sellerFax?: string | null;
    sellerWww?: string | null;
    sellerPerson?: string | null;
    sellerBank?: string | null;
    sellerBankAccount?: string | null;
    buyerName?: string | null;
    buyerTaxNo?: string | null;
    buyerPostCode?: string | null;
    buyerCity?: string | null;
    buyerStreet?: string | null;
    buyerFirstName?: string | null;
    buyerCountry?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    token?: string | null;
    buyerEmail?: string | null;
    buyerWww?: string | null;
    buyerFax?: string | null;
    buyerPhone?: string | null;
    kind?:
        | "vat"
        | "estimate"
        | "proforma"
        | "correction"
        | "client_order"
        | "receipt"
        | "advance"
        | "final"
        | "invoice_other"
        | "kp"
        | "kw"
        | null;
    pattern?: string | null;
    patternNr?: number | null;
    patternNrM?: null;
    patternNrD?: null;
    clientId?: number | null;
    paymentTo?: string | null;
    paid?: string | null;
    sellerBankAccountId?: null;
    lang?:
        | "fr"
        | "en"
        | "de"
        | "he"
        | "es"
        | "it"
        | "nl"
        | "cz"
        | "hr"
        | "pl"
        | "hu"
        | "sk"
        | "sl"
        | "et"
        | "ru"
        | "cn"
        | "ar"
        | "tr"
        | "fa"
        | string
        | null;
    issueDate?: INVOICE_DATE | null;
    priceTax?: string | null;
    departmentId?: number | null;
    correction?: null;
    buyerNote?: null;
    additionalInfoDesc?: null;
    additionalInfo?: boolean | null;
    productCache?: string | null;
    buyerLastName?: null;
    fromInvoiceId?: number | null;
    oid?: null;
    discount?: string | null;
    showDiscount?: boolean | null;
    sentTime?: Date | null;
    printTime?: Date | null;
    recurringId?: null;
    tax2Visible?: null;
    warehouseId?: null;
    paidDate?: INVOICE_DATE | null;
    productId?: number | null;
    issueYear?: number | null;
    internalNote?: null;
    invoiceId?: number | null;
    invoiceTemplateId?: number | null;
    descriptionLong?: null;
    buyerTaxNoKind?: null;
    sellerTaxNoKind?: "SIREN" | "Numéro TVA" | "CIF" | null;
    descriptionFooter?: null;
    sellDateKind?: INVOICE_DATE | null;
    paymentToKind?: string | null;
    exchangeCurrency?: null;
    discountKind?: "amount" | "percent_unit" | "percent_total" | null;
    income?: boolean | null;
    fromApi?: boolean | null;
    categoryId?: null;
    warehouseDocumentId?: null;
    exchangeKind?: string | null;
    exchangeRate?: string | null;
    useDeliveryAddress?: boolean | null;
    deliveryAddress?: null;
    accountingKind?: null;
    buyerPerson?: string | null;
    buyerBankAccount?: null;
    buyerBank?: null;
    buyerMassPaymentCode?: null;
    exchangeNote?: string | null;
    clientCompany?: boolean | null;
    buyerCompany?: boolean | null;
    showAttachments?: boolean | null;
    exchangeCurrencyRate?: null;
    hasAttachments?: boolean | null;
    exchangeDate?: INVOICE_DATE | null;
    attachmentsCount?: number | null;
    deliveryDate?: INVOICE_DATE | null;
    fiscalStatus?: null;
    useMoss?: boolean | null;
    transactionDate?: INVOICE_DATE | null;
    emailStatus?: "sent" | string | null;
    excludeFromStockLevel?: boolean | null;
    excludeFromAccounting?: boolean | null;
    exchangeRateDen?: string | null;
    exchangeCurrencyRateDen?: string | null;
    accountingScheme?: null;
    exchangeDifference?: string | null;
    notCost?: boolean | null;
    reverseCharge?: boolean | null;
    issuer?: null;
    useIssuer?: boolean | null;
    cancelled?: boolean | null;
    recipientId?: null;
    recipientName?: null;
    test?: boolean | null;
    discountNet?: null | string;
    approvalStatus?: null | string;
    accountingVatTaxDate?: INVOICE_DATE | null;
    accountingIncomeTaxDate?: INVOICE_DATE | null;
    accountingOtherTaxDate?: INVOICE_DATE | null;
    accountingStatus?: "exported" | string | null;
    normalizedNumber?: null;
    naTaxKind?: null;
    issuedToReceipt?: boolean | null;
    title?: null | string;
    salesCode?: string | null;
    paymentUrl?: string | null;
    viewUrl?: string | null;
    adjustInvoicePrice?: string | null;
    checkFiscalPrint?: boolean | null;
    additionalInvoiceField?: null;
    productsMargin?: string | null;
    recipientStreet?: null | string;
    recipientPostCode?: null | string;
    recipientCity?: null | string;
    recipientCountry?: null | string;
    recipientEmail?: null | string;
    recipientPhone?: null | string;
    recipientNote?: null | string;
    buyerMobilePhone?: null | string;
    positions?: {
        id?: number;
        invoiceId?: number;
        name?: string;
        description?: null | string;
        priceNet?: string;
        quantity?: string;
        totalPriceGross?: string;
        totalPriceNet?: string;
        accountId?: number;
        createdAt?: Date;
        updatedAt?: Date;
        additionalInfo?: null | string;
        quantityUnit?: null | string;
        tax?: string;
        priceGross?: string;
        priceTax?: string;
        totalPriceTax?: string;
        kind?: null | string;
        invoicePositionId?: null | string;
        productId?: number;
        deleted?: boolean;
        discount?: null | string;
        discountPercent?: null | string;
        tax2?: string;
        exchangeRate?: string;
        accountingTaxKind?: null | string;
        code?: null | string;
        additionalFields?: {};
    }[];
}

export interface ParamsSearchInvoice {
    page?: number | null;
    perPage?: number | null;
    period?: "this_month" | "more" | string | null;
    dateFrom?: INVOICE_DATE | null;
    dateTo?: INVOICE_DATE | null;
    searchDateType?: "issue_date" | string | null;
    clientId?: number | null;
    number?: number | null;
    invoiceId?: number | null;
    fromInvoiceId?: number | null;
    kind?:
        | "vat"
        | "estimate"
        | "proforma"
        | "correction"
        | "client_order"
        | "receipt"
        | "advance"
        | "final"
        | "invoice_other"
        | "kp"
        | "kw"
        | null;
}

export class Invoice implements InterfaceInvoice {
    private _id: InterfaceInvoice["id"];
    private _userId: InterfaceInvoice["userId"];
    private _app: InterfaceInvoice["app"];
    private _number: InterfaceInvoice["number"];
    private _place: InterfaceInvoice["place"];
    private _sellDate: InterfaceInvoice["sellDate"];
    private _paymentType: InterfaceInvoice["paymentType"];
    private _priceNet: InterfaceInvoice["priceNet"];
    private _priceGross: InterfaceInvoice["priceGross"];
    private _currency: InterfaceInvoice["currency"];
    private _status: InterfaceInvoice["status"];
    private _description: InterfaceInvoice["description"];
    private _sellerName: InterfaceInvoice["sellerName"];
    private _sellerTaxNo: InterfaceInvoice["sellerTaxNo"];
    private _sellerStreet: InterfaceInvoice["sellerStreet"];
    private _sellerPostCode: InterfaceInvoice["sellerPostCode"];
    private _sellerCity: InterfaceInvoice["sellerCity"];
    private _sellerCountry: InterfaceInvoice["sellerCountry"];
    private _sellerEmail: InterfaceInvoice["sellerEmail"];
    private _sellerPhone: InterfaceInvoice["sellerPhone"];
    private _sellerFax: InterfaceInvoice["sellerFax"];
    private _sellerWww: InterfaceInvoice["sellerWww"];
    private _sellerPerson: InterfaceInvoice["sellerPerson"];
    private _sellerBank: InterfaceInvoice["sellerBank"];
    private _sellerBankAccount: InterfaceInvoice["sellerBankAccount"];
    private _buyerName: InterfaceInvoice["buyerName"];
    private _buyerTaxNo: InterfaceInvoice["buyerTaxNo"];
    private _buyerPostCode: InterfaceInvoice["buyerPostCode"];
    private _buyerCity: InterfaceInvoice["buyerCity"];
    private _buyerStreet: InterfaceInvoice["buyerStreet"];
    private _buyerFirstName: InterfaceInvoice["buyerFirstName"];
    private _buyerCountry: InterfaceInvoice["buyerCountry"];
    private _createdAt: InterfaceInvoice["createdAt"];
    private _updatedAt: InterfaceInvoice["updatedAt"];
    private _token: InterfaceInvoice["token"];
    private _buyerEmail: InterfaceInvoice["buyerEmail"];
    private _buyerWww: InterfaceInvoice["buyerWww"];
    private _buyerFax: InterfaceInvoice["buyerFax"];
    private _buyerPhone: InterfaceInvoice["buyerPhone"];
    private _kind: InterfaceInvoice["kind"];
    private _pattern: InterfaceInvoice["pattern"];
    private _patternNr: InterfaceInvoice["patternNr"];
    private _patternNrM: InterfaceInvoice["patternNrM"];
    private _patternNrD: InterfaceInvoice["patternNrD"];
    private _clientId: InterfaceInvoice["clientId"];
    private _paymentTo: InterfaceInvoice["paymentTo"];
    private _paid: InterfaceInvoice["paid"];
    private _sellerBankAccountId: InterfaceInvoice["sellerBankAccountId"];
    private _lang: InterfaceInvoice["lang"];
    private _issueDate: InterfaceInvoice["issueDate"];
    private _priceTax: InterfaceInvoice["priceTax"];
    private _departmentId: InterfaceInvoice["departmentId"];
    private _correction: InterfaceInvoice["correction"];
    private _buyerNote: InterfaceInvoice["buyerNote"];
    private _additionalInfoDesc: InterfaceInvoice["additionalInfoDesc"];
    private _additionalInfo: InterfaceInvoice["additionalInfo"];
    private _productCache: InterfaceInvoice["productCache"];
    private _buyerLastName: InterfaceInvoice["buyerLastName"];
    private _fromInvoiceId: InterfaceInvoice["fromInvoiceId"];
    private _oid: InterfaceInvoice["oid"];
    private _discount: InterfaceInvoice["discount"];
    private _showDiscount: InterfaceInvoice["showDiscount"];
    private _sentTime: InterfaceInvoice["sentTime"];
    private _printTime: InterfaceInvoice["printTime"];
    private _recurringId: InterfaceInvoice["recurringId"];
    private _tax2Visible: InterfaceInvoice["tax2Visible"];
    private _warehouseId: InterfaceInvoice["warehouseId"];
    private _paidDate: InterfaceInvoice["paidDate"];
    private _productId: InterfaceInvoice["productId"];
    private _issueYear: InterfaceInvoice["issueYear"];
    private _internalNote: InterfaceInvoice["internalNote"];
    private _invoiceId: InterfaceInvoice["invoiceId"];
    private _invoiceTemplateId: InterfaceInvoice["invoiceTemplateId"];
    private _descriptionLong: InterfaceInvoice["descriptionLong"];
    private _buyerTaxNoKind: InterfaceInvoice["buyerTaxNoKind"];
    private _sellerTaxNoKind: InterfaceInvoice["sellerTaxNoKind"];
    private _descriptionFooter: InterfaceInvoice["descriptionFooter"];
    private _sellDateKind: InterfaceInvoice["sellDateKind"];
    private _paymentToKind: InterfaceInvoice["paymentToKind"];
    private _exchangeCurrency: InterfaceInvoice["exchangeCurrency"];
    private _discountKind: InterfaceInvoice["discountKind"];
    private _income: InterfaceInvoice["income"];
    private _fromApi: InterfaceInvoice["fromApi"];
    private _categoryId: InterfaceInvoice["categoryId"];
    private _warehouseDocumentId: InterfaceInvoice["warehouseDocumentId"];
    private _exchangeKind: InterfaceInvoice["exchangeKind"];
    private _exchangeRate: InterfaceInvoice["exchangeRate"];
    private _useDeliveryAddress: InterfaceInvoice["useDeliveryAddress"];
    private _deliveryAddress: InterfaceInvoice["deliveryAddress"];
    private _accountingKind: InterfaceInvoice["accountingKind"];
    private _buyerPerson: InterfaceInvoice["buyerPerson"];
    private _buyerBankAccount: InterfaceInvoice["buyerBankAccount"];
    private _buyerBank: InterfaceInvoice["buyerBank"];
    private _buyerMassPaymentCode: InterfaceInvoice["buyerMassPaymentCode"];
    private _exchangeNote: InterfaceInvoice["exchangeNote"];
    private _clientCompany: InterfaceInvoice["clientCompany"];
    private _buyerCompany: InterfaceInvoice["buyerCompany"];
    private _showAttachments: InterfaceInvoice["showAttachments"];
    private _exchangeCurrencyRate: InterfaceInvoice["exchangeCurrencyRate"];
    private _hasAttachments: InterfaceInvoice["hasAttachments"];
    private _exchangeDate: InterfaceInvoice["exchangeDate"];
    private _attachmentsCount: InterfaceInvoice["attachmentsCount"];
    private _deliveryDate: InterfaceInvoice["deliveryDate"];
    private _fiscalStatus: InterfaceInvoice["fiscalStatus"];
    private _useMoss: InterfaceInvoice["useMoss"];
    private _transactionDate: InterfaceInvoice["transactionDate"];
    private _emailStatus: InterfaceInvoice["emailStatus"];
    private _excludeFromStockLevel: InterfaceInvoice["excludeFromStockLevel"];
    private _excludeFromAccounting: InterfaceInvoice["excludeFromAccounting"];
    private _exchangeRateDen: InterfaceInvoice["exchangeRateDen"];
    private _exchangeCurrencyRateDen: InterfaceInvoice["exchangeCurrencyRateDen"];
    private _accountingScheme: InterfaceInvoice["accountingScheme"];
    private _exchangeDifference: InterfaceInvoice["exchangeDifference"];
    private _notCost: InterfaceInvoice["notCost"];
    private _reverseCharge: InterfaceInvoice["reverseCharge"];
    private _issuer: InterfaceInvoice["issuer"];
    private _useIssuer: InterfaceInvoice["useIssuer"];
    private _cancelled: InterfaceInvoice["cancelled"];
    private _recipientId: InterfaceInvoice["recipientId"];
    private _recipientName: InterfaceInvoice["recipientName"];
    private _test: InterfaceInvoice["test"];
    private _discountNet: InterfaceInvoice["discountNet"];
    private _approvalStatus: InterfaceInvoice["approvalStatus"];
    private _accountingVatTaxDate: InterfaceInvoice["accountingVatTaxDate"];
    private _accountingIncomeTaxDate: InterfaceInvoice["accountingIncomeTaxDate"];
    private _accountingOtherTaxDate: InterfaceInvoice["accountingOtherTaxDate"];
    private _accountingStatus: InterfaceInvoice["accountingStatus"];
    private _normalizedNumber: InterfaceInvoice["normalizedNumber"];
    private _naTaxKind: InterfaceInvoice["naTaxKind"];
    private _issuedToReceipt: InterfaceInvoice["issuedToReceipt"];
    private _title: InterfaceInvoice["title"];
    private _salesCode: InterfaceInvoice["salesCode"];
    private _paymentUrl: InterfaceInvoice["paymentUrl"];
    private _viewUrl: InterfaceInvoice["viewUrl"];
    private _adjustInvoicePrice: InterfaceInvoice["adjustInvoicePrice"];
    private _checkFiscalPrint: InterfaceInvoice["checkFiscalPrint"];
    private _additionalInvoiceField: InterfaceInvoice["additionalInvoiceField"];
    private _productsMargin: InterfaceInvoice["productsMargin"];
    private _recipientStreet: InterfaceInvoice["recipientStreet"];
    private _recipientPostCode: InterfaceInvoice["recipientPostCode"];
    private _recipientCity: InterfaceInvoice["recipientCity"];
    private _recipientCountry: InterfaceInvoice["recipientCountry"];
    private _recipientEmail: InterfaceInvoice["recipientEmail"];
    private _recipientPhone: InterfaceInvoice["recipientPhone"];
    private _recipientNote: InterfaceInvoice["recipientNote"];
    private _buyerMobilePhone: InterfaceInvoice["buyerMobilePhone"];
    private _positions: InterfaceInvoice["positions"];

    static async findById(invoiceId: number): Promise<Invoice> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.get(`/invoices/${invoiceId}.json`);
        return new Invoice(camelizeObject(result.data));
    }

    static async findBy(params: ParamsSearchInvoice): Promise<Invoice[]> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        let query = "";
        if (params.page) query = `${query}page=${params.page}&`;
        if (params.perPage) query = `${query}per_page=${params.perPage}&`;
        if (params.period) query = `${query}period=${params.period}&`;
        if (params.dateFrom) query = `${query}date_from=${convertDateToString(params.dateFrom, "DD/MM/YYYY")}&`;
        if (params.dateTo) query = `${query}date_to=${convertDateToString(params.dateTo, "DD/MM/YYYY")}&`;
        if (params.searchDateType) query = `${query}search_date_type=${params.searchDateType}&`;
        if (params.clientId) query = `${query}client_id=${params.clientId}&`;
        if (params.number) query = `${query}number=${params.number}&`;
        if (params.invoiceId) query = `${query}invoice_id=${params.invoiceId}&`;
        if (params.fromInvoiceId) query = `${query}from_invoice_id=${params.fromInvoiceId}&`;
        if (params.kind) query = `${query}kind=${params.kind}&`;
        const result = await axios.get(`/invoices.json?${query}`);
        const results: Invoice[] = [];
        for (const dataInvoice of result.data) {
            results.push(await this.findById(dataInvoice.id));
        }
        return results;
    }


    static async findAll(params?: ParamsSearchInvoice): Promise<Invoice[]> {
        const results: Invoice[] = [];
        let page = 1;
        let invoiceToLoad;
        do {
            invoiceToLoad = false;
            const tmp = await this.findBy({
                ...(params || {}),
                page,
                perPage: 100,
            });
            if (tmp.length > 0) {
                results.push(...tmp);
                invoiceToLoad = true;
            }
            page++;
        } while (invoiceToLoad);
        return results;
    }

    async save(): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.post("/invoices.json", {
            invoice: this.toParams(),
        });
        this.setValue(camelizeObject(result.data));
    }

    async update(): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.post(`/invoices/${this.id}.json`, {
            invoice: this.toParams(),
        });
        this.setValue(camelizeObject(result.data));
    }

    async remove(invoiceId?: number): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        if (!invoiceId && !this.id) throw new Error("Invalid Argument");
        await axios.delete(`/invoices/${invoiceId || this.id}.json`);
    }

    async sendByMail(force = false): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        await axios.post(`/invoices/${this.id}/send_by_email.json?force=${force}`);
    }

    async getClient(): Promise<Client> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        if (!this.clientId) throw new Error("Invalid Argument");
        return await Client.findById(this.clientId);
    }

    duplicateAs(
        kind:
            | "vat"
            | "estimate"
            | "proforma"
            | "correction"
            | "client_order"
            | "receipt"
            | "advance"
            | "final"
            | "invoice_other"
            | "kp"
            | "kw"
            | null,
    ): Invoice {
        if (!this.id) throw new Error("Method only avaialble on a valid invoice");
        return new Invoice({
            kind,
            fromInvoiceId: this.id,
            clientId: this.clientId,
            departmentId: this.departmentId,
            lang: this.lang,
            paymentToKind: this.paymentToKind,
            test: this.test,
            currency: this.currency,
            exchangeCurrency: this.exchangeCurrency,
            discountKind: this.discountKind,
            showDiscount: this.showDiscount,
            positions: this.positions?.map(product => {
                const productData: {[key: string]: any} = {
                    quantity: product.quantity,
                    ...(product.discount && {discount: product.discount}),
                    ...(product.discountPercent && {discount_percent: product.discountPercent}),
                };
                if (product.productId) {
                    productData.productId = product.productId;
                } else {
                    productData.name = product.name;
                    productData.totalPriceGross = product.totalPriceGross;
                }
                return productData;
            }),
        });
    }

    getLinkPreview(): string {
        return this.viewUrl || "";
    }

    getLinkPDF(): string {
        return this.getLinkPreview() + ".pdf";
    }

    setAsPaid(): void {
        this.status = "paid";
        this.paidDate = moment().format("DD-MM-YYYY H:i:s");
    }

    addProduct(product: Product, quantity = 1, discountObject?: { type: "Percentage" | "Amount", value: number, code?: string }): void {
        if (!this.positions) this.positions = [];
        if (!product || !product.id) return;
        this.positions.push({
            productId: +product.id,
            quantity: quantity.toString(),
            ...(discountObject && discountObject.type === "Amount" && {
                discount: discountObject.value + ""
            }),
            ...(discountObject && discountObject.type === "Percentage" && {
                discountPercent: discountObject.value + ""
            }),
        });
        if (discountObject) {
            this.showDiscount = true;
            this.discountKind = discountObject.type === "Amount" ? "amount" :
                this.positions.every(position => position.discountPercent === discountObject.value + "") ?
                    "percent_total" :
                    "percent_unit";
        }
    }

    constructor(data: InterfaceInvoice) {
        this.setValue(data || {});
    }

    setValue(data: InterfaceInvoice): void {
        this.id = data.id ? data.id : null;
        this.userId = data.userId ? data.userId : null;
        this.app = data.app ? data.app : null;
        this.number = data.number ? data.number : null;
        this.place = data.place ? data.place : null;
        this.sellDate = data.sellDate ? data.sellDate : null;
        this.paymentType = data.paymentType ? data.paymentType : null;
        this.priceNet = data.priceNet ? data.priceNet : null;
        this.priceGross = data.priceGross ? data.priceGross : null;
        this.currency = data.currency ? data.currency : null;
        this.status = data.status ? data.status : null;
        this.description = data.description ? data.description : null;
        this.sellerName = data.sellerName ? data.sellerName : null;
        this.sellerTaxNo = data.sellerTaxNo ? data.sellerTaxNo : null;
        this.sellerStreet = data.sellerStreet ? data.sellerStreet : null;
        this.sellerPostCode = data.sellerPostCode ? data.sellerPostCode : null;
        this.sellerCity = data.sellerCity ? data.sellerCity : null;
        this.sellerCountry = data.sellerCountry ? data.sellerCountry : null;
        this.sellerEmail = data.sellerEmail ? data.sellerEmail : null;
        this.sellerPhone = data.sellerPhone ? data.sellerPhone : null;
        this.sellerFax = data.sellerFax ? data.sellerFax : null;
        this.sellerWww = data.sellerWww ? data.sellerWww : null;
        this.sellerPerson = data.sellerPerson ? data.sellerPerson : null;
        this.sellerBank = data.sellerBank ? data.sellerBank : null;
        this.sellerBankAccount = data.sellerBankAccount ? data.sellerBankAccount : null;
        this.buyerName = data.buyerName ? data.buyerName : null;
        this.buyerTaxNo = data.buyerTaxNo ? data.buyerTaxNo : null;
        this.buyerPostCode = data.buyerPostCode ? data.buyerPostCode : null;
        this.buyerCity = data.buyerCity ? data.buyerCity : null;
        this.buyerStreet = data.buyerStreet ? data.buyerStreet : null;
        this.buyerFirstName = data.buyerFirstName ? data.buyerFirstName : null;
        this.buyerCountry = data.buyerCountry ? data.buyerCountry : null;
        this.createdAt = data.createdAt ? data.createdAt : null;
        this.updatedAt = data.updatedAt ? data.updatedAt : null;
        this.token = data.token ? data.token : null;
        this.buyerEmail = data.buyerEmail ? data.buyerEmail : null;
        this.buyerWww = data.buyerWww ? data.buyerWww : null;
        this.buyerFax = data.buyerFax ? data.buyerFax : null;
        this.buyerPhone = data.buyerPhone ? data.buyerPhone : null;
        this.kind = data.kind ? data.kind : null;
        this.pattern = data.pattern ? data.pattern : null;
        this.patternNr = data.patternNr ? data.patternNr : null;
        this.patternNrM = data.patternNrM ? data.patternNrM : null;
        this.patternNrD = data.patternNrD ? data.patternNrD : null;
        this.clientId = data.clientId ? data.clientId : null;
        this.paymentTo = data.paymentTo ? data.paymentTo : null;
        this.paid = data.paid ? data.paid : null;
        this.sellerBankAccountId = data.sellerBankAccountId ? data.sellerBankAccountId : null;
        this.lang = data.lang ? data.lang : null;
        this.issueDate = data.issueDate ? data.issueDate : null;
        this.priceTax = data.priceTax ? data.priceTax : null;
        this.departmentId = data.departmentId ? data.departmentId : null;
        this.correction = data.correction ? data.correction : null;
        this.buyerNote = data.buyerNote ? data.buyerNote : null;
        this.additionalInfoDesc = data.additionalInfoDesc ? data.additionalInfoDesc : null;
        this.additionalInfo = data.additionalInfo ? data.additionalInfo : null;
        this.productCache = data.productCache ? data.productCache : null;
        this.buyerLastName = data.buyerLastName ? data.buyerLastName : null;
        this.fromInvoiceId = data.fromInvoiceId ? data.fromInvoiceId : null;
        this.oid = data.oid ? data.oid : null;
        this.discount = data.discount ? data.discount : null;
        this.showDiscount = data.showDiscount ? data.showDiscount : null;
        this.sentTime = data.sentTime ? data.sentTime : null;
        this.printTime = data.printTime ? data.printTime : null;
        this.recurringId = data.recurringId ? data.recurringId : null;
        this.tax2Visible = data.tax2Visible ? data.tax2Visible : null;
        this.warehouseId = data.warehouseId ? data.warehouseId : null;
        this.paidDate = data.paidDate ? data.paidDate : null;
        this.productId = data.productId ? data.productId : null;
        this.issueYear = data.issueYear ? data.issueYear : null;
        this.internalNote = data.internalNote ? data.internalNote : null;
        this.invoiceId = data.invoiceId ? data.invoiceId : null;
        this.invoiceTemplateId = data.invoiceTemplateId ? data.invoiceTemplateId : null;
        this.descriptionLong = data.descriptionLong ? data.descriptionLong : null;
        this.buyerTaxNoKind = data.buyerTaxNoKind ? data.buyerTaxNoKind : null;
        this.sellerTaxNoKind = data.sellerTaxNoKind ? data.sellerTaxNoKind : null;
        this.descriptionFooter = data.descriptionFooter ? data.descriptionFooter : null;
        this.sellDateKind = data.sellDateKind ? data.sellDateKind : null;
        this.paymentToKind = data.paymentToKind ? data.paymentToKind : null;
        this.exchangeCurrency = data.exchangeCurrency ? data.exchangeCurrency : null;
        this.discountKind = data.discountKind ? data.discountKind : null;
        this.income = data.income ? data.income : null;
        this.fromApi = data.fromApi ? data.fromApi : null;
        this.categoryId = data.categoryId ? data.categoryId : null;
        this.warehouseDocumentId = data.warehouseDocumentId ? data.warehouseDocumentId : null;
        this.exchangeKind = data.exchangeKind ? data.exchangeKind : null;
        this.exchangeRate = data.exchangeRate ? data.exchangeRate : null;
        this.useDeliveryAddress = data.useDeliveryAddress ? data.useDeliveryAddress : null;
        this.deliveryAddress = data.deliveryAddress ? data.deliveryAddress : null;
        this.accountingKind = data.accountingKind ? data.accountingKind : null;
        this.buyerPerson = data.buyerPerson ? data.buyerPerson : null;
        this.buyerBankAccount = data.buyerBankAccount ? data.buyerBankAccount : null;
        this.buyerBank = data.buyerBank ? data.buyerBank : null;
        this.buyerMassPaymentCode = data.buyerMassPaymentCode ? data.buyerMassPaymentCode : null;
        this.exchangeNote = data.exchangeNote ? data.exchangeNote : null;
        this.clientCompany = data.clientCompany ? data.clientCompany : null;
        this.buyerCompany = data.buyerCompany ? data.buyerCompany : null;
        this.showAttachments = data.showAttachments ? data.showAttachments : null;
        this.exchangeCurrencyRate = data.exchangeCurrencyRate ? data.exchangeCurrencyRate : null;
        this.hasAttachments = data.hasAttachments ? data.hasAttachments : null;
        this.exchangeDate = data.exchangeDate ? data.exchangeDate : null;
        this.attachmentsCount = data.attachmentsCount ? data.attachmentsCount : null;
        this.deliveryDate = data.deliveryDate ? data.deliveryDate : null;
        this.fiscalStatus = data.fiscalStatus ? data.fiscalStatus : null;
        this.useMoss = data.useMoss ? data.useMoss : null;
        this.transactionDate = data.transactionDate ? data.transactionDate : null;
        this.emailStatus = data.emailStatus ? data.emailStatus : null;
        this.excludeFromStockLevel = data.excludeFromStockLevel ? data.excludeFromStockLevel : null;
        this.excludeFromAccounting = data.excludeFromAccounting ? data.excludeFromAccounting : null;
        this.exchangeRateDen = data.exchangeRateDen ? data.exchangeRateDen : null;
        this.exchangeCurrencyRateDen = data.exchangeCurrencyRateDen ? data.exchangeCurrencyRateDen : null;
        this.accountingScheme = data.accountingScheme ? data.accountingScheme : null;
        this.exchangeDifference = data.exchangeDifference ? data.exchangeDifference : null;
        this.notCost = data.notCost ? data.notCost : null;
        this.reverseCharge = data.reverseCharge ? data.reverseCharge : null;
        this.issuer = data.issuer ? data.issuer : null;
        this.useIssuer = data.useIssuer ? data.useIssuer : null;
        this.cancelled = data.cancelled ? data.cancelled : null;
        this.recipientId = data.recipientId ? data.recipientId : null;
        this.recipientName = data.recipientName ? data.recipientName : null;
        this.test = data.test ? data.test : null;
        this.discountNet = data.discountNet ? data.discountNet : null;
        this.approvalStatus = data.approvalStatus ? data.approvalStatus : null;
        this.accountingVatTaxDate = data.accountingVatTaxDate ? data.accountingVatTaxDate : null;
        this.accountingIncomeTaxDate = data.accountingIncomeTaxDate ? data.accountingIncomeTaxDate : null;
        this.accountingOtherTaxDate = data.accountingOtherTaxDate ? data.accountingOtherTaxDate : null;
        this.accountingStatus = data.accountingStatus ? data.accountingStatus : null;
        this.normalizedNumber = data.normalizedNumber ? data.normalizedNumber : null;
        this.naTaxKind = data.naTaxKind ? data.naTaxKind : null;
        this.issuedToReceipt = data.issuedToReceipt ? data.issuedToReceipt : null;
        this.title = data.title ? data.title : null;
        this.salesCode = data.salesCode ? data.salesCode : null;
        this.paymentUrl = data.paymentUrl ? data.paymentUrl : null;
        this.viewUrl = data.viewUrl ? data.viewUrl : null;
        this.adjustInvoicePrice = data.adjustInvoicePrice ? data.adjustInvoicePrice : null;
        this.checkFiscalPrint = data.checkFiscalPrint ? data.checkFiscalPrint : null;
        this.additionalInvoiceField = data.additionalInvoiceField ? data.additionalInvoiceField : null;
        this.productsMargin = data.productsMargin ? data.productsMargin : null;
        this.recipientStreet = data.recipientStreet ? data.recipientStreet : null;
        this.recipientPostCode = data.recipientPostCode ? data.recipientPostCode : null;
        this.recipientCity = data.recipientCity ? data.recipientCity : null;
        this.recipientCountry = data.recipientCountry ? data.recipientCountry : null;
        this.recipientEmail = data.recipientEmail ? data.recipientEmail : null;
        this.recipientPhone = data.recipientPhone ? data.recipientPhone : null;
        this.recipientNote = data.recipientNote ? data.recipientNote : null;
        this.buyerMobilePhone = data.buyerMobilePhone ? data.buyerMobilePhone : null;
        this.positions = data.positions ? data.positions.map(position => camelizeObject(position)) : [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toParams(): Record<string, any> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: Record<string, any> = {};

        if (this.id) params["id"] = this.id;
        if (this.userId) params["userId"] = this.userId;
        if (this.app) params["app"] = this.app;
        if (this.number) params["number"] = this.number;
        if (this.place) params["place"] = this.place;
        if (this.sellDate) params["sellDate"] = this.sellDate;
        if (this.paymentType) params["paymentType"] = this.paymentType;
        if (this.priceNet) params["priceNet"] = this.priceNet;
        if (this.priceGross) params["priceGross"] = this.priceGross;
        if (this.currency) params["currency"] = this.currency;
        if (this.status) params["status"] = this.status;
        if (this.description) params["description"] = this.description;
        if (this.sellerName) params["sellerName"] = this.sellerName;
        if (this.sellerTaxNo) params["sellerTaxNo"] = this.sellerTaxNo;
        if (this.sellerStreet) params["sellerStreet"] = this.sellerStreet;
        if (this.sellerPostCode) params["sellerPostCode"] = this.sellerPostCode;
        if (this.sellerCity) params["sellerCity"] = this.sellerCity;
        if (this.sellerCountry) params["sellerCountry"] = this.sellerCountry;
        if (this.sellerEmail) params["sellerEmail"] = this.sellerEmail;
        if (this.sellerPhone) params["sellerPhone"] = this.sellerPhone;
        if (this.sellerFax) params["sellerFax"] = this.sellerFax;
        if (this.sellerWww) params["sellerWww"] = this.sellerWww;
        if (this.sellerPerson) params["sellerPerson"] = this.sellerPerson;
        if (this.sellerBank) params["sellerBank"] = this.sellerBank;
        if (this.sellerBankAccount) params["sellerBankAccount"] = this.sellerBankAccount;
        if (this.buyerName) params["buyerName"] = this.buyerName;
        if (this.buyerTaxNo) params["buyerTaxNo"] = this.buyerTaxNo;
        if (this.buyerPostCode) params["buyerPostCode"] = this.buyerPostCode;
        if (this.buyerCity) params["buyerCity"] = this.buyerCity;
        if (this.buyerStreet) params["buyerStreet"] = this.buyerStreet;
        if (this.buyerFirstName) params["buyerFirstName"] = this.buyerFirstName;
        if (this.buyerCountry) params["buyerCountry"] = this.buyerCountry;
        if (this.createdAt) params["createdAt"] = this.createdAt;
        if (this.updatedAt) params["updatedAt"] = this.updatedAt;
        if (this.token) params["token"] = this.token;
        if (this.buyerEmail) params["buyerEmail"] = this.buyerEmail;
        if (this.buyerWww) params["buyerWww"] = this.buyerWww;
        if (this.buyerFax) params["buyerFax"] = this.buyerFax;
        if (this.buyerPhone) params["buyerPhone"] = this.buyerPhone;
        if (this.kind) params["kind"] = this.kind;
        if (this.pattern) params["pattern"] = this.pattern;
        if (this.patternNr) params["patternNr"] = this.patternNr;
        if (this.patternNrM) params["patternNrM"] = this.patternNrM;
        if (this.patternNrD) params["patternNrD"] = this.patternNrD;
        if (this.clientId) params["clientId"] = this.clientId;
        if (this.paymentTo) params["paymentTo"] = this.paymentTo;
        if (this.paid) params["paid"] = this.paid;
        if (this.sellerBankAccountId) params["sellerBankAccountId"] = this.sellerBankAccountId;
        if (this.lang) params["lang"] = this.lang;
        if (this.issueDate) params["issueDate"] = this.issueDate;
        if (this.priceTax) params["priceTax"] = this.priceTax;
        if (this.departmentId) params["departmentId"] = this.departmentId;
        if (this.correction) params["correction"] = this.correction;
        if (this.buyerNote) params["buyerNote"] = this.buyerNote;
        if (this.additionalInfoDesc) params["additionalInfoDesc"] = this.additionalInfoDesc;
        if (this.additionalInfo) params["additionalInfo"] = this.additionalInfo;
        if (this.productCache) params["productCache"] = this.productCache;
        if (this.buyerLastName) params["buyerLastName"] = this.buyerLastName;
        if (this.fromInvoiceId) params["fromInvoiceId"] = this.fromInvoiceId;
        if (this.oid) params["oid"] = this.oid;
        if (this.discount) params["discount"] = this.discount;
        if (this.showDiscount) params["showDiscount"] = this.showDiscount;
        if (this.sentTime) params["sentTime"] = this.sentTime;
        if (this.printTime) params["printTime"] = this.printTime;
        if (this.recurringId) params["recurringId"] = this.recurringId;
        if (this.tax2Visible) params["tax2Visible"] = this.tax2Visible;
        if (this.warehouseId) params["warehouseId"] = this.warehouseId;
        if (this.paidDate) params["paidDate"] = this.paidDate;
        if (this.productId) params["productId"] = this.productId;
        if (this.issueYear) params["issueYear"] = this.issueYear;
        if (this.internalNote) params["internalNote"] = this.internalNote;
        if (this.invoiceId) params["invoiceId"] = this.invoiceId;
        if (this.invoiceTemplateId) params["invoiceTemplateId"] = this.invoiceTemplateId;
        if (this.descriptionLong) params["descriptionLong"] = this.descriptionLong;
        if (this.buyerTaxNoKind) params["buyerTaxNoKind"] = this.buyerTaxNoKind;
        if (this.sellerTaxNoKind) params["sellerTaxNoKind"] = this.sellerTaxNoKind;
        if (this.descriptionFooter) params["descriptionFooter"] = this.descriptionFooter;
        if (this.sellDateKind) params["sellDateKind"] = this.sellDateKind;
        if (this.paymentToKind) params["paymentToKind"] = this.paymentToKind;
        if (this.exchangeCurrency) params["exchangeCurrency"] = this.exchangeCurrency;
        if (this.discountKind) params["discountKind"] = this.discountKind;
        if (this.income) params["income"] = this.income;
        if (this.fromApi) params["fromApi"] = this.fromApi;
        if (this.categoryId) params["categoryId"] = this.categoryId;
        if (this.warehouseDocumentId) params["warehouseDocumentId"] = this.warehouseDocumentId;
        if (this.exchangeKind) params["exchangeKind"] = this.exchangeKind;
        if (this.exchangeRate) params["exchangeRate"] = this.exchangeRate;
        if (this.useDeliveryAddress) params["useDeliveryAddress"] = this.useDeliveryAddress;
        if (this.deliveryAddress) params["deliveryAddress"] = this.deliveryAddress;
        if (this.accountingKind) params["accountingKind"] = this.accountingKind;
        if (this.buyerPerson) params["buyerPerson"] = this.buyerPerson;
        if (this.buyerBankAccount) params["buyerBankAccount"] = this.buyerBankAccount;
        if (this.buyerBank) params["buyerBank"] = this.buyerBank;
        if (this.buyerMassPaymentCode) params["buyerMassPaymentCode"] = this.buyerMassPaymentCode;
        if (this.exchangeNote) params["exchangeNote"] = this.exchangeNote;
        if (this.clientCompany) params["clientCompany"] = this.clientCompany;
        if (this.buyerCompany) params["buyerCompany"] = this.buyerCompany;
        if (this.showAttachments) params["showAttachments"] = this.showAttachments;
        if (this.exchangeCurrencyRate) params["exchangeCurrencyRate"] = this.exchangeCurrencyRate;
        if (this.hasAttachments) params["hasAttachments"] = this.hasAttachments;
        if (this.exchangeDate) params["exchangeDate"] = this.exchangeDate;
        if (this.attachmentsCount) params["attachmentsCount"] = this.attachmentsCount;
        if (this.deliveryDate) params["deliveryDate"] = this.deliveryDate;
        if (this.fiscalStatus) params["fiscalStatus"] = this.fiscalStatus;
        if (this.useMoss) params["useMoss"] = this.useMoss;
        if (this.transactionDate) params["transactionDate"] = this.transactionDate;
        if (this.emailStatus) params["emailStatus"] = this.emailStatus;
        if (this.excludeFromStockLevel) params["excludeFromStockLevel"] = this.excludeFromStockLevel;
        if (this.excludeFromAccounting) params["excludeFromAccounting"] = this.excludeFromAccounting;
        if (this.exchangeRateDen) params["exchangeRateDen"] = this.exchangeRateDen;
        if (this.exchangeCurrencyRateDen) params["exchangeCurrencyRateDen"] = this.exchangeCurrencyRateDen;
        if (this.accountingScheme) params["accountingScheme"] = this.accountingScheme;
        if (this.exchangeDifference) params["exchangeDifference"] = this.exchangeDifference;
        if (this.notCost) params["notCost"] = this.notCost;
        if (this.reverseCharge) params["reverseCharge"] = this.reverseCharge;
        if (this.issuer) params["issuer"] = this.issuer;
        if (this.useIssuer) params["useIssuer"] = this.useIssuer;
        if (this.cancelled) params["cancelled"] = this.cancelled;
        if (this.recipientId) params["recipientId"] = this.recipientId;
        if (this.recipientName) params["recipientName"] = this.recipientName;
        params["test"] = this.test;
        if (this.discountNet) params["discountNet"] = this.discountNet;
        if (this.approvalStatus) params["approvalStatus"] = this.approvalStatus;
        if (this.accountingVatTaxDate) params["accountingVatTaxDate"] = this.accountingVatTaxDate;
        if (this.accountingIncomeTaxDate) params["accountingIncomeTaxDate"] = this.accountingIncomeTaxDate;
        if (this.accountingOtherTaxDate) params["accountingOtherTaxDate"] = this.accountingOtherTaxDate;
        if (this.accountingStatus) params["accountingStatus"] = this.accountingStatus;
        if (this.normalizedNumber) params["normalizedNumber"] = this.normalizedNumber;
        if (this.naTaxKind) params["naTaxKind"] = this.naTaxKind;
        if (this.issuedToReceipt) params["issuedToReceipt"] = this.issuedToReceipt;
        if (this.title) params["title"] = this.title;
        if (this.salesCode) params["salesCode"] = this.salesCode;
        if (this.paymentUrl) params["paymentUrl"] = this.paymentUrl;
        if (this.viewUrl) params["viewUrl"] = this.viewUrl;
        if (this.adjustInvoicePrice) params["adjustInvoicePrice"] = this.adjustInvoicePrice;
        if (this.checkFiscalPrint) params["checkFiscalPrint"] = this.checkFiscalPrint;
        if (this.additionalInvoiceField) params["additionalInvoiceField"] = this.additionalInvoiceField;
        if (this.productsMargin) params["productsMargin"] = this.productsMargin;
        if (this.recipientStreet) params["recipientStreet"] = this.recipientStreet;
        if (this.recipientPostCode) params["recipientPostCode"] = this.recipientPostCode;
        if (this.recipientCity) params["recipientCity"] = this.recipientCity;
        if (this.recipientCountry) params["recipientCountry"] = this.recipientCountry;
        if (this.recipientEmail) params["recipientEmail"] = this.recipientEmail;
        if (this.recipientPhone) params["recipientPhone"] = this.recipientPhone;
        if (this.recipientNote) params["recipientNote"] = this.recipientNote;
        if (this.buyerMobilePhone) params["buyerMobilePhone"] = this.buyerMobilePhone;
        if (this.positions) params["positions"] = this.positions;

        return unCamelizeObject(params);
    }

    get accountingIncomeTaxDate(): Date | null | undefined | string {
        return this._accountingIncomeTaxDate;
    }

    set accountingIncomeTaxDate(value: Date | null | undefined | string) {
        this._accountingIncomeTaxDate = convertStringToDate(value);
    }

    get accountingKind(): null | undefined {
        return this._accountingKind;
    }

    set accountingKind(value: null | undefined) {
        this._accountingKind = value;
    }

    get accountingOtherTaxDate(): Date | null | undefined | string {
        return this._accountingOtherTaxDate;
    }

    set accountingOtherTaxDate(value: Date | null | undefined | string) {
        this._accountingOtherTaxDate = convertStringToDate(value);
    }

    get accountingScheme(): null | undefined {
        return this._accountingScheme;
    }

    set accountingScheme(value: null | undefined) {
        this._accountingScheme = value;
    }

    get accountingStatus(): "exported" | string | null | undefined {
        return this._accountingStatus;
    }

    set accountingStatus(value: "exported" | string | null | undefined) {
        this._accountingStatus = value;
    }

    get accountingVatTaxDate(): Date | null | undefined | string {
        return this._accountingVatTaxDate;
    }

    set accountingVatTaxDate(value: Date | null | undefined | string) {
        this._accountingVatTaxDate = convertStringToDate(value);
    }

    get additionalInfo(): boolean | null | undefined {
        return this._additionalInfo;
    }

    set additionalInfo(value: boolean | null | undefined) {
        this._additionalInfo = value;
    }

    get additionalInfoDesc(): null | undefined {
        return this._additionalInfoDesc;
    }

    set additionalInfoDesc(value: null | undefined) {
        this._additionalInfoDesc = value;
    }

    get additionalInvoiceField(): null | undefined {
        return this._additionalInvoiceField;
    }

    set additionalInvoiceField(value: null | undefined) {
        this._additionalInvoiceField = value;
    }

    get adjustInvoicePrice(): string | null | undefined {
        return this._adjustInvoicePrice;
    }

    set adjustInvoicePrice(value: string | null | undefined) {
        this._adjustInvoicePrice = value;
    }

    get app(): null | undefined {
        return this._app;
    }

    set app(value: null | undefined) {
        this._app = value;
    }

    get approvalStatus(): string | null | undefined {
        return this._approvalStatus;
    }

    set approvalStatus(value: string | null | undefined) {
        this._approvalStatus = value;
    }

    get attachmentsCount(): number | null | undefined {
        return this._attachmentsCount;
    }

    set attachmentsCount(value: number | null | undefined) {
        this._attachmentsCount = value;
    }

    get buyerBank(): null | undefined {
        return this._buyerBank;
    }

    set buyerBank(value: null | undefined) {
        this._buyerBank = value;
    }

    get buyerBankAccount(): null | undefined {
        return this._buyerBankAccount;
    }

    set buyerBankAccount(value: null | undefined) {
        this._buyerBankAccount = value;
    }

    get buyerCity(): string | null | undefined {
        return this._buyerCity;
    }

    set buyerCity(value: string | null | undefined) {
        this._buyerCity = value;
    }

    get buyerCompany(): boolean | null | undefined {
        return this._buyerCompany;
    }

    set buyerCompany(value: boolean | null | undefined) {
        this._buyerCompany = value;
    }

    get buyerCountry(): string | null | undefined {
        return this._buyerCountry;
    }

    set buyerCountry(value: string | null | undefined) {
        this._buyerCountry = value;
    }

    get buyerEmail(): string | null | undefined {
        return this._buyerEmail;
    }

    set buyerEmail(value: string | null | undefined) {
        this._buyerEmail = value;
    }

    get buyerFax(): string | null | undefined {
        return this._buyerFax;
    }

    set buyerFax(value: string | null | undefined) {
        this._buyerFax = value;
    }

    get buyerFirstName(): string | null | undefined {
        return this._buyerFirstName;
    }

    set buyerFirstName(value: string | null | undefined) {
        this._buyerFirstName = value;
    }

    get buyerLastName(): null | undefined {
        return this._buyerLastName;
    }

    set buyerLastName(value: null | undefined) {
        this._buyerLastName = value;
    }

    get buyerMassPaymentCode(): null | undefined {
        return this._buyerMassPaymentCode;
    }

    set buyerMassPaymentCode(value: null | undefined) {
        this._buyerMassPaymentCode = value;
    }

    get buyerMobilePhone(): string | null | undefined {
        return this._buyerMobilePhone;
    }

    set buyerMobilePhone(value: string | null | undefined) {
        this._buyerMobilePhone = value;
    }

    get buyerName(): string | null | undefined {
        return this._buyerName;
    }

    set buyerName(value: string | null | undefined) {
        this._buyerName = value;
    }

    get buyerNote(): null | undefined {
        return this._buyerNote;
    }

    set buyerNote(value: null | undefined) {
        this._buyerNote = value;
    }

    get buyerPerson(): string | null | undefined {
        return this._buyerPerson;
    }

    set buyerPerson(value: string | null | undefined) {
        this._buyerPerson = value;
    }

    get buyerPhone(): string | null | undefined {
        return this._buyerPhone;
    }

    set buyerPhone(value: string | null | undefined) {
        this._buyerPhone = value;
    }

    get buyerPostCode(): string | null | undefined {
        return this._buyerPostCode;
    }

    set buyerPostCode(value: string | null | undefined) {
        this._buyerPostCode = value;
    }

    get buyerStreet(): string | null | undefined {
        return this._buyerStreet;
    }

    set buyerStreet(value: string | null | undefined) {
        this._buyerStreet = value;
    }

    get buyerTaxNo(): string | null | undefined {
        return this._buyerTaxNo;
    }

    set buyerTaxNo(value: string | null | undefined) {
        this._buyerTaxNo = value;
    }

    get buyerTaxNoKind(): null | undefined {
        return this._buyerTaxNoKind;
    }

    set buyerTaxNoKind(value: null | undefined) {
        this._buyerTaxNoKind = value;
    }

    get buyerWww(): string | null | undefined {
        return this._buyerWww;
    }

    set buyerWww(value: string | null | undefined) {
        this._buyerWww = value;
    }

    get cancelled(): boolean | null | undefined {
        return this._cancelled;
    }

    set cancelled(value: boolean | null | undefined) {
        this._cancelled = value;
    }

    get categoryId(): null | undefined {
        return this._categoryId;
    }

    set categoryId(value: null | undefined) {
        this._categoryId = value;
    }

    get checkFiscalPrint(): boolean | null | undefined {
        return this._checkFiscalPrint;
    }

    set checkFiscalPrint(value: boolean | null | undefined) {
        this._checkFiscalPrint = value;
    }

    get clientCompany(): boolean | null | undefined {
        return this._clientCompany;
    }

    set clientCompany(value: boolean | null | undefined) {
        this._clientCompany = value;
    }

    get clientId(): number | null | undefined {
        return this._clientId;
    }

    set clientId(value: number | null | undefined) {
        this._clientId = value;
    }

    get correction(): null | undefined {
        return this._correction;
    }

    set correction(value: null | undefined) {
        this._correction = value;
    }

    get createdAt(): string | null | undefined {
        return this._createdAt;
    }

    set createdAt(value: string | null | undefined) {
        this._createdAt = value;
    }

    get currency(): string | null | undefined {
        return this._currency;
    }

    set currency(value: string | null | undefined) {
        this._currency = value;
    }

    get deliveryAddress(): null | undefined {
        return this._deliveryAddress;
    }

    set deliveryAddress(value: null | undefined) {
        this._deliveryAddress = value;
    }

    get deliveryDate(): Date | null | undefined | string {
        return this._deliveryDate;
    }

    set deliveryDate(value: Date | null | undefined | string) {
        this._deliveryDate = convertStringToDate(value);
    }

    get departmentId(): number | null | undefined {
        return this._departmentId;
    }

    set departmentId(value: number | null | undefined) {
        this._departmentId = value;
    }

    get description(): string | null | undefined {
        return this._description;
    }

    set description(value: string | null | undefined) {
        this._description = value;
    }

    get descriptionFooter(): null | undefined {
        return this._descriptionFooter;
    }

    set descriptionFooter(value: null | undefined) {
        this._descriptionFooter = value;
    }

    get descriptionLong(): null | undefined {
        return this._descriptionLong;
    }

    set descriptionLong(value: null | undefined) {
        this._descriptionLong = value;
    }

    get discount(): string | null | undefined {
        return this._discount;
    }

    set discount(value: string | null | undefined) {
        this._discount = value;
    }

    get discountKind(): "amount" | "percent_unit" | "percent_total" | null | undefined {
        return this._discountKind;
    }

    set discountKind(value: "amount" | "percent_unit" | "percent_total" | null | undefined) {
        this._discountKind = value;
    }

    get discountNet(): string | null | undefined {
        return this._discountNet;
    }

    set discountNet(value: string | null | undefined) {
        this._discountNet = value;
    }

    get emailStatus(): "sent" | string | null | undefined {
        return this._emailStatus;
    }

    set emailStatus(value: "sent" | string | null | undefined) {
        this._emailStatus = value;
    }

    get exchangeCurrency(): null | undefined {
        return this._exchangeCurrency;
    }

    set exchangeCurrency(value: null | undefined) {
        this._exchangeCurrency = value;
    }

    get exchangeCurrencyRate(): null | undefined {
        return this._exchangeCurrencyRate;
    }

    set exchangeCurrencyRate(value: null | undefined) {
        this._exchangeCurrencyRate = value;
    }

    get exchangeCurrencyRateDen(): string | null | undefined {
        return this._exchangeCurrencyRateDen;
    }

    set exchangeCurrencyRateDen(value: string | null | undefined) {
        this._exchangeCurrencyRateDen = value;
    }

    get exchangeDate(): Date | null | undefined | string {
        return this._exchangeDate;
    }

    set exchangeDate(value: Date | null | undefined | string) {
        this._exchangeDate = convertStringToDate(value);
    }

    get exchangeDifference(): string | null | undefined {
        return this._exchangeDifference;
    }

    set exchangeDifference(value: string | null | undefined) {
        this._exchangeDifference = value;
    }

    get exchangeKind(): string | null | undefined {
        return this._exchangeKind;
    }

    set exchangeKind(value: string | null | undefined) {
        this._exchangeKind = value;
    }

    get exchangeNote(): string | null | undefined {
        return this._exchangeNote;
    }

    set exchangeNote(value: string | null | undefined) {
        this._exchangeNote = value;
    }

    get exchangeRate(): string | null | undefined {
        return this._exchangeRate;
    }

    set exchangeRate(value: string | null | undefined) {
        this._exchangeRate = value;
    }

    get exchangeRateDen(): string | null | undefined {
        return this._exchangeRateDen;
    }

    set exchangeRateDen(value: string | null | undefined) {
        this._exchangeRateDen = value;
    }

    get excludeFromAccounting(): boolean | null | undefined {
        return this._excludeFromAccounting;
    }

    set excludeFromAccounting(value: boolean | null | undefined) {
        this._excludeFromAccounting = value;
    }

    get excludeFromStockLevel(): boolean | null | undefined {
        return this._excludeFromStockLevel;
    }

    set excludeFromStockLevel(value: boolean | null | undefined) {
        this._excludeFromStockLevel = value;
    }

    get fiscalStatus(): null | undefined {
        return this._fiscalStatus;
    }

    set fiscalStatus(value: null | undefined) {
        this._fiscalStatus = value;
    }

    get fromApi(): boolean | null | undefined {
        return this._fromApi;
    }

    set fromApi(value: boolean | null | undefined) {
        this._fromApi = value;
    }

    get fromInvoiceId(): null | undefined | number {
        return this._fromInvoiceId;
    }

    set fromInvoiceId(value: null | undefined | number) {
        this._fromInvoiceId = value;
    }

    get hasAttachments(): boolean | null | undefined {
        return this._hasAttachments;
    }

    set hasAttachments(value: boolean | null | undefined) {
        this._hasAttachments = value;
    }

    get id(): number | null | undefined {
        return this._id;
    }

    set id(value: number | null | undefined) {
        this._id = value;
    }

    get income(): boolean | null | undefined {
        return this._income;
    }

    set income(value: boolean | null | undefined) {
        this._income = value;
    }

    get internalNote(): null | undefined {
        return this._internalNote;
    }

    set internalNote(value: null | undefined) {
        this._internalNote = value;
    }

    get invoiceId(): number | null | undefined {
        return this._invoiceId;
    }

    set invoiceId(value: number | null | undefined) {
        this._invoiceId = value;
    }

    get invoiceTemplateId(): number | null | undefined {
        return this._invoiceTemplateId;
    }

    set invoiceTemplateId(value: number | null | undefined) {
        this._invoiceTemplateId = value;
    }

    get issueDate(): Date | null | undefined | string {
        return this._issueDate;
    }

    set issueDate(value: Date | null | undefined | string) {
        this._issueDate = convertStringToDate(value);
    }

    get issueYear(): number | null | undefined {
        return this._issueYear;
    }

    set issueYear(value: number | null | undefined) {
        this._issueYear = value;
    }

    get issuedToReceipt(): boolean | null | undefined {
        return this._issuedToReceipt;
    }

    set issuedToReceipt(value: boolean | null | undefined) {
        this._issuedToReceipt = value;
    }

    get issuer(): null | undefined {
        return this._issuer;
    }

    set issuer(value: null | undefined) {
        this._issuer = value;
    }

    get kind():
        | "vat"
        | "estimate"
        | "proforma"
        | "correction"
        | "client_order"
        | "receipt"
        | "advance"
        | "final"
        | "invoice_other"
        | "kp"
        | "kw"
        | null
        | undefined {
        return this._kind;
    }

    set kind(
        value:
            | "vat"
            | "estimate"
            | "proforma"
            | "correction"
            | "client_order"
            | "receipt"
            | "advance"
            | "final"
            | "invoice_other"
            | "kp"
            | "kw"
            | null
            | undefined,
    ) {
        this._kind = value;
    }

    get lang():
        | "fr"
        | "en"
        | "de"
        | "he"
        | "es"
        | "it"
        | "nl"
        | "cz"
        | "hr"
        | "pl"
        | "hu"
        | "sk"
        | "sl"
        | "et"
        | "ru"
        | "cn"
        | "ar"
        | "tr"
        | "fa"
        | string
        | null
        | undefined {
        return this._lang;
    }

    set lang(
        value:
            | "fr"
            | "en"
            | "de"
            | "he"
            | "es"
            | "it"
            | "nl"
            | "cz"
            | "hr"
            | "pl"
            | "hu"
            | "sk"
            | "sl"
            | "et"
            | "ru"
            | "cn"
            | "ar"
            | "tr"
            | "fa"
            | string
            | null
            | undefined,
    ) {
        this._lang = value;
    }

    get naTaxKind(): null | undefined {
        return this._naTaxKind;
    }

    set naTaxKind(value: null | undefined) {
        this._naTaxKind = value;
    }

    get normalizedNumber(): null | undefined {
        return this._normalizedNumber;
    }

    set normalizedNumber(value: null | undefined) {
        this._normalizedNumber = value;
    }

    get notCost(): boolean | null | undefined {
        return this._notCost;
    }

    set notCost(value: boolean | null | undefined) {
        this._notCost = value;
    }

    get number(): string | null | undefined {
        return this._number;
    }

    set number(value: string | null | undefined) {
        this._number = value;
    }

    get oid(): null | undefined {
        return this._oid;
    }

    set oid(value: null | undefined) {
        this._oid = value;
    }

    get paid(): string | null | undefined {
        return this._paid;
    }

    set paid(value: string | null | undefined) {
        this._paid = value;
    }

    get paidDate(): Date | null | undefined | string {
        return this._paidDate;
    }

    set paidDate(value: Date | null | undefined | string) {
        this._paidDate = convertStringToDate(value);
    }

    get pattern(): string | null | undefined {
        return this._pattern;
    }

    set pattern(value: string | null | undefined) {
        this._pattern = value;
    }

    get patternNr(): number | null | undefined {
        return this._patternNr;
    }

    set patternNr(value: number | null | undefined) {
        this._patternNr = value;
    }

    get patternNrD(): null | undefined {
        return this._patternNrD;
    }

    set patternNrD(value: null | undefined) {
        this._patternNrD = value;
    }

    get patternNrM(): null | undefined {
        return this._patternNrM;
    }

    set patternNrM(value: null | undefined) {
        this._patternNrM = value;
    }

    get paymentTo(): string | null | undefined {
        return this._paymentTo;
    }

    set paymentTo(value: string | null | undefined) {
        this._paymentTo = value;
    }

    get paymentToKind(): string | null | undefined {
        return this._paymentToKind;
    }

    set paymentToKind(value: string | null | undefined) {
        this._paymentToKind = value;
    }

    get paymentType(): "transfer" | "card" | "cash" | "cheque" | "paypal" | "off" | string | null | undefined {
        return this._paymentType;
    }

    set paymentType(value: "transfer" | "card" | "cash" | "cheque" | "paypal" | "off" | string | null | undefined) {
        this._paymentType = value;
    }

    get paymentUrl(): string | null | undefined {
        return this._paymentUrl;
    }

    set paymentUrl(value: string | null | undefined) {
        this._paymentUrl = value;
    }

    get place(): null | undefined {
        return this._place;
    }

    set place(value: null | undefined) {
        this._place = value;
    }

    get positions():
        | {
        id?: number;
        invoiceId?: number;
        name?: string;
        description?: string | null;
        priceNet?: string;
        quantity?: string;
        totalPriceGross?: string;
        totalPriceNet?: string;
        accountId?: number;
        createdAt?: Date;
        updatedAt?: Date;
        additionalInfo?: string | null;
        quantityUnit?: string | null;
        tax?: string;
        priceGross?: string;
        priceTax?: string;
        totalPriceTax?: string;
        kind?: string | null;
        invoicePositionId?: string | null;
        productId?: number;
        deleted?: boolean;
        discount?: string | null;
        discountPercent?: string | null;
        tax2?: string;
        exchangeRate?: string;
        accountingTaxKind?: string | null;
        code?: string | null;
        additionalFields?: {};
    }[]
        | undefined {
        return this._positions;
    }

    set positions(
        value:
            | {
            id?: number;
            invoiceId?: number;
            name?: string;
            description?: string | null;
            priceNet?: string;
            quantity?: string;
            totalPriceGross?: string;
            totalPriceNet?: string;
            accountId?: number;
            createdAt?: Date;
            updatedAt?: Date;
            additionalInfo?: string | null;
            quantityUnit?: string | null;
            tax?: string;
            priceGross?: string;
            priceTax?: string;
            totalPriceTax?: string;
            kind?: string | null;
            invoicePositionId?: string | null;
            productId?: number;
            deleted?: boolean;
            discount?: string | null;
            discountPercent?: string | null;
            tax2?: string;
            exchangeRate?: string;
            accountingTaxKind?: string | null;
            code?: string | null;
            additionalFields?: {};
        }[]
            | undefined,
    ) {
        this._positions = value;
    }

    get priceGross(): string | null | undefined {
        return this._priceGross;
    }

    set priceGross(value: string | null | undefined) {
        this._priceGross = value;
    }

    get priceNet(): string | null | undefined {
        return this._priceNet;
    }

    set priceNet(value: string | null | undefined) {
        this._priceNet = value;
    }

    get priceTax(): string | null | undefined {
        return this._priceTax;
    }

    set priceTax(value: string | null | undefined) {
        this._priceTax = value;
    }

    get printTime(): Date | null | undefined {
        return this._printTime;
    }

    set printTime(value: Date | null | undefined) {
        this._printTime = value;
    }

    get productCache(): string | null | undefined {
        return this._productCache;
    }

    set productCache(value: string | null | undefined) {
        this._productCache = value;
    }

    get productId(): number | null | undefined {
        return this._productId;
    }

    set productId(value: number | null | undefined) {
        this._productId = value;
    }

    get productsMargin(): string | null | undefined {
        return this._productsMargin;
    }

    set productsMargin(value: string | null | undefined) {
        this._productsMargin = value;
    }

    get recipientCity(): string | null | undefined {
        return this._recipientCity;
    }

    set recipientCity(value: string | null | undefined) {
        this._recipientCity = value;
    }

    get recipientCountry(): string | null | undefined {
        return this._recipientCountry;
    }

    set recipientCountry(value: string | null | undefined) {
        this._recipientCountry = value;
    }

    get recipientEmail(): string | null | undefined {
        return this._recipientEmail;
    }

    set recipientEmail(value: string | null | undefined) {
        this._recipientEmail = value;
    }

    get recipientId(): null | undefined {
        return this._recipientId;
    }

    set recipientId(value: null | undefined) {
        this._recipientId = value;
    }

    get recipientName(): null | undefined {
        return this._recipientName;
    }

    set recipientName(value: null | undefined) {
        this._recipientName = value;
    }

    get recipientNote(): string | null | undefined {
        return this._recipientNote;
    }

    set recipientNote(value: string | null | undefined) {
        this._recipientNote = value;
    }

    get recipientPhone(): string | null | undefined {
        return this._recipientPhone;
    }

    set recipientPhone(value: string | null | undefined) {
        this._recipientPhone = value;
    }

    get recipientPostCode(): string | null | undefined {
        return this._recipientPostCode;
    }

    set recipientPostCode(value: string | null | undefined) {
        this._recipientPostCode = value;
    }

    get recipientStreet(): string | null | undefined {
        return this._recipientStreet;
    }

    set recipientStreet(value: string | null | undefined) {
        this._recipientStreet = value;
    }

    get recurringId(): null | undefined {
        return this._recurringId;
    }

    set recurringId(value: null | undefined) {
        this._recurringId = value;
    }

    get reverseCharge(): boolean | null | undefined {
        return this._reverseCharge;
    }

    set reverseCharge(value: boolean | null | undefined) {
        this._reverseCharge = value;
    }

    get salesCode(): string | null | undefined {
        return this._salesCode;
    }

    set salesCode(value: string | null | undefined) {
        this._salesCode = value;
    }

    get sellDate(): Date | null | undefined | string {
        return this._sellDate;
    }

    set sellDate(value: Date | null | undefined | string) {
        this._sellDate = convertStringToDate(value);
    }

    get sellDateKind(): Date | null | undefined | string {
        return this._sellDateKind;
    }

    set sellDateKind(value: Date | null | undefined | string) {
        this._sellDateKind = convertStringToDate(value);
    }

    get sellerBank(): string | null | undefined {
        return this._sellerBank;
    }

    set sellerBank(value: string | null | undefined) {
        this._sellerBank = value;
    }

    get sellerBankAccount(): string | null | undefined {
        return this._sellerBankAccount;
    }

    set sellerBankAccount(value: string | null | undefined) {
        this._sellerBankAccount = value;
    }

    get sellerBankAccountId(): null | undefined {
        return this._sellerBankAccountId;
    }

    set sellerBankAccountId(value: null | undefined) {
        this._sellerBankAccountId = value;
    }

    get sellerCity(): string | null | undefined {
        return this._sellerCity;
    }

    set sellerCity(value: string | null | undefined) {
        this._sellerCity = value;
    }

    get sellerCountry(): string | null | undefined {
        return this._sellerCountry;
    }

    set sellerCountry(value: string | null | undefined) {
        this._sellerCountry = value;
    }

    get sellerEmail(): string | null | undefined {
        return this._sellerEmail;
    }

    set sellerEmail(value: string | null | undefined) {
        this._sellerEmail = value;
    }

    get sellerFax(): string | null | undefined {
        return this._sellerFax;
    }

    set sellerFax(value: string | null | undefined) {
        this._sellerFax = value;
    }

    get sellerName(): string | null | undefined {
        return this._sellerName;
    }

    set sellerName(value: string | null | undefined) {
        this._sellerName = value;
    }

    get sellerPerson(): string | null | undefined {
        return this._sellerPerson;
    }

    set sellerPerson(value: string | null | undefined) {
        this._sellerPerson = value;
    }

    get sellerPhone(): string | null | undefined {
        return this._sellerPhone;
    }

    set sellerPhone(value: string | null | undefined) {
        this._sellerPhone = value;
    }

    get sellerPostCode(): string | null | undefined {
        return this._sellerPostCode;
    }

    set sellerPostCode(value: string | null | undefined) {
        this._sellerPostCode = value;
    }

    get sellerStreet(): string | null | undefined {
        return this._sellerStreet;
    }

    set sellerStreet(value: string | null | undefined) {
        this._sellerStreet = value;
    }

    get sellerTaxNo(): string | null | undefined {
        return this._sellerTaxNo;
    }

    set sellerTaxNo(value: string | null | undefined) {
        this._sellerTaxNo = value;
    }

    get sellerTaxNoKind(): "SIREN" | "Numéro TVA" | "CIF" | null | undefined {
        return this._sellerTaxNoKind;
    }

    set sellerTaxNoKind(value: "SIREN" | "Numéro TVA" | "CIF" | null | undefined) {
        this._sellerTaxNoKind = value;
    }

    get sellerWww(): string | null | undefined {
        return this._sellerWww;
    }

    set sellerWww(value: string | null | undefined) {
        this._sellerWww = value;
    }

    get sentTime(): Date | null | undefined {
        return this._sentTime;
    }

    set sentTime(value: Date | null | undefined) {
        this._sentTime = value;
    }

    get showAttachments(): boolean | null | undefined {
        return this._showAttachments;
    }

    set showAttachments(value: boolean | null | undefined) {
        this._showAttachments = value;
    }

    get showDiscount(): boolean | null | undefined {
        return this._showDiscount;
    }

    set showDiscount(value: boolean | null | undefined) {
        this._showDiscount = value;
    }

    get status(): "issued" | "sent" | "paid" | "partial" | "rejected" | "accepted" | null | undefined {
        return this._status;
    }

    set status(value: "issued" | "sent" | "paid" | "partial" | "rejected" | "accepted" | null | undefined) {
        this._status = value;
    }

    get tax2Visible(): null | undefined {
        return this._tax2Visible;
    }

    set tax2Visible(value: null | undefined) {
        this._tax2Visible = value;
    }

    get test(): boolean | null | undefined {
        return this._test;
    }

    set test(value: boolean | null | undefined) {
        this._test = value;
    }

    get title(): string | null | undefined {
        return this._title;
    }

    set title(value: string | null | undefined) {
        this._title = value;
    }

    get token(): string | null | undefined {
        return this._token;
    }

    set token(value: string | null | undefined) {
        this._token = value;
    }

    get transactionDate(): Date | null | undefined | string {
        return this._transactionDate;
    }

    set transactionDate(value: Date | null | undefined | string) {
        this._transactionDate = convertStringToDate(value);
    }

    get updatedAt(): string | null | undefined {
        return this._updatedAt;
    }

    set updatedAt(value: string | null | undefined) {
        this._updatedAt = value;
    }

    get useDeliveryAddress(): boolean | null | undefined {
        return this._useDeliveryAddress;
    }

    set useDeliveryAddress(value: boolean | null | undefined) {
        this._useDeliveryAddress = value;
    }

    get useIssuer(): boolean | null | undefined {
        return this._useIssuer;
    }

    set useIssuer(value: boolean | null | undefined) {
        this._useIssuer = value;
    }

    get useMoss(): boolean | null | undefined {
        return this._useMoss;
    }

    set useMoss(value: boolean | null | undefined) {
        this._useMoss = value;
    }

    get userId(): number | null | undefined {
        return this._userId;
    }

    set userId(value: number | null | undefined) {
        this._userId = value;
    }

    get viewUrl(): string | null | undefined {
        return this._viewUrl;
    }

    set viewUrl(value: string | null | undefined) {
        this._viewUrl = value;
    }

    get warehouseDocumentId(): null | undefined {
        return this._warehouseDocumentId;
    }

    set warehouseDocumentId(value: null | undefined) {
        this._warehouseDocumentId = value;
    }

    get warehouseId(): null | undefined {
        return this._warehouseId;
    }

    set warehouseId(value: null | undefined) {
        this._warehouseId = value;
    }
}
