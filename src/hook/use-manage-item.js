import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { DataActions } from "../store/data";

const useManageItem = (listId, type) => {
  const param = useParams();
  const [indexActive, setIndexActive] = useState(-1);
  const dispatch = useDispatch();

  const inputChangeHandler = (itemId, item) => {
    dispatch(DataActions.updateItem({ type, listId, itemId, item }));
  };
  const indexActiveHandler = (index) => {
    setIndexActive(index);
  };
  const createItemHandler = () => {
    setIndexActive(0);
    dispatch(DataActions.createItem({ listId: param.id, type }));
  };
  const deleteItemHandler = (itemId) => {
    dispatch(DataActions.deleteItem({ type, listId, itemId }));
  };
  const toggleDoneHandler = (itemId, done) => {
    dispatch(
      DataActions.updateItem({ type, listId, itemId, item: { done: !done } })
    );
  };

  return {
    indexActive,
    inputChangeHandler,
    indexActiveHandler,
    createItemHandler,
    deleteItemHandler,
    toggleDoneHandler,
  };
};

export default useManageItem;
