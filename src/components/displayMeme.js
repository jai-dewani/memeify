import React, { useRef } from 'react';
import { TweenMax, TimelineLite, Power3 } from 'gsap';
import { MdFileDownload, MdFileUpload, MdShuffle } from 'react-icons/md/index';

function DisplayMeme(props) {
  const { texts } = props.state;
  //   console.log(texts);

  let textSpan = useRef(null);
  let borderSpan = useRef(null);

  const handleTextShow = () => {
    TweenMax.to(textSpan, 1, {
      autoAlpha: 1,
      ease: Power3.easeOut,
    });
  };

  const handleTextRemove = () => {
    TweenMax.to(textSpan, 1, { autoAlpha: 0, ease: Power3.easeOut });
  };

  const handleBorderShow = () => {
    TweenMax.to(borderSpan, 1, {
      autoAlpha: 1,
      ease: Power3.easeOut,
    });
  };

  const handleBorderRemove = () => {
    TweenMax.to(borderSpan, 1, { autoAlpha: 0, ease: Power3.easeOut });
  };

  return (
    <form className='meme-form' onSubmit={props.handleSubmit}>
      {props.state.texts.map((text) => (
        <div style={{ display: 'flex', paddingTop: 15 }}>
          <input
            className='input'
            key={text.id}
            type='text'
            name={text.text}
            placeholder='Funny text goes here....'
            value={text.text}
            onChange={props.handleChange.bind(this, text.id)}
          />
          <div
            className='color-input-container'
            style={{
              position: 'relative',
              paddingLeft: 15,
              height: 50,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: -125,
                left: -5,
                backgroundColor: '#92d7fc',
                borderRadius: 5,
                padding: 2,
                visibility: 'hidden',
              }}
              ref={(el) => (textSpan = el)}
            >
              Text Colour
            </span>
            <input
              className='colorPicker inverted'
              type='color'
              name='bottomColor'
              value={text.color}
              onChange={props.handleColorChange.bind(this, text.id)}
              onMouseEnter={handleTextShow}
              onMouseLeave={handleTextRemove}
            />

            <span
              style={{
                position: 'relative',
                top: -135,
                left: 90,
                backgroundColor: '#92d7fc',
                borderRadius: 5,
                padding: 2,
                visibility: 'hidden',
              }}
              ref={(el) => (borderSpan = el)}
            >
              Border Colour
            </span>
            <input
              className='colorPicker inverted'
              type='color'
              name='bottomBorderColor'
              value={text.borderColor}
              onChange={props.handleBorderColorChange.bind(this, text.id)}
              onMouseEnter={handleBorderShow}
              onMouseLeave={handleBorderRemove}
            />
          </div>
        </div>
      ))}
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

export default DisplayMeme;
