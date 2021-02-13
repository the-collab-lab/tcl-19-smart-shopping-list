export const getShoppingItemBackgroundStyles = (
  daysLeftForNextPurchase,
  getDaysBetweenCurrentAndPreviousPurchase,
  lastPurchasedOn,
) => {
  const presentDate = Date.now();
  const daysBetweenCurrentAndPreviousPurchase = getDaysBetweenCurrentAndPreviousPurchase(
    lastPurchasedOn,
    presentDate,
  );
  if (daysBetweenCurrentAndPreviousPurchase >= daysLeftForNextPurchase * 2) {
    return 'grey';
  } else if (daysLeftForNextPurchase <= 7) {
    return 'green';
  } else if (daysLeftForNextPurchase > 7 && daysLeftForNextPurchase < 30) {
    return 'orange';
  } else {
    return 'red';
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

// Compare two elements a and b. If a is bigger than b sort b before a.
// If a and b are the same sort alphabetically.
export const sortShoppingList = (a, b) => {
  return a.daysLeftForNextPurchase > b.daysLeftForNextPurchase
    ? 1
    : a.daysLeftForNextPurchase === b.daysLeftForNextPurchase
    ? a.shoppingListItemName > b.shoppingListItemName
      ? 1
      : -1
    : -1;
};
