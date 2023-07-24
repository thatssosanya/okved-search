import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import OkvedPage from "./pages/OkvedPage"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)
root.render(
  <React.StrictMode>
    <OkvedPage />
  </React.StrictMode>
)
