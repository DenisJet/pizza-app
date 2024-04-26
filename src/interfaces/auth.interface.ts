export interface LoginResponse {
  token: string;
  data: {
    id: number;
    email: string;
    name: string;
  };
}
