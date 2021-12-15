import React from "react"
import Header from "./Components/Header"
import MemeGenerator from "./Components/MemeGen"
import Footer from "./Components/Footer";
import './App.css'

function App() {
    return (
        <div className="app-container" data-theme="dark">
            <Header />
            <MemeGenerator />
            <Footer />
        </div>
    )
}

export default App
