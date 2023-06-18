import { useEffect, useState } from "react";

const useText = (maxText, milisecond) => {
  if (!maxText) maxText = 15;
  if (!milisecond) milisecond = 700;
  const [indexText, setIndexText] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setIndexText((prev) => prev + 1);
    }, milisecond);
  }, []);

  const autoText = (text) => {
    if (!text) return "";
    if (text.length <= maxText) return text;
    return text.slice(
      indexText % (text.length - maxText + 1),
      maxText + (indexText % (text.length - maxText + 1))
    );
  };

  return { autoText };
};

export default useText;
