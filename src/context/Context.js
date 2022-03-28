import {createContext,useState,useCallback} from 'react'



export const Context =createContext({
    currencies:[],
    handler:(curr)=>{},
    obj:{},
    objHandler:(obj)=>{}
})



const ContextProvider=(props)=>{
    const [currency,setCurrency] = useState([])
    const [obj,setObj] = useState({})
    const currHandler=useCallback((curr)=>{
        setCurrency(prevst=>{
            return prevst.concat(curr)
        })
    },[])
    const objHandler=(obj)=>{
       setObj(obj)
    }
return(
    <Context.Provider value={{currencies:currency,handler:currHandler,obj:obj,objHandler:objHandler}}>
       {props.children}
    </Context.Provider>
)
}

export default ContextProvider