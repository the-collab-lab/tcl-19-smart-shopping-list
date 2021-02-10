export const getShoppingItemBackgroundStyles = (days) => {
  if (days > 0 && days <= 7) {
    return 'green';
  } else if (days > 7 && days <= 30) {
    return 'orange';
  } else if (days > 30) {
    return 'red';
  } else {
    return 'grey';
  }
};

export const getItemDescription = (days) => {
  if (days <= 7) {
    return 'this item needs to be bought soon';
  } else if (days > 7 && days <= 30) {
    return 'this item needs to be bought kind of soon';
  } else {
    return 'this item needs not be bought soon';
  }
};

export const sortShoppingList = () => {
  return (a, b) =>
    a.daysLeftForNextPurchase > b.daysLeftForNextPurchase
      ? 1
      : a.daysLeftForNextPurchase === b.daysLeftForNextPurchase
      ? a.shoppingListItemName > b.shoppingListItemName
        ? 1
        : -1
      : -1;
};
