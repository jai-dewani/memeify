import React from 'react';

function displayMeme(props){
    const {texts} = props.state;
    // console.log(texts)
    return (
        <form className="meme-form" onSubmit={ props.handleSubmit } >
            {
                props.state.texts.map(text => (
                    <div>
                        <input
                            className="input"
                            key={text.id}
                            type="text"
                            name={text.text}
                            placeholder="Funny text goes here...."
                            value= {text.text }
                            onChange={ props.handleChange.bind(this, text.id) }
                            />
                        <input
                            className="colorPicker"
                            type="color"
                            name="bottomColor"
                            value={ text.color }
                            onChange={ props.handleColorChange.bind(this, text.id) }
                        />
                        <input
                            className="colorPicker"
                            type="color"
                            name="bottomBorderColor"
                            value={ text.borderColor }
                            onChange={ props.handleBorderColorChange.bind(this, text.id) }
                        />
                    </div>
                ))
            }
            <div className="input-control">
                <button id="remove " className="inverted button" onClick={props.handleRemoveText }>-</button>
                <button id="add" className="inverted button" onClick={props.handleAddText }>+</button>
            </div>

            <button type="submit" onClick={ props.handleRandomClick } className="inverted button">Random</button>
            <button type="submit" onClick={ props.handleDownloadClick } className="inverted button">Download</button>
            <button className="cutom-file-upload inverted button" type="button" onClick={() => {
                const input = document.getElementById('file-upload');
                input.click();
            }}>Upload Your Photo</button>
            <input id="file-upload" type="file" onChange={ props.handleFileChange } />
        </form>            
    )
}

export default displayMeme