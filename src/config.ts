interface EcwidConfig {
  storeId: string;
  apiToken: string;
  apiUrl: string;
}

interface AppConfig {
  ecwid: EcwidConfig;
}

export const config: AppConfig = {
  ecwid: {
    storeId: import.meta.env.VITE_ECWID_STORE_ID as string,
    apiToken: import.meta.env.VITE_ECWID_API_TOKEN as string,
    apiUrl: import.meta.env.VITE_ECWID_API_URL as string,
  },
};
