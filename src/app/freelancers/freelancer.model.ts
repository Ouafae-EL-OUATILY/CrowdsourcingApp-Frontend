export interface Freelancer {
  _id: string;
  email: string;
  phoneNumber: string;
  image: string;
  password: string;
  address: string;
  city: string;
  hourlyRate: number,
  country: string;
  role:string;
  translations: [{language: string,firstName: string,lastName: string,expertise: string,bio: string}]


}
