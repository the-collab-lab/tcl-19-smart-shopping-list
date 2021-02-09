export const stylesFnx = (days) => {
  if (days <= 7) {
    return 'green';
  } else if (days > 7 && days <= 30) {
    return 'orange';
  } else {
    return 'red';
  }
};

export const describedState = (days) => {
  if (days <= 7) {
    return 'this item needs to be bought soon (fewer than 7 days)';
  } else if (days > 7 && days <= 30) {
    return 'this item needs to be bought kind of soon (between 7 & 30 days)';
  } else {
    return 'this item needs to be bought not soon (more than 30 days)';
  }
};
