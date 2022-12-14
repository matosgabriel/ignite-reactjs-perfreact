import React, { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from './components/SearchResults';

export interface Results {
  totalPrice: number;
  data: any[];
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    if (!search.trim()) return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    const products = data.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        formattedPrice: formatter.format(product.price),
      };
    });

    setResults({ totalPrice, data: products });
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit'>Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        handleAddToWishList={addToWishList}
      />
    </div>
  );
}
