

import React from "react";

const SECURITY_CODE = 'paradigma';


function UseState({name}){
    const[value, setValue]=React.useState('');
    const [error, setError]=React.useState(false);
    const [loading, setLoading]=React.useState(false);
    console.log(value);

    React.useEffect(()=>{
        console.log("Empenzando el efecto");
        if(!!loading){
            setTimeout(()=>{
                console.log("Haciendo la validacion");
                
                if(value=== SECURITY_CODE){                    
                    setLoading(false);
                    //setError(false);
                }else{
                    setLoading(false);
                    setError(true);
                }
                
                
                

                console.log("Terminado la validacion");
            },3000);
        }

        console.log("Terminado el Efecto");        
    },[loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor escribe el codigo de seguridad</p>
            {(error&&!loading) &&(
                <p>Error: El codigo es incorrecto</p>
            )}

            {loading &&(
                <p>Cargando...</p>
            )}

            <input 
                value={value}
                onChange={(event)=>{
                   // setError(false);
                    setValue(event.target.value)
                }}
                placeholder="Codigo de seguridad"/>
            <button
                onClick={()=>{
                    setLoading(true);
                    //setError(false); //Este fue
                        }}
            >Comprobar</button>
        </div>
    );
}

export {UseState};