import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getIncreaseCartProductQuantityKey = (productVariantId: string) =>
  ["increase-cart-product-quantity", productVariantId] as const;

export const useIncreaseCartProductQuantity = (productVariantId: string) => {
  const queryClent = useQueryClient();
  return useMutation({
    mutationKey: getIncreaseCartProductQuantityKey(productVariantId),
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClent.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },
  });
};
