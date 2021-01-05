import React, { useState, useEffect } from 'react';
import firebase from './firebase';

function useItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase;
    firebase
      .firestore()
      .collection('items')
      .onSnapshot((snapshot) => {
        const newItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(newItems);
      });

    return () => unsubscribe();
  }, []);

  return items;
}

const ItemsList = () => {
  const items = useItems();

  return (
    <table>
      <tr>
        <th> Item </th>
        <th> Quantity </th>
      </tr>
      {items.map((item) => (
        <tr key={item.id}>
          <td>{item.item}</td>
          <td>{item.how_much}</td>
        </tr>
      ))}
    </table>
  );
};

export default ItemsList;
