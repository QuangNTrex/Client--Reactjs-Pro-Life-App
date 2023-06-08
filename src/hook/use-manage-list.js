import { useDispatch } from "react-redux";
import { DataActions } from "../store/data";
import { useRef, useState } from "react";

const useManageList = (type) => {
  const dispatch = useDispatch();
  const timeoutRef = useRef();
  const [showPU, setShowPU] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [indexActive, setIndexActive] = useState(-1);
  const createListHandler = (list) => {
    dispatch(DataActions.createList({ type, list }));
  };
  const inputChangeHandler = (listId, list) => {
    dispatch(DataActions.updateList({ type, list, listId }));
  };
  const deleteListHandler = (listId, title) => {
    const prom = prompt(`Press password to delete list`);
    if (prom === "quangdeptrai")
      dispatch(DataActions.deleteList({ type, listId }));
  };
  const showPUHandler = () => {
    setShowPU(true);
  };
  const hidePUHandler = () => {
    setShowPU(false);
  };
  const offEditMode = () => {
    setEditMode(false);
    setIndexActive(-1);
  };
  const mouseDownHandler = (i) => {
    if (!i && i !== 0) i = -1;
    timeoutRef.current = setTimeout(() => {
      setEditMode(true);
      setIndexActive(i);
    }, 500);
  };
  const mouseUpHandler = () => {
    clearTimeout(timeoutRef.current);
  };
  const IndexActiveHandler = (i) => {
    if (!i) i = 0;
    setIndexActive(i);
  };

  return {
    createListHandler,
    inputChangeHandler,
    deleteListHandler,
    showPUHandler,
    hidePUHandler,
    offEditMode,
    mouseDownHandler,
    mouseUpHandler,
    showPU,
    indexActive,
    editMode,
    IndexActiveHandler,
  };
};

export default useManageList;
