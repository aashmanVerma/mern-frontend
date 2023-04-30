import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SignIn from './pages/SignIn.jsx'
import List from './pages/List.jsx'
import Change from './pages/Change.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "/",
        element : <SignIn />
      },
      {
        path : "/list",
        element : <List />
      }, 
      {
        path : "/change",
        element : <Change />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
