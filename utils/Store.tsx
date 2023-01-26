import { createContext, useReducer } from "react";
import { ProductDataType } from "./data";
import Cookies from "js-cookie";
export const Store = createContext({} as any);

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart")!)
    : { cartItems: [], shippingAddress: {} },
};

interface ICart {
  cartItems: ProductDataType[];
  shippingAddress?: {};
}

interface IAction {
  type: string;
  payload: CartProductDataType;
}

interface IState {
  cart: ICart;
}

export type CartProductDataType = {
  _id: string;
  name: string;
  slug: string;
  category: string[];
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  qty: number;
};

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: ProductDataType) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: ProductDataType) =>
            item.slug === existItem.slug ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_RESET":
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };

    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };

    case "CART_CLEAR_ITEMS":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
        },
      };

    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatchStore] = useReducer(reducer, initialState);
  const value = { state, dispatchStore };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
