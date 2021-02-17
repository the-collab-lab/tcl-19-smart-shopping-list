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
    return '#9CA3AF';
  } else if (daysLeftForNextPurchase <= 7) {
    return '#EF4444';
  } else if (daysLeftForNextPurchase < 30) {
    return '#FBBF24';
  } else {
    return '#FCA5A5';
  }
};

export const getItemDescription = (days) => {
  if (days <= 7) {
    return 'this item needs to be bought soon';
  } else if (days < 30) {
    return 'this item needs to be bought kind of soon';
  } else {
    return 'this item needs not be bought soon';
  }
};

// Compare two elements a and b. If a is bigger than b sort b before a.
// If a and b are the same sort alphabetically.
export const sortShoppingList = (a, b) => {
  return (
    a.daysLeftForNextPurchase - b.daysLeftForNextPurchase ||
    a.shoppingListItemName - b.shoppingListItemName
  );
};
