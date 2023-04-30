import {createSlice, configureStore} from '@reduxjs/toolkit'

const toggleState = {
    signedIn : false
}

const userState = {
    name : null,
    email : null,
} 

const boookState = {
    title : null,
    author : null,
    publishedAt : null,
}

const toggle = createSlice({
    name : "toggle",
    initialState : toggleState,
    reducers : {
        status : (initialState, e)=>{
            return {...initialState, signedIn : e.payload}
        },
    }
})

const user = createSlice({
    name : "user",
    initialState : userState,
    reducers : {
        save : (initialState, e)=>{
            return {...initialState, name : e.payload.name, email : e.payload.email}
        }
    }
})

const book = createSlice({
    name : "book",
    initialState : boookState,
    reducers : {
        saveBook : (initialState, e)=> {
            return {...initialState, title : e.payload.title, author : e.payload.author, publishedAt : e.payload.publishedAt}
        }
    }
})


export const {status} = toggle.actions;
export const {save} = user.actions;
export const {saveBook} = book.actions;

export const store = configureStore({
    reducer : {
        toggle : toggle.reducer,
        user : user.reducer,
        book : book.reducer,
    }
})