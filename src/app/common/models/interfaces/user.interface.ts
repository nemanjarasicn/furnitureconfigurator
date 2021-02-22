export interface User {
  first_name: string;
  last_name: string;
  title: string;
  salutation: string;
  email_address: string;
  address?: string;
  phone_number?: string;
  password?: string;
  password2?: string;
}
