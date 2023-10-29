export interface Client {
  id: string;
  email: string;
  phoneNumber: string;
  image: string;
  password: string;
  passwordConfirm: string;
  address: string;
  city: string;
  country: string;
  role:string;
  translation: [{language: string,firstName: string,lastName: string}]
}
