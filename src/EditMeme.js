import React from 'react';

function EditMeme(props){
    return (
        <form className="meme-form" onSubmit={props.handleSubmit}>
            <input
                type="text"
                name="topText"
                placeholder="Top Text"
                value={props.state.topText}
                onChange={props.handleChange}
            />
            <br />
            <label>
                <span> Text Color </span>
                <input
                    type="color"
                    name="topColor"
                    value={props.state.topColor}
                    onChange={props.handleColorChnage}
                />
            </label>
            <br />
            <label>
                <span> Border Color  </span>
                <input
                    type="color"
                    name="topBorderColor"
                    value={props.state.topBorderColor}
                    onChange={props.handleColorChnage}
                />
            </label>
            <br />
            <input
                type="text"
                name="bottomText"
                placeholder="Bottom Text"
                value={props.state.bottomText}
                onChange={props.handleChange}
            />
            <br />
            <label>
                <span> Text Color  </span>
                <input
                    type="color"
                    name="bottomColor"
                    value={props.state.bottomColor}
                    onChange={props.handleColorChnage}
                />
            </label>
            <br />
            <label>
                <span> Border Color  </span>
                <input
                    type="color"
                    name="bottomBorderColor"
                    value={props.state.bottomBorderColor}
                    onChange={props.handleColorChnage}
                />
            </label>
            <br />
            <button>Gen</button>
        </form>           
    )
}

export default EditMeme