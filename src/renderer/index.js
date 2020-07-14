import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import MainPage from '../pages/mainPage'
import initStore from './reduxConfig'
//const wasm = import('../stockapprust/pkg')
const store = initStore()

let TopApp = (
    <Provider store={store}>
        <MainPage/>
    </Provider>
)

const rootElement = document.getElementById('app')

ReactDom.render(TopApp, rootElement)