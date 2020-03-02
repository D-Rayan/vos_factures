import axios from "axios";
let isConnected = false
let testMode = false
const axiosInstance = axios.create({
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const addInterceptor = (baseURL: string, tokenAPI: string): void => {
    isConnected = true;
    axiosInstance.interceptors.request.use(config => {
        const newConfig = {
            ...config,
        };
        newConfig.url = baseURL + config.url;
        if (config.method === "get" || config.method === "delete") {
            const indexOfParamsIndicator = newConfig.url.indexOf("?");
            if (indexOfParamsIndicator === -1) {
                newConfig.url = newConfig.url.concat("?");
            }
            newConfig.url = newConfig.url.concat(`${indexOfParamsIndicator === -1 ? "" : "&"}api_token=${tokenAPI}`);
            if (testMode) {
                newConfig.url = newConfig.url.concat(`&test=true`);
            }
        } else {
            if (!config.data) {
                newConfig.data = {};
            }
            // eslint-disable-next-line @typescript-eslint/camelcase
            newConfig.data.api_token = tokenAPI;
            if (testMode) {
                newConfig.data.test = true;
            }
        }
        return newConfig;
    });
};

const enableTest = (): void => {
    testMode = true;
};

const disableTest = (): void => {
    testMode = false;
};

export { axiosInstance as instance, addInterceptor, isConnected, enableTest, disableTest };
