

import React from "react";

const SECURITY_CODE = 'paradigma';


function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });
    
    console.log(state);

    React.useEffect(()=>{
        console.log("Empenzando el efecto");
        if(!!state.loading){
            setTimeout(()=>{
                console.log("Haciendo la validacion");
                
                if(state.value=== SECURITY_CODE){             
                    
                    setState({
                        ...state,
                        error: false,
                        loading: false,
                        confirmed:true,
                    });
                    
                } else {
                    setState({
                        ...state,
                        loading: false,
                        error: true
                    });                    
                }
                
                
                

                console.log("Terminado la validacion");
            },3000);
        }

        console.log("Terminado el Efecto");        
    },[state.loading]);

    

    if (!state.deleted && !state.confirmed) {
        return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor escribe el codigo de seguridad</p>
            {(state.error&&!state.loading) &&(
                <p>Error: El codigo es incorrecto</p>
            )}

            {state.loading &&(
                <p>Cargando...</p>
            )}

            <input 
                value={state.value}
                onChange={(event)=>{
                   
                    setState({
                        ...state,
                        value: event.target.value,
                    });
                    
                }}
                placeholder="Codigo de seguridad"/>
            <button
                onClick={() => {
                    setState({
                        ...state,
                        loading: true
                    });
                    
                        }}
            >Comprobar</button>
        </div>
    );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmacion. Estas Seguro?</p>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            deleted: true,
                        });
                    }}                    
                >
                    Si, Eliminar
                </button>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            value: '',
                        });
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
                        setState({
                            ...state,
                            confirmed: false,
                            deleted: false,
                            value: '',
                        });
                    }}
                >
                    Recuperar UseState
                </button>
            </React.Fragment>                        
        );        
    }
}

export {UseState};