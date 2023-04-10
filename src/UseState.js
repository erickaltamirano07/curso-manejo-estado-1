

import React from "react";


function UseState({name}){
    const [error, setError]=React.useState(true);
    const [loading, setLoading]=React.useState(false);

    React.useEffect(()=>{
        console.log("Empenzando el efecto");
        if(!!loading){
            setTimeout(()=>{
                console.log("Haciendo la validacion");

                setLoading(false);

                console.log("Terminado la validacion");
            },3000);
        }

        console.log("Terminado el Efecto");        
    },[loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor escribe el codigo de seguridad</p>
            {error &&(
                <p>Error: El codigo es incorrecto</p>
            )}

            {loading &&(
                <p>Cargando...</p>
            )}

            <input placeholder="Codigo de seguridad"/>
            <button
                onClick={()=>setLoading(!loading)}
            >Comprobar</button>
        </div>
    );
}

export {UseState};