import React from 'react';
import { MdFavorite } from 'react-icons/md'
import { FaGithub, FaTwitter  } from 'react-icons/fa'
import { IconContext } from "react-icons";

function Footer() {

    return (
        <div id="footer">
            <div id="left">
                <a href="https://twitter.com/jai_dewani">
                    <IconContext.Provider value={{color:"rgb(29, 161, 242)"}}>
                        <div><FaTwitter/></div>
                    </IconContext.Provider>
                </a>
            </div>
            <div id="middle">
                Made with <MdFavorite/> by <a href="https://github.com/jai-dewani">Jai Kumar Dewani</a>                
            </div>
            <div id="right">
                <a href="https://github.com/jai-dewani/Meme-App">
                    <IconContext.Provider value={{color:"black"}}>
                        <div><FaGithub/></div>
                    </IconContext.Provider>
                </a>
            </div>      
        </div>
    )
}

export default Footer