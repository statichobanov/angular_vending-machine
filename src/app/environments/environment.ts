interface IEnvironment {
  apiUrl: string;
  production: boolean;
  name: string;
}

export const environment: IEnvironment = {
  apiUrl: 'http://localhost:3000',
  name: 'dev',
  production: false,
};
