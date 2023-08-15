export interface SushiReview {
  star: number;
  contents: string;
}

export interface SushiMenu {
  name: string;
  price: number;
}

export interface Sushi {
  name: string;
  location: string;
  phone: string;
  starsAvg: number;
  reviews: SushiReview[];
  menus: SushiMenu[];
}

export default Sushi;
