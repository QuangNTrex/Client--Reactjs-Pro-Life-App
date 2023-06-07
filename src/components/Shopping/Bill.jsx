import { useParams } from "react-router-dom";
import "./Bill.css";
import { useDispatch, useSelector } from "react-redux";
import { BillActions } from "../../store/bill";
import { useEffect, useState } from "react";
import Product from "./Product";
import { compactPrice } from "../../utils/utils";
import { DataActions } from "../../store/data";

const Bill = () => {
  // data
  const [indexActive, setIndexActive] = useState(-1);

  const dispatch = useDispatch();
  const bills = useSelector((state) => state.data.bill);
  const params = useParams();
  const currentBill = bills.filter(
    (bill) => bill.createdAt.toString() === params.id
  )[0];

  // function
  const addProductHandler = () => {
    if (currentBill.pay) return;
    dispatch(DataActions.createItem({ type: "bill", listId: params.id }));
    setIndexActive(0);
  };

  const activeHandler = (index) => {
    setIndexActive(index);
  };

  const inputChangeHandler = (itemId, item) => {
    console.log(item, itemId);
    dispatch(
      DataActions.updateItem({
        type: "bill",
        listId: params.id,
        itemId,
        item,
      })
    );
  };

  const togglePayHandler = () => {
    return dispatch(
      DataActions.updateList({
        type: "bill",
        listId: params.id,
        list: { pay: !currentBill.pay },
      })
    );
  };
  if (!currentBill) return <div>Not have bill!</div>;

  return (
    <div className="Bill">
      <div className="add-product" onClick={addProductHandler}>
        <i className="bi bi-plus-lg"></i>
      </div>
      <div className="list">
        {currentBill.list.map((product, i) => {
          if (i === indexActive && !currentBill.pay) {
            return (
              <div className="Product" key={product.updatedAt}>
                <div className="wrap-left">
                  <input
                    type="text"
                    placeholder="Title"
                    className="input-title"
                    value={currentBill.list[i].title}
                    onChange={(e) => {
                      inputChangeHandler(product.createdAt, {
                        title: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="wrap-right ">
                  <div className="wrap-right-top">
                    <div className="wrap-info price">
                      <p className="price-title">P: </p>
                      {console.log(Number(currentBill.list[i].price))}
                      <input
                        className="input-price"
                        inputmode="decimal"
                        value={(currentBill.list[i].price || "").toString()}
                        onChange={(e) => {
                          const value = e.target.value.replace(",", ".");
                          const regex = /^[0-9]*\.?[0-9]*$/;
                          if (regex.test(value)) {
                            inputChangeHandler(product.createdAt, {
                              price: Number(value),
                            });
                          }
                        }}
                      />
                    </div>
                    <div className="wrap-info quantity">
                      <p className="quantity-title">Q: </p>
                      <input
                        className="input-quantity"
                        inputmode="decimal"
                        value={(currentBill.list[i].quantity || "").toString()}
                        onChange={(e) => {
                          const value = e.target.value.replace(",", ".");
                          const regex = /^[0-9]*\.?[0-9]*$/;
                          if (regex.test(value)) {
                            inputChangeHandler(product.createdAt, {
                              quantity: Number(value),
                            });
                          }
                        }}
                      />
                    </div>
                    <div className="wrap-info total">
                      <p className="total-title">T: </p>
                      <p className="total-number">
                        {compactPrice(
                          currentBill.list[i].quantity *
                            currentBill.list[i].price
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <Product
              className="product"
              key={product.updatedAt}
              product={product}
              i={i}
              onActive={activeHandler}
            />
          );
        })}
      </div>
      <div className="Bill__bottom">
        <div className="border-only">
          <div className="total-price">
            <div className="wrap-left">
              <p className="title">Total Price: </p>
            </div>
            <div className="wrap-right">
              <p className="price">
                {Math.round(currentBill.totalPrice * 100) / 100} Đ
              </p>
            </div>
          </div>
          <div className="gr-btn">
            <button className="btn-pay" onClick={togglePayHandler}>
              {currentBill.pay ? "Paid" : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;
