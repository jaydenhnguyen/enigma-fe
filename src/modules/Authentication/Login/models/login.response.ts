export type LoginResponse = {
  accessToken: string;
  expireIn: number;
  data: {
    firstName: string;
    lastName: string;
  };
};
