
export interface User {
  id?: number,
  firstname: string;
  lastname: string;
  email: string;
  description?: string;
  active?: boolean;
  password?: string;
  roles?: string[];
}
