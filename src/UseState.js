import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      loading: false,
      error: true,
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  };

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
          onChange={(event) => {
            onWrite(event.target.value);
          }}
          placeholder="Codigo de seguridad"
        />
        <button
          onClick={() => {
            onCheck();
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmacion. Estas Seguro?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Si, Eliminar
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          No. Me arrepiento
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Recuperar UseState
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
