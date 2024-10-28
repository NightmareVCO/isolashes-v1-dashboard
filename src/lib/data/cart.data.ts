import { fetchGetRequest } from "@utils/fetchRequest";
import { fetchPostRequest } from "@utils/fetchRequest";
import { fetchPatchRequest } from "@utils/fetchRequest";
import { fetchDeleteRequest } from "@utils/fetchRequest";

export const ENDPOINT = "shopping-cart";

export const createShoppingCart = async (userId: string) => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchPostRequest({ url, headers, data: { userId } });
};

export const getShoppingCart = async (userId: string) => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchGetRequest({ url, headers });
};

export const getMyShoppingCart = async (userId: string, cartId: string) => {
  const endpoint = `${ENDPOINT}/${cartId}`;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchGetRequest({ url, headers });
};

type AddProductToShoppingCart = {
  userId: string;
  cartId: string;
  productId: string;
  quantity: number;
};

export const addProductToShoppingCart = async ({
  userId,
  cartId,
  productId,
  quantity,
}: AddProductToShoppingCart) => {
  const endpoint = `${ENDPOINT}/${cartId}/add-product`;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchPostRequest({
    url,
    headers,
    data: { userId, productId, quantity },
  });
};

type UpdateProductInShoppingCart = {
  userId: string;
  cartItemId: string;
  quantity: number;
};

export const updateProductInShoppingCart = async ({
  userId,
  cartItemId,
  quantity,
}: UpdateProductInShoppingCart) => {
  const endpoint = `${ENDPOINT}/${cartItemId}/update-product`;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchPatchRequest({ url, headers, data: { quantity } });
};

export const getProductsFromShoppingCart = async (
  userId: string,
  cartId: string,
) => {
  const endpoint = `${ENDPOINT}/${cartId}/get-products`;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchGetRequest({ url, headers });
};

export const getTotalPriceFromShoppingCart = async (
  userId: string,
  cartId: string,
) => {
  const endpoint = `${ENDPOINT}/${cartId}/total-price`;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchGetRequest({ url, headers });
};

export const getTotalItemsFromShoppingCart = async (
  userId: string,
  cartId: string,
) => {
  const endpoint = `${ENDPOINT}/${cartId}/total-items`;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchGetRequest({ url, headers });
};

export const getTotalItemsAndPriceFromShoppingCart = async (
  userId: string,
  cartId: string,
) => {
  const endpoint = `${ENDPOINT}/${cartId}/total-items-and-price`;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchGetRequest({ url, headers });
};

export const getTotalPricePerItemFromShoppingCart = async (
  userId: string,
  cartId: string,
) => {
  const endpoint = `${ENDPOINT}/${cartId}/total-price-per-item`;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchGetRequest({ url, headers });
};

export const getTotalPricePerItemAndTotalPriceFromShoppingCart = async (
  userId: string,
  cartId: string,
) => {
  const endpoint = `${ENDPOINT}/${cartId}/total-price-per-item-and-total-price`;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchGetRequest({ url, headers });
};

export const removeProductFromShoppingCart = async (
  userId: string,
  shoppingCartId: string,
  cartItemId: string,
) => {
  const endpoint = `${ENDPOINT}/${shoppingCartId}/remove-product/${cartItemId}`;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchDeleteRequest({ url, headers });
};

export const clearShoppingCart = async (userId: string, cartId: string) => {
  const endpoint = `${ENDPOINT}/${cartId}/clear-cart`;
  const url = `${process.env.SERVER}/${endpoint}`;
  const headers = { "user-id": userId };
  return await fetchDeleteRequest({ url, headers });
};
