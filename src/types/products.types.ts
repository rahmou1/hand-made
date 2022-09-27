type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  qty: number;
  picture: string;
  time_number: number;
  time_type: string;
  reviewed: boolean;
  review_comment: string;
  approved: boolean;
  artists_id: number;
  categories_id: number;
};

export default Product;
