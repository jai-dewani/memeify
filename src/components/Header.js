import React, { useState } from "react"

function Header() {

    const [ message, setMessage ] = useState(false)

    const switchTheme = (e) => {
        const invertedNodes = document.querySelectorAll('.inverted')
        document.body.classList.toggle('inverted-theme')
        invertedNodes.forEach(node => node.classList.toggle('inverted-theme'))
        setMessage(!message) 
    }

    return (
        <header className="inverted">
            <img 
                src="https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png" 
                src="http://assets.stickpng.com/images/580b585b2edbce24c47b2a2f.png"
                alt="Problem?"
                height="100px"
                width="100px"
            />
            <p>Meme Generator</p>
             <div className="theme-switch-wrapper">
                <label className="theme-switch" htmlFor="checkbox">
                    <input type="checkbox" id="checkbox" onChange={switchTheme}/>
                    <div className="slider round"></div>
              </label>
              <em>{message ? 'Disable': 'Enable'} Dark Mode!</em>
            </div>            
        </header>
    )
}

export default Header