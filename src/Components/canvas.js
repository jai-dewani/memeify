import React from 'react';


function canvas(props){
    return (
        <div className="meme">
            <center>
                <canvas 
                    id="my-canvas" 
                    className="inverted" 
                    width="568px" height="335px"
                    />
            </center>
        </div>
    )
}

export default canvas