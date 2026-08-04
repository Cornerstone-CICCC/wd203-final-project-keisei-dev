/** A menu item exactly as it arrives in products.json. */
export type Product = {
  id: number;
  name: string;
  desc: string;
  photo: string;
  /** The feed stores prices as strings, so convert before doing any maths. */
  price: string;
};

/** A menu item once it is in the cart, with the price already parsed. */
export type CartItem = {
  id: number;
  name: string;
  photo: string;
  price: number;
  quantity: number;
};
