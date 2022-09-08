import { memo, useState } from 'react';
import { AddProductToWishListProps } from './AddProductToWishList';

import dynamic from 'next/dynamic';

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => {
    return import('./AddProductToWishList').then(
      (mod) => mod.AddProductToWishList
    );
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: { id: number; price: number; title: string; formattedPrice: string };
  handleAddToWishList: (id: number) => Promise<void>;
}

function ProductItemComponent({
  product,
  handleAddToWishList,
}: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.formattedPrice}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar a lista de favoritos
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => handleAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
