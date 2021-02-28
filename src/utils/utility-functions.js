export const wasItemPurchasedWithinLastOneDay = (lastPurchasedOn) => {
  if (lastPurchasedOn === null) return false;
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  return Date.now() - lastPurchasedOn <= oneDayInMilliseconds;
};

export const getDaysBetweenCurrentAndPreviousPurchase = (
  previousPurchaseDate,
  currentPurchaseDate = Date.now(),
) => {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  return (currentPurchaseDate - previousPurchaseDate) / oneDayInMilliseconds;
};

export const normalizeString = (str) => {
  const nonWordCharactersAndUnderscores = /[\W_]/g;
  return str.toLowerCase().replace(nonWordCharactersAndUnderscores, '');
};

export const getShoppingItemBackgroundStyles = (
  daysLeftForNextPurchase,
  lastPurchasedOn,
) => {
  const presentDate = Date.now();
  const daysBetweenCurrentAndPreviousPurchase = getDaysBetweenCurrentAndPreviousPurchase(
    lastPurchasedOn,
    presentDate,
  );

  if (daysBetweenCurrentAndPreviousPurchase >= daysLeftForNextPurchase * 2) {
    return 'var(--checked-default)';
  } else if (daysLeftForNextPurchase <= 7) {
    return 'var(--checked-dark)';
  } else if (daysLeftForNextPurchase < 30) {
    return 'var(--checked-middle)';
  } else {
    return 'var(--checked-light)';
  }
};

export const getShoppingItemTextStyles = (
  daysLeftForNextPurchase,
  lastPurchasedOn,
) => {
  const presentDate = Date.now();
  const daysBetweenCurrentAndPreviousPurchase = getDaysBetweenCurrentAndPreviousPurchase(
    lastPurchasedOn,
    presentDate,
  );

  if (daysBetweenCurrentAndPreviousPurchase >= daysLeftForNextPurchase * 2) {
    return 'var(--text-dark)';
  } else if (daysLeftForNextPurchase <= 7) {
    return 'var(--text-light)';
  } else if (daysLeftForNextPurchase < 30) {
    return 'var(--text-dark)';
  } else {
    return 'var(--text-dark)';
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
