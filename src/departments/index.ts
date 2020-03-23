/* eslint-disable @typescript-eslint/camelcase */
import * as axiosInstance from "../axiosInstance";
import {camelizeObject, unCamelizeObject} from "../helpers";

const axios = axiosInstance.instance;

export interface InterfaceDepartments {
    id?: string | undefined;
    name?: string;
    shortcut?: string;
    kind?: "SARL" | string;
    main?: boolean;
    tax_no_kind?: "TVA" | "SIREN" | string;
    tax_no? : string;
    post_code? : string;
    city?: string;
    street?: string;
    country?: string;
    person?: string;
    email?: string;
    phone?: string;
    mobile_phone?: string;
    www?: string;
    fax?: string;
    bank?: string;
    bank_account?: string;
    bank_swift?: string;
    bank_account_currency?: "EUR" | string;
    bank_accountancy_account? : string;
    invoice_lang? : "fr" | "en" | "en/fr" |  "fr/en" | string;
    invoice_description? : string;
    default_tax?: "20" | "disabled" | "10" | "15" | string;
    invoice_template_id? : number;
    cash_init_state? : string;
    footer_content? : string;
    use_pattern? : boolean;
    invoice_pattern?:"Fyyyy.mm.nr" | string;
    pattern_estimate?:"FA-yymm-nr-m" | string;
    own_email_settings? : boolean;
    email_from?:"" | string;
    email_cc?:"" | string;
    email_subject?:"" | string;
    email_template?:null | string;
    email_template_kind?:"default" | string;
    email_pdf?:true | string;
    own_overdue_email_settings?: boolean;
    overdue_email_subject?:"" | string;
    overdue_email_template?:null | string;
    overdue_email_template_kind?:"default" | string;
    overdue_email_pdf?:boolean;
    restrict_warehouses? :boolean;
    warehouse_id? : null | string;
}

export interface ParamsSearchDepartment extends InterfaceDepartments {
    page?: number;
    perPage?: number;
}

export class Department implements InterfaceDepartments {
    static async findById(invoiceId: number): Promise<Department> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.get(`/departments/${invoiceId}.json`);
        return new Department(camelizeObject(result.data));
    }

    static async findBy(params: ParamsSearchDepartment): Promise<Department[]> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        let query = "";

        if (params.page) query = `${query}page=${params.page}&`;
        if (params.perPage) query = `${query}per_page=${params.perPage}&`;
        const result = await axios.get(`/departments.json?${query}`);
        const results: Department[] = [];
        for (const dataDepartment of result.data) {
            results.push(new Department(camelizeObject(dataDepartment)));
        }
        return results;
    }

    static async findAll(params?: ParamsSearchDepartment): Promise<Department[]> {
        const results: Department[] = [];
        let page = 1;
        let departmentToLoad;
        do {
            departmentToLoad = false;
            const tmp = await this.findBy({
                ...(params || {}),
                page,
                perPage: 100,
            });
            if (tmp.length > 0) {
                results.push(...tmp);
                departmentToLoad = true;
            }
            page++;
        } while (departmentToLoad);
        return results;
    }

    async save(): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.post("/departments.json", {
            department: this.toParams(),
        });
        this.setValue(camelizeObject(result.data));
    }

    async update(): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        const result = await axios.put(`/departments/${this._id}.json`, {
            department: this.toParams(),
        });
        this.setValue(camelizeObject(result.data));
    }

    async remove(departmentId?: number): Promise<void> {
        if (!axiosInstance.isConnected) throw new Error("No credentials");
        if (!departmentId && !this._id) throw new Error("Method invalid argument");
        await axios.delete(`/departments/${departmentId || this._id}.json`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toParams(): Record<string, any> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: Record<string, any> = {};
        if (this.id) params["id"] = this.id;
        if (this.name) params["name"] = this.name;
        if (this.shortcut) params["shortcut"] = this.shortcut;
        if (this.kind) params["kind"] = this.kind;
        if (this.main) params["main"] = this.main;
        if (this.tax_no_kind) params["tax_no_kind"] = this.tax_no_kind;
        if (this.tax_no) params["tax_no"] = this.tax_no;
        if (this.post_code) params["post_code"] = this.post_code;
        if (this.city) params["city"] = this.city;
        if (this.street) params["street"] = this.street;
        if (this.country) params["country"] = this.country;
        if (this.person) params["person"] = this.person;
        if (this.email) params["email"] = this.email;
        if (this.phone) params["phone"] = this.phone;
        if (this.mobile_phone) params["mobile_phone"] = this.mobile_phone;
        if (this.www) params["www"] = this.www;
        if (this.fax) params["fax"] = this.fax;
        if (this.bank) params["bank"] = this.bank;
        if (this.bank_account) params["bank_account"] = this.bank_account;
        if (this.bank_swift) params["bank_swift"] = this.bank_swift;
        if (this.bank_account_currency) params["bank_account_currency"] = this.bank_account_currency;
        if (this.bank_accountancy_account) params["bank_accountancy_account"] = this.bank_accountancy_account;
        if (this.invoice_lang) params["invoice_lang"] = this.invoice_lang;
        if (this.invoice_description) params["invoice_description"] = this.invoice_description;
        if (this.default_tax) params["default_tax"] = this.default_tax;
        if (this.invoice_template_id) params["invoice_template_id"] = this.invoice_template_id;
        if (this.cash_init_state) params["cash_init_state"] = this.cash_init_state;
        if (this.footer_content) params["footer_content"] = this.footer_content;
        if (this.use_pattern) params["use_pattern"] = this.use_pattern;
        if (this.invoice_pattern) params["invoice_pattern"] = this.invoice_pattern;
        if (this.pattern_estimate) params["pattern_estimate"] = this.pattern_estimate;
        if (this.own_email_settings) params["own_email_settings"] = this.own_email_settings;
        if (this.email_from) params["email_from"] = this.email_from;
        if (this.email_cc) params["email_cc"] = this.email_cc;
        if (this.email_subject) params["email_subject"] = this.email_subject;
        if (this.email_template) params["email_template"] = this.email_template;
        if (this.email_template_kind) params["email_template_kind"] = this.email_template_kind;
        if (this.email_pdf) params["email_pdf"] = this.email_pdf;
        if (this.own_overdue_email_settings) params["own_overdue_email_settings"] = this.own_overdue_email_settings;
        if (this.overdue_email_subject) params["overdue_email_subject"] = this.overdue_email_subject;
        if (this.overdue_email_template) params["overdue_email_template"] = this.overdue_email_template;
        if (this.overdue_email_template_kind) params["overdue_email_template_kind"] = this.overdue_email_template_kind;
        if (this.overdue_email_pdf) params["overdue_email_pdf"] = this.overdue_email_pdf;
        if (this.restrict_warehouses) params["restrict_warehouses"] = this.restrict_warehouses;
        if (this.warehouse_id) params["warehouse_id"] = this.warehouse_id;

        return unCamelizeObject(params);
    }

    constructor(data?: InterfaceDepartments) {
        this.setValue(data || {});
    }

    setValue(data: InterfaceDepartments): void {
        this.id = data.id || "";
        this.name = data.name || "";
        this.shortcut = data.shortcut || "";
        this.kind = data.kind || "";
        this.main = data.main || false;
        this.tax_no_kind = data.tax_no_kind || "";
        this.tax_no = data.tax_no || "";
        this.post_code = data.post_code || "";
        this.city = data.city || "";
        this.street = data.street || "";
        this.country = data.country || "";
        this.person = data.person || "";
        this.email = data.email || "";
        this.phone = data.phone || "";
        this.mobile_phone = data.mobile_phone || "";
        this.www = data.www || "";
        this.fax = data.fax || "";
        this.bank = data.bank || "";
        this.bank_account = data.bank_account || "";
        this.bank_swift = data.bank_swift || "";
        this.bank_account_currency = data.bank_account_currency || "";
        this.bank_accountancy_account = data.bank_accountancy_account || "";
        this.invoice_lang = data.invoice_lang || "";
        this.invoice_description = data.invoice_description || "";
        this.default_tax = data.default_tax || "";
        this.invoice_template_id = data.invoice_template_id || 0;
        this.cash_init_state = data.cash_init_state || "";
        this.footer_content = data.footer_content || "";
        this.use_pattern = data.use_pattern || false;
        this.invoice_pattern = data.invoice_pattern || "";
        this.pattern_estimate = data.pattern_estimate || "";
        this.own_email_settings = data.own_email_settings || false;
        this.email_from = data.email_from || "";
        this.email_cc = data.email_cc || "";
        this.email_subject = data.email_subject || "";
        this.email_template = data.email_template || "";
        this.email_template_kind = data.email_template_kind || "";
        this.email_pdf = data.email_pdf || "";
        this.own_overdue_email_settings = data.own_overdue_email_settings || false;
        this.overdue_email_subject = data.overdue_email_subject || "";
        this.overdue_email_template = data.overdue_email_template || "";
        this.overdue_email_template_kind = data.overdue_email_template_kind || "";
        this.overdue_email_pdf = data.overdue_email_pdf || false;
        this.restrict_warehouses = data.restrict_warehouses || false;
        this.warehouse_id = data.warehouse_id || "";
    }

    private _bank: string = "";
    private _bank_account: string = "";
    private _bank_account_currency: "EUR" | string = "";
    private _bank_accountancy_account: string = "";
    private _bank_swift: string = "";
    private _cash_init_state: string = "";
    private _city: string = "";
    private _country: string = "";
    private _default_tax: "20" | "disabled" | "10" | "15" | string = "";
    private _email: string = "";
    private _email_cc: "" | string = "";
    private _email_from: "" | string = "";
    private _email_pdf: true | string = "";
    private _email_subject: "" | string = "";
    private _email_template: string | null = "";
    private _email_template_kind: "default" | string = "";
    private _fax: string = "";
    private _footer_content: string = "";
    private _invoice_description: string = "";
    private _invoice_lang: "fr" | "en" | "en/fr" | "fr/en" | string = "";
    private _invoice_pattern: "Fyyyy.mm.nr" | string = "";
    private _invoice_template_id: number = 0;
    private _kind: "SARL" | string = "";
    private _main: boolean = false;
    private _mobile_phone: string = "";
    private _name: string = "";
    private _overdue_email_pdf: boolean = false;
    private _overdue_email_subject: "" | string = "";
    private _overdue_email_template: string | null = "";
    private _overdue_email_template_kind: "default" | string = "";
    private _own_email_settings: boolean = false;
    private _own_overdue_email_settings: boolean = false;
    private _pattern_estimate: "FA-yymm-nr-m" | string = "";
    private _person: string = "";
    private _phone: string = "";
    private _post_code: string = "";
    private _restrict_warehouses: boolean = false;
    private _shortcut: string = "";
    private _street: string = "";
    private _tax_no: string = "";
    private _tax_no_kind: "TVA" | "SIREN" | string = "";
    private _use_pattern: boolean = false;
    private _warehouse_id: string | null = "";
    private _www: string = "";
    private _id: string | undefined;


    get id(): string | undefined {
        return this._id;
    }

    set id(value: string | undefined) {
        this._id = value;
    }

    get bank(): string {
        return this._bank;
    }

    set bank(value: string) {
        this._bank = value;
    }

    get bank_account(): string {
        return this._bank_account;
    }

    set bank_account(value: string) {
        this._bank_account = value;
    }

    get bank_account_currency(): "EUR" | string {
        return this._bank_account_currency;
    }

    set bank_account_currency(value: "EUR" | string) {
        this._bank_account_currency = value;
    }

    get bank_accountancy_account(): string {
        return this._bank_accountancy_account;
    }

    set bank_accountancy_account(value: string) {
        this._bank_accountancy_account = value;
    }

    get bank_swift(): string {
        return this._bank_swift;
    }

    set bank_swift(value: string) {
        this._bank_swift = value;
    }

    get cash_init_state(): string {
        return this._cash_init_state;
    }

    set cash_init_state(value: string) {
        this._cash_init_state = value;
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

    get default_tax(): "20" | "disabled" | "10" | "15" | string {
        return this._default_tax;
    }

    set default_tax(value: "20" | "disabled" | "10" | "15" | string) {
        this._default_tax = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get email_cc(): "" | string {
        return this._email_cc;
    }

    set email_cc(value: "" | string) {
        this._email_cc = value;
    }

    get email_from(): "" | string {
        return this._email_from;
    }

    set email_from(value: "" | string) {
        this._email_from = value;
    }

    get email_pdf(): true | string {
        return this._email_pdf;
    }

    set email_pdf(value: true | string) {
        this._email_pdf = value;
    }

    get email_subject(): "" | string {
        return this._email_subject;
    }

    set email_subject(value: "" | string) {
        this._email_subject = value;
    }

    get email_template(): string | null {
        return this._email_template;
    }

    set email_template(value: string | null) {
        this._email_template = value;
    }

    get email_template_kind(): "default" | string {
        return this._email_template_kind;
    }

    set email_template_kind(value: "default" | string) {
        this._email_template_kind = value;
    }

    get fax(): string {
        return this._fax;
    }

    set fax(value: string) {
        this._fax = value;
    }

    get footer_content(): string {
        return this._footer_content;
    }

    set footer_content(value: string) {
        this._footer_content = value;
    }

    get invoice_description(): string {
        return this._invoice_description;
    }

    set invoice_description(value: string) {
        this._invoice_description = value;
    }

    get invoice_lang(): "fr" | "en" | "en/fr" | "fr/en" | string {
        return this._invoice_lang;
    }

    set invoice_lang(value: "fr" | "en" | "en/fr" | "fr/en" | string) {
        this._invoice_lang = value;
    }

    get invoice_pattern(): "Fyyyy.mm.nr" | string {
        return this._invoice_pattern;
    }

    set invoice_pattern(value: "Fyyyy.mm.nr" | string) {
        this._invoice_pattern = value;
    }

    get invoice_template_id(): number {
        return this._invoice_template_id;
    }

    set invoice_template_id(value: number) {
        this._invoice_template_id = value;
    }

    get kind(): "SARL" | string {
        return this._kind;
    }

    set kind(value: "SARL" | string) {
        this._kind = value;
    }

    get main(): boolean {
        return this._main;
    }

    set main(value: boolean) {
        this._main = value;
    }

    get mobile_phone(): string {
        return this._mobile_phone;
    }

    set mobile_phone(value: string) {
        this._mobile_phone = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get overdue_email_pdf(): boolean {
        return this._overdue_email_pdf;
    }

    set overdue_email_pdf(value: boolean) {
        this._overdue_email_pdf = value;
    }

    get overdue_email_subject(): "" | string {
        return this._overdue_email_subject;
    }

    set overdue_email_subject(value: "" | string) {
        this._overdue_email_subject = value;
    }

    get overdue_email_template(): string | null {
        return this._overdue_email_template;
    }

    set overdue_email_template(value: string | null) {
        this._overdue_email_template = value;
    }

    get overdue_email_template_kind(): "default" | string {
        return this._overdue_email_template_kind;
    }

    set overdue_email_template_kind(value: "default" | string) {
        this._overdue_email_template_kind = value;
    }

    get own_email_settings(): boolean {
        return this._own_email_settings;
    }

    set own_email_settings(value: boolean) {
        this._own_email_settings = value;
    }

    get own_overdue_email_settings(): boolean {
        return this._own_overdue_email_settings;
    }

    set own_overdue_email_settings(value: boolean) {
        this._own_overdue_email_settings = value;
    }

    get pattern_estimate(): "FA-yymm-nr-m" | string {
        return this._pattern_estimate;
    }

    set pattern_estimate(value: "FA-yymm-nr-m" | string) {
        this._pattern_estimate = value;
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

    get post_code(): string {
        return this._post_code;
    }

    set post_code(value: string) {
        this._post_code = value;
    }

    get restrict_warehouses(): boolean {
        return this._restrict_warehouses;
    }

    set restrict_warehouses(value: boolean) {
        this._restrict_warehouses = value;
    }

    get shortcut(): string {
        return this._shortcut;
    }

    set shortcut(value: string) {
        this._shortcut = value;
    }

    get street(): string {
        return this._street;
    }

    set street(value: string) {
        this._street = value;
    }

    get tax_no(): string {
        return this._tax_no;
    }

    set tax_no(value: string) {
        this._tax_no = value;
    }

    get tax_no_kind(): "TVA" | "SIREN" | string {
        return this._tax_no_kind;
    }

    set tax_no_kind(value: "TVA" | "SIREN" | string) {
        this._tax_no_kind = value;
    }

    get use_pattern(): boolean {
        return this._use_pattern;
    }

    set use_pattern(value: boolean) {
        this._use_pattern = value;
    }

    get warehouse_id(): string | null {
        return this._warehouse_id;
    }

    set warehouse_id(value: string | null) {
        this._warehouse_id = value;
    }

    get www(): string {
        return this._www;
    }

    set www(value: string) {
        this._www = value;
    }
}
