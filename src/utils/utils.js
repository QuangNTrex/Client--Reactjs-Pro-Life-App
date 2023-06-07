export const compactPrice = (price) => {
  if (!price) return 0;
  if (price > 1e9)
    return (Math.round((price / 1e9) * 100) / 100).toFixed(2) + "B";
  if (price > 1e6)
    return (Math.round((price / 1e6) * 100) / 100).toFixed(2) + "M";
  if (price > 1e3)
    return (Math.round((price / 1e3) * 100) / 100).toFixed(2) + "K";
  return price.toFixed(2);
};

export const slimName = (name) => {
  if (!name) name = "";
  let limit = 15;
  if (name.length < limit) return name;
  return name.slice(0, limit) + "...";
};

export const upFirstStr = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
