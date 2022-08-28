import { legacy_createStore as createStore} from 'redux'
const initState={
    name:'chushi'
}
function reducer(state=initState,action){
    switch(action.type){
        case 'CHANGE_DATA':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return {...state}
    }
}

// 分为客户端和服务端
// 客户端,后面要加一个初始值来
export function createClientStore(){
    return createStore(reducer,window.REDUX_STORE)
}
// 服务端
export function createServerStore(){
    return createStore(reducer)
}