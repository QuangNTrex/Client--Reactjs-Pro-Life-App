import { compactPrice, slimName } from "../../utils/utils";
import "./Product.css";

const Product = (props) => {
  const product = props.product;
  return (
    <div className="Product" onClick={props.onActive.bind(null, props.i)}>
      <div className="wrap-left">
        <p className="title">{slimName(product.title)}</p>
      </div>
      <div className="wrap-right ">
        <div className="wrap-right-top">
          <div className="wrap-info price">
            <p className="price-title">P: </p>
            <p className="price-number">{product.price} đ</p>
          </div>
          <div className="wrap-info quantity">
            <p className="quantity-title">Q: </p>
            <p className="quantity-number">{product.quantity}</p>
          </div>
          <div className="wrap-info total">
            <p className="quantity-title">T: </p>
            <p className="quantity-number">
              {compactPrice(product.price * product.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
