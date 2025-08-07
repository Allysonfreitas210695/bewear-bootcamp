import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeCartProduct } from "@/actions/remove-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getRemoveProductFromCartMutationKey = (cartItemId: string) =>
  ["remove-cart-product", cartItemId] as const;

export const useRemoveProductFromCart = (cartItemId: string) => {
  const queryClent = useQueryClient();
  return useMutation({
    mutationKey: getRemoveProductFromCartMutationKey(cartItemId),
    mutationFn: () => removeCartProduct({ cartItemId }),
    onSuccess: () => {
      queryClent.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },
  });
};
