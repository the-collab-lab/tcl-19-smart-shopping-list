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
    return '#D1D5DB';
  } else if (daysLeftForNextPurchase <= 7) {
    return '#047857';
  } else if (daysLeftForNextPurchase < 30) {
    return '#10B981';
  } else {
    return '#6EE7B7';
  }
};

export const getShoppingItemTextStyles = (
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
    return '#111827';
  } else if (daysLeftForNextPurchase <= 7) {
    return '#F3F4F6';
  } else if (daysLeftForNextPurchase < 30) {
    return '#111827';
  } else {
    return '#111827';
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

export const sortShoppingList = (a, b) => {
  return (
    a.daysLeftForNextPurchase - b.daysLeftForNextPurchase ||
    a.shoppingListItemName - b.shoppingListItemName
  );
};
