import "./Popup.css";

const Popup = (props) => {
  const closeHandler = props.onClose;

  const info = props.info;
  const data = {};
  const submitHandler = () => {
    console.log(data);
    props.onSubmit(data);
    closeHandler();
  };
  return (
    <div className="Popup">
      <div className="container">
        <div className="btn-close" onClick={closeHandler}></div>
        <form className="form">
          {info.map((e, i) => {
            // custom checkboxs
            if (e.type === "checkboxs") {
              data[e.title] = {};
              const list = e.list;
              return (
                <div key={Math.random().toString()} className="each-input">
                  <label htmlFor="">
                    {e.title.charAt(0).toUpperCase() + e.title.slice(1)}
                  </label>
                  <div className="checkboxs">
                    {list.map((title) => (
                      <div className="checkbox" key={title}>
                        <p className="title">{title}</p>
                        <input
                          type="checkbox"
                          onChange={(event) => {
                            data[e.title][title] = event.target.checked;
                            if (!event.target.checked)
                              delete data[e.title][title];
                          }}
                        ></input>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            // default
            return (
              <div className="each-input" key={Math.random().toString()}>
                <label>
                  {e.title.charAt(0).toUpperCase() + e.title.slice(1)}
                </label>
                <input
                  className="input"
                  placeholder={e.placeHolder}
                  type={e.type}
                  onChange={(v) => {
                    data[e.title] = v.target.value;
                  }}
                />
              </div>
            );
          })}
        </form>
        <div className="gr-btn">
          <button
            className="btn btn-cancel"
            type="button"
            onClick={closeHandler}
          >
            Cancel
          </button>
          <button
            className="btn btn-submit"
            type="button"
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
