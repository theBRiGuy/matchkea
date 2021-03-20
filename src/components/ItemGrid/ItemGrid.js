import React, { useState, useEffect } from 'react';
import Item from './Item';
import './ItemGrid.scss';

function ItemGrid() {
  const baseCls = 'ItemGrid';
  const [hasError, setErrors] = useState(false);
  const [results, setResults] = useState([]);

  async function fetchData() {
    const response = await fetch('http://localhost:4000/');
    response
      .json()
      .then(res => {
        setResults(res);
      })
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h3>Results:</h3>
      {results && (
        <div className={baseCls}>
          {results.map(item => {
            return <Item baseCls={baseCls} {...item} />;
          })}
        </div>
      )}
      <hr />
      <h3>Errors:</h3>
      {JSON.stringify(hasError)}
    </div>
  );
}

export default ItemGrid;
