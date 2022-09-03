import { useMemo } from 'react';
import { ProductItem } from './ProductItem';

interface Product {
  id: number;
  price: number;
  title: string;
  formattedPrice: string;
}

interface SearchResultsProps {
  results: Product[];
  totalPrice: number;
  handleAddToWishList: (id: number) => Promise<void>;
}

export function SearchResults({
  results,
  handleAddToWishList,
  totalPrice,
}: SearchResultsProps) {
  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            handleAddToWishList={handleAddToWishList}
          />
        );
      })}
    </div>
  );
}
