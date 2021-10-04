import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { MdFileDownload, MdFileUpload, MdShuffle } from 'react-icons/md/index';

function displayMeme(props){
    const {texts} = props.state;
    console.log(texts)
    return (
        <form className="meme-form" onSubmit={ props.handleSubmit } >
            {
                texts.map(text => (
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

                        <Tooltip title='Text Color' placement='top-start' arrow>  
                            <input
                                className="colorPicker inverted"
                                type="color"
                                name="bottomColor"
                                value={ text.color }
                                onChange={ props.handleColorChange.bind(this, text.id) }
                            />
                        </Tooltip>
          
                        <Tooltip title='Border Color' placement='top-start' arrow>
                            <input
                                className="colorPicker inverted"
                                type="color"
                                name="bottomBorderColor"
                                value={ text.borderColor }
                                onChange={ props.handleBorderColorChange.bind(this, text.id) }
                            />
                        </Tooltip>

                        <input
                            className="input textSize"
                            type="text"
                            name={ text.size}
                            placeholder="Size"
                            value= { text.size }
                            onChange={ props.handleSizeChange.bind(this, text.id) }
                        />
                    </div>
                ))
            }
            
            <div className='input-control'>
                <button
                    id='remove '
                    className='inverted button'
                    onClick={props.handleRemoveText}
                >
                    -
                </button>
                <button
                    id='add'
                    className='inverted button'
                    onClick={props.handleAddText}
                >
                    +
                </button>
            </div>

            <button
                type='submit'
                onClick={props.handleRandomClick}
                className='inverted button'
            >
                <MdShuffle /> Random
            </button>
            <button
                type='submit'
                onClick={props.handleDownloadClick}
                className='inverted button'
            >
                <MdFileDownload /> download
            </button>
            <button
                className='cutom-file-upload inverted button'
                type='button'
                onClick={() => {
                  const input = document.getElementById('file-upload');
                  input.click();
                }}
            >
                {' '}
                <MdFileUpload /> Upload
            </button>
            <input id='file-upload' type='file' onChange={props.handleFileChange} />
        </form>
    );
}

export default displayMeme;
