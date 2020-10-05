import React from 'react';

function EditMeme(props){
    return (
        <form className="meme-form" onSubmit={ props.handleSubmit }>
            <section>
                <input
                    type="text"
                    name="topText"
                    placeholder="Top Text"
                    value={ props.state.topText }
                    onChange={ props.handleChange }
                />
            </section>
            <section>
                <label for="topColor"> Text Color </label>
                <input
                    type="color"
                    name="topColor"
                    value={ props.state.topColor }
                    onChange={ props.handleColorChange }
                />
            </section>
            <section>
                <label for="TopBorderColor"> Border Color </label>
                <input
                    type="color"
                    name="topBorderColor"
                    value={ props.state.topBorderColor }
                    onChange={ props.handleColorChange }
                />
            </section>
            <section>
                <input
                    type="text"
                    name="bottomText"
                    placeholder="Bottom Text"
                    value={ props.state.bottomText }
                    onChange={ props.handleChange }
                />
            </section>
            <section className="color-picker">
                <label for="bottomColor"> Text Color </label>
                <input
                    type="color"
                    name="bottomColor"
                    value={ props.state.bottomColor }
                    onChange={ props.handleColorChange }
                />
            </section>
            <section className="color-picker">
                <label for="bottomBorderColor"> Border Color </label>
                <input
                    type="color"
                    name="bottomBorderColor"
                    value={ props.state.bottomBorderColor }
                    onChange={ props.handleColorChange }
                />
            </section>
            <button>Gen</button>
        </form>           
    )
}

export default EditMeme