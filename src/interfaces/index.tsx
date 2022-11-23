export interface TableData {
  country: string;
  domains: string[];
  web_pages: string[];
  alpha_two_code: string;
  name: string;
  "state-province": null;
}

export interface ReduxState {
  loading: boolean;
  data: TableData[];
  error: string;
  success: string;
}
