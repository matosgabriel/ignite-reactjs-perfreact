import { useMemo } from 'react';
import { ProductItem } from './ProductItem';

interface Product {
  id: number;
  price: number;
  title: string;
}

interface SearchResultsProps {
  results: Product[];
}

export function SearchResults({ results }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);

  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
}
