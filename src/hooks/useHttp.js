import { useReducer, useEffect } from "react";
import axios from "axios";

const httpReducer = (state, action) => {

    switch(action.type){
        case "SEND":
            return {data: null, error: null, loading: true};
        case "SUCCESS":
            return {data: action.responseData, error: null, loading: false};
        case "ERROR":         
            return {data: null, error: action.errorMessage, loading: false};
        default: 
            return state  
    }

}
// meu hook
const useHttp = (url, method = "GET", body = null, effectDep = []) => {

    const [httpState, dispatch] = useReducer(httpReducer, {
        data: null,
        error:null,
        loading: false,   
    });  

    useEffect(() => {

        const fetchPost = async() => {
            
            dispatch({type:"SEND"});

            try {                
                const resposta = await axios({url, method, data: body});                
                dispatch({type:"SUCCESS", responseData: resposta.data});          
            }
            catch(error) {
                dispatch({type:"ERROR", errorMessage:error.message });                
            }
        };

        fetchPost();

    }, effectDep);

    return httpState;
} 

export default useHttp;
