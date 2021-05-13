import React from "react"
import Header from "./components/Header"
import MemeGenerator from "./components/MemeGen"
import Footer from "./components/footer";
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
