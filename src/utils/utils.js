export const compactPrice = (price) => {
  if (!price) return 0;
  if (price > 1e9) return Math.round((price / 1e9) * 100) / 100 + "B";
  if (price > 1e6) return Math.round((price / 1e6) * 100) / 100 + "M";
  if (price > 1e3) return Math.round((price / 1e3) * 100) / 100 + "K";
  return Math.round(price * 100) / 100 + " Đ";
};

export const slimName = (name, length = 15) => {
  if (!name) return "";
  if (name.length <= length) return name;
  return name.slice(0, length) + "...";
};

export const upFirstStr = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const checkBorder = (milisecond, duration) => {
  if (!duration) duration = 1000 * 3600 * 24;
  if (!milisecond) return "";
  return milisecond < Date.now()
    ? "border-red"
    : milisecond - Date.now() > 0 &&
        milisecond - Date.now() < duration &&
        "border-yellow";
};

export const checkDeadline = (milisecond, duration) => {
  const current = Date.now();
  if (!duration) duration = 1000 * 3600 * 24 * 7;
  if (!milisecond || current < milisecond) return 0;
  return 1;
};

export const checkOutDuration = (milisecond, duration) => {
  // hàm sẽ check xem thời gian hiện tại đã vuọt quá khoảng thời gian kể từ milisecond hay chưa
  if (!duration) duration = 1000 * 3600 * 24 * 7;
  if (!milisecond) return false;
  if (Date.now() - milisecond >= duration) return true;
  return false;
};
