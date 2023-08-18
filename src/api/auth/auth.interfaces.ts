export interface User {
  email: string;
  password: string;
  name: string;
  location: string;
  age: number;

  bookmarks: string[];
  reviews: string[];
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface SignupBody {
  email: string;
  password: string;
  name: string;
  location: string;
  age: number;
}

export default User;
