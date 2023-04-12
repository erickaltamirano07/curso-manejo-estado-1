import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });

  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionTypes.write, payload: value });
  };

  //Primera manera

  /*const onWrite = (newValue) => {
       // dispatch({type: actionTypes.write, payload: newValue });      
  };*/

  //Otras maneras

  /* const onWrite = (event) => {
      dispatch({type: actionTypes.write, payload: event.target.value });
    };*/
  /* const onWrite = ({ target}) => {
       dispatch({ type: actionTypes.write, payload: target.value });
     };*/

  React.useEffect(() => {
    console.log("Empenzando el efecto");
    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");

        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }

        console.log("Terminado la validacion");
      }, 3000);
    }

    console.log("Terminado el Efecto");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el codigo de seguridad</p>
        {state.error && !state.loading && <p>Error: El codigo es incorrecto</p>}

        {state.loading && <p>Cargando...</p>}

        <input
          value={state.value}
          placeholder="Codigo de seguridad"
          //Primera manera
          /*onChange={(event) => {
                    onWrite(event.target.value);}}*/

          //Otras Maneras
          onChange={onWrite}
        />
        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmacion. Estas Seguro?</p>
        <button onClick={onDelete}>Si, Eliminar</button>
        <button onClick={onReset}>No. Me arrepiento</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button onClick={onReset}>Recuperar UseState</button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  check: "CHECK",
  delete: "DELETE",
  reset: "RESET",
  write: "WRITE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
