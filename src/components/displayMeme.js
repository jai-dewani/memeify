import React from "react";

function displayMeme(props) {
  function handleDownload(el) {
    let canvas = document.getElementById("my-canvas");
    return false;
    var image = canvas.toDataURL("image/jpg");
    el.href = image;
  }

  return (
    <div className="memeRoot">
      <form className="meme-form" onSubmit={props.handleSubmit}>
        <input
          id="tText"
          type="text"
          name="topText"
          placeholder="Top Text"
          value={props.state.topText}
          onChange={props.handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={props.state.bottomText}
          onChange={props.handleChange}
        />
        <button id="submit1" className="inverted">
          Submit
        </button>
        <section className="color-picker">
          <label htmlFor="bottomColor"> Text Color </label>
          <input
            type="color"
            name="bottomColor"
            value={props.state.bottomColor}
            onChange={props.handleColorChange}
          />
        </section>
        <section className="color-picker">
          <label htmlFor="bottomColor"> Border Color </label>
          <input
            type="color"
            name="bottomBorderColor"
            value={props.state.bottomBorderColor}
            onChange={props.handleColorChange}
          />
        </section>
        <button type="submit" className="inverted">
          Random
        </button>
        <span>or</span>
        <button
          className="cutom-file-upload"
          type="button"
          onClick={() => {
            const input = document.getElementById("file-upload");
            input.click();
          }}
          className="inverted"
        >
          Upload Your Photo
        </button>
        <input id="file-upload" type="file" onChange={props.handleFileChange} />
        <a
          id="download"
          download="meme.jpg"
          href=""
          onClick={() => handleDownload(this)}
          className="download-meme"
        >
          Download
        </a>
      </form>
      <div className="meme">
        <center>
          <canvas
            id="my-canvas"
            className="inverted"
            width="568px"
            height="335px"
          />
        </center>
      </div>
    </div>
  );
}

export default displayMeme;
