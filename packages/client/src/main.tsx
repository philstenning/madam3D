import React from 'react'
import ReactDOM from 'react-dom'
import './styles/normalize.css'
import "./styles/index.css";
import App from './components/app/App'
// import { render, events } from "@react-three/fiber";
import { createDatabase } from "./db/db";
createDatabase();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
