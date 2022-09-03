import { memo } from 'react';

interface ProductItemProps {
  product: { id: number; price: number; title: string; formattedPrice: string };
  handleAddToWishList: (id: number) => Promise<void>;
}

function ProductItemComponent({
  product,
  handleAddToWishList,
}: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.formattedPrice}</strong>
      <button onClick={() => handleAddToWishList(product.id)}>
        Adicionar a lista de favoritos
      </button>
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
