export const stylesFnx = (days) => {
  if (days <= 7) {
    return 'green';
  } else if (days > 7 && days <= 30) {
    return 'orange';
  } else if (days > 30 && days <= 90) {
    return 'red';
  } else {
    return 'grey';
  }
};

export const describedState = (days) => {
  if (days <= 7) {
    return 'this item needs to be bought soon';
  } else if (days > 7 && days <= 30) {
    return 'this item needs to be bought kind of soon';
  } else {
    return 'this item needs to be bought not soon';
  }
};
