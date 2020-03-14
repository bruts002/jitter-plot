import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import "./index.css"
import App from "./App"
import mainReducer from "./reducers"
import registerServiceWorker from "./registerServiceWorker"

// TODO:
// ◼ Add theme provider
// ◼ refactor css
// ◼ make into easily reusable component
// ◼ publish in npm
// ◼ storybook
// ◼ publish storybook
// ◼ unit tests
// ◼ eslint/prettier js on save

const localStorageMiddleWare = ({ getState }) => {
  return next => action => {
    const result = next(action)
    localStorage.setItem("reduxState", JSON.stringify(getState()))
    return result
  }
}

const reHydrateStore = () => {
  if (localStorage.getItem("reduxState") !== null) {
    return JSON.parse(localStorage.getItem("reduxState"))
  }
}

const store = createStore(
  mainReducer,
  reHydrateStore(),
  applyMiddleware(localStorageMiddleWare)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
registerServiceWorker()
