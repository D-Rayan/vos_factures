import * as axiosInstance from "../axiosInstance";
import { Invoice } from "../invoices";
import { camelizeObject } from "../helpers";

const axios = axiosInstance.instance;

export interface InterfaceClient {
    id?: string;
    name?: string;
    taxNo?: string;
    bank?: string;
    bankAccount?: string;
    city?: string;
    country?: string;
    email?: string;
    person?: string;
    postCode?: string;
    phone?: string;
    mobilePhone?: string;
    street?: string;
    note?: string;
    paymentToKind?: string;
    accountingId?: string;
    accountingId2?: string;
    chorusIdentifierType?: 1 | 2 | 3 | 4 | 5 | 6 | "";
    chorusIdentifier?: string;
    chorusServiceCode?: string;
}

export interface ParamsSearchClient extends InterfaceClient {
    page?: number;
    perPage?: number;
}

export class Client implements InterfaceClient {
    static async findById(clientId: number): Promise<Client> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.get(`/clients/${clientId}.json`);
        return new Client(camelizeObject(result.data));
    }

    static async findBy(params: ParamsSearchClient): Promise<Client[]> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        let query = "";
        if (params.id) query = `${query}id=${params.id}&`;
        if (params.name) query = `${query}name=${params.name}&`;
        if (params.taxNo) query = `${query}tax_no=${params.taxNo}&`;
        if (params.bank) query = `${query}bank=${params.bank}&`;
        if (params.bankAccount) query = `${query}bank_account=${params.bankAccount}&`;
        if (params.city) query = `${query}city=${params.city}&`;
        if (params.country) query = `${query}country=${params.country}&`;
        if (params.email) query = `${query}email=${params.email}&`;
        if (params.person) query = `${query}person=${params.person}&`;
        if (params.postCode) query = `${query}post_code=${params.postCode}&`;
        if (params.phone) query = `${query}phone=${params.phone}&`;
        if (params.mobilePhone) query = `${query}mobile_phone=${params.mobilePhone}&`;
        if (params.street) query = `${query}street=${params.street}&`;
        if (params.note) query = `${query}note=${params.note}&`;
        if (params.paymentToKind) query = `${query}payment_to_kind=${params.paymentToKind}&`;
        if (params.accountingId) query = `${query}accounting_id=${params.accountingId}&`;
        if (params.accountingId2) query = `${query}accounting_id2=${params.accountingId2}&`;
        if (params.chorusIdentifierType) query = `${query}chorus_identifier_type=${params.chorusIdentifierType}&`;
        if (params.chorusIdentifier) query = `${query}chorus_identifier=${params.chorusIdentifier}&`;
        if (params.chorusServiceCode) query = `${query}chorus_service_code=${params.chorusServiceCode}&`;
        if (params.page) query = `${query}page=${params.page}&`;
        if (params.perPage) query = `${query}per_page=${params.perPage}&`;
        const result = await axios.get(`/clients.json?${query}`);
        const results: Client[] = [];
        for (const dataClient of result.data) {
            results.push(new Client(camelizeObject(dataClient)));
        }
        return results;
    }

    static async findAll(params?: ParamsSearchClient): Promise<Client[]> {
        const results: Client[] = [];
        let page = 1;
        let contactToLoad;
        do {
            contactToLoad = false;
            const tmp = await this.findBy({
                ...(params || {}),
                page,
                perPage: 100,
            });
            if (tmp.length > 0) {
                results.push(...tmp);
                contactToLoad = true;
            }
            page++;
        } while (contactToLoad);
        return results;
    }

    async save(): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.post("/clients.json", {
            client: this.toParams(),
        });
        this.setValue(camelizeObject(result.data));
    }

    async update(): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.put(`/clients/${this.id}.json`, {
            client: this.toParams(),
        });
        this.setValue(camelizeObject(result.data));
    }

    async remove(clientId?: number): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        if (!clientId && !this.id) throw new Error("Method invalid argument");
        await axios.delete(`/clients/${clientId || this.id}.json`);
    }

    async getInvoices(): Promise<Invoice[]> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        if (!this.id) throw new Error("Method invalid argument");
        return await Invoice.findBy({ clientId: +this.id });
    }

    toParams(): {} {
        return {
            id: this.id,
            name: this.name,
            // eslint-disable-next-line @typescript-eslint/camelcase
            tax_no: this.taxNo,
            bank: this.bank,
            // eslint-disable-next-line @typescript-eslint/camelcase
            bank_account: this.bankAccount,
            city: this.city,
            country: this.country,
            email: this.email,
            person: this.person,
            // eslint-disable-next-line @typescript-eslint/camelcase
            post_code: this.postCode,
            phone: this.phone,
            // eslint-disable-next-line @typescript-eslint/camelcase
            mobile_phone: this.mobilePhone,
            street: this.street,
            note: this.note,
            // eslint-disable-next-line @typescript-eslint/camelcase
            payment_to_kind: this.paymentToKind,
            // eslint-disable-next-line @typescript-eslint/camelcase
            accounting_id: this.accountingId,
            // eslint-disable-next-line @typescript-eslint/camelcase
            accounting_id2: this.accountingId2,
            // eslint-disable-next-line @typescript-eslint/camelcase
            chorus_identifier_type: this.chorusIdentifierType,
            // eslint-disable-next-line @typescript-eslint/camelcase
            chorus_identifier: this.chorusIdentifier,
            // eslint-disable-next-line @typescript-eslint/camelcase
            chorus_service_code: this.chorusServiceCode,
        };
    }

    constructor(data?: InterfaceClient) {
        this.setValue(data || {});
    }

    setValue(data: InterfaceClient): void {
        this.id = data.id || "";
        this.name = data.name || "";
        this.taxNo = data.taxNo || "";
        this.bank = data.bank || "";
        this.bankAccount = data.bankAccount || "";
        this.city = data.city || "";
        this.country = data.country || "";
        this.email = data.email || "";
        this.person = data.person || "";
        this.postCode = data.postCode || "";
        this.phone = data.phone || "";
        this.mobilePhone = data.mobilePhone || "";
        this.street = data.street || "";
        this.note = data.note || "";
        this.paymentToKind = data.paymentToKind || "";
        this.accountingId = data.accountingId || "";
        this.accountingId2 = data.accountingId2 || "";
        this.chorusIdentifierType = data.chorusIdentifierType || "";
        this.chorusIdentifier = data.chorusIdentifier || "";
        this.chorusServiceCode = data.chorusServiceCode || "";
    }

    private _accountingId = "";
    private _accountingId2 = "";
    private _bank = "";
    private _bankAccount = "";
    private _chorusIdentifier = "";
    private _chorusIdentifierType: 1 | 2 | 3 | 4 | 5 | 6 | "" = "";
    private _chorusServiceCode = "";
    private _city = "";
    private _country = "";
    private _email = "";
    private _id = "";
    private _mobilePhone = "";
    private _name = "";
    private _note = "";
    private _paymentToKind = "";
    private _person = "";
    private _phone = "";
    private _postCode = "";
    private _street = "";
    private _taxNo = "";

    get accountingId(): string {
        return this._accountingId;
    }

    set accountingId(value: string) {
        this._accountingId = value;
    }

    get accountingId2(): string {
        return this._accountingId2;
    }

    set accountingId2(value: string) {
        this._accountingId2 = value;
    }

    get bank(): string {
        return this._bank;
    }

    set bank(value: string) {
        this._bank = value;
    }

    get bankAccount(): string {
        return this._bankAccount;
    }

    set bankAccount(value: string) {
        this._bankAccount = value;
    }

    get chorusIdentifier(): string {
        return this._chorusIdentifier;
    }

    set chorusIdentifier(value: string) {
        this._chorusIdentifier = value;
    }

    get chorusIdentifierType(): 1 | 2 | 3 | 4 | 5 | 6 | "" {
        return this._chorusIdentifierType;
    }

    set chorusIdentifierType(value: 1 | 2 | 3 | 4 | 5 | 6 | "") {
        this._chorusIdentifierType = value;
    }

    get chorusServiceCode(): string {
        return this._chorusServiceCode;
    }

    set chorusServiceCode(value: string) {
        this._chorusServiceCode = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get mobilePhone(): string {
        return this._mobilePhone;
    }

    set mobilePhone(value: string) {
        this._mobilePhone = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get note(): string {
        return this._note;
    }

    set note(value: string) {
        this._note = value;
    }

    get paymentToKind(): string {
        return this._paymentToKind;
    }

    set paymentToKind(value: string) {
        this._paymentToKind = value;
    }

    get person(): string {
        return this._person;
    }

    set person(value: string) {
        this._person = value;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }

    get postCode(): string {
        return this._postCode;
    }

    set postCode(value: string) {
        this._postCode = value;
    }

    get street(): string {
        return this._street;
    }

    set street(value: string) {
        this._street = value;
    }

    get taxNo(): string {
        return this._taxNo;
    }

    set taxNo(value: string) {
        this._taxNo = value;
    }
}
