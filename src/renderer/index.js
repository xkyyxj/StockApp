import React from 'react'
import ReactDom from 'react-dom'
import MainPage from '../pages/mainPage'
const wasm = import('../stockapprust/pkg')

ReactDom.render(<MainPage/>, document.getElementById('app'))