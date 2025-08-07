import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getDecreaseCartProductQuantityKey = (cartItemId: string) =>
  ["decrease-cart-product-quantity", cartItemId] as const;

export const useDecreaseCartProductQuantity = (cartItemId: string) => {
  const queryClent = useQueryClient();

  return useMutation({
    mutationKey: getDecreaseCartProductQuantityKey(cartItemId),
    mutationFn: () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClent.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },
  });
};
