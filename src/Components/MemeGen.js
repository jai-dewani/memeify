import React, { Component } from "react"
import Canvas from './Canvas'

import checkImageHeight from "../Utils/checkImageHeight"

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            texts: [
                {
                    id: 0,
                    text: "",
                    fill: "#000000",
                    stroke: "#FFFFFF",
                    strokeWidth: 1,
                    fontSize: 30,
                    x:250, 
                    y:50
                },
            ],
            allMemeImgs: [],
            imageData:{
                height: 335,
                width: 568,
                url: "http://i.imgflip.com/1bij.jpg",
                maxHeight: Math.floor(window.innerHeight*0.7),
                object: null,
            },
            updateImage: false,
        }
    }

    componentDidMount = () => {
        const { imageData } = this.state
        var image = new Image()
        image.src = imageData.url
        image.crossOrigin = "anonymous"
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const { memes } = response.data
            imageData.object = image
            this.setState({ allMemeImgs: memes, imageData}) 
        });
    }

    handleColorChange = (i, event) => {
        const { name, value } = event.target

        setTimeout(() => {
            var texts = [...this.state.texts];
            texts[i].fill = value; 

            this.setState({ [name]: value })
        }, 250);
    }

    handleBorderColorChange = (i, event) => {
        const { name, value } = event.target

        setTimeout(() => {
            var texts = [...this.state.texts];
            texts[i].stroke = value; 

            this.setState({ [name]: value })
        }, 250);
    }

    handleChange = (i, type, event) => {
        console.log(i)
        console.log(event);
        console.log(type);
        const { value } = event.target
        var texts = [...this.state.texts];
        switch(type){
            case "text":
                console.log(texts,value);
                texts[i].text = value;
                break; 
            case "strokeWidth":
                texts[i].strokeWidth = value;
                break;
            default: 
                break;
        }
        this.setText(texts);
    }


    setText = (text) => this.setState(text)

    handleAddText = (event) => {
        event.preventDefault()
        var texts = [...this.state.texts]
        texts.push({
            id:texts.length,
            text: "",
            fill: "#000000",
            stroke: "#FFFFFF",
            x:50, 
            y:50,
            fontSize: 30,
            strokeWidth: 1
        })
        this.setState({ texts });
    }

    handleRemoveText = (event) => {
        event.preventDefault()
        var texts = this.state.texts.slice(0,-1);
        this.setState({ texts });
    }

    handleRandomMemeClick = (event) => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const { url, width, height } = this.state.allMemeImgs[randNum]
        const {imageData} = this.state
        var { newHeight, newWidth } = checkImageHeight(width, height, this.state.imageData.maxHeight)
        console.log(width, height);
        console.log(newWidth, newHeight);

        var imageObj = new Image();
        imageObj.crossOrigin = "Anonymous"
        imageObj.height = imageData.height = newHeight
        imageObj.width = imageData.width = newWidth
        imageObj.src = imageData.url = url
        imageData.updateImage = true
        imageData.object = imageObj

        imageObj.onload = () => this.setState({ imageData })
    }

    handleFileChange = (event) => {
        const scope = this;
        const url = window.URL.createObjectURL(event.target.files[0])
        const img = new Image();
        img.onload = function() {
            const { newheight, newwidth } = checkImageHeight(this.width, this.height)
            scope.setState({ url, width: newwidth, height: newheight, updateImage: true })
        }
        img.src = url;
    }

    handleExport = (layer) => {
        const uri = layer.current.toDataURL();
        var link = document.createElement("a");
        link.download = "meme.png";
        link.href = uri;
        link.click();
    };

    render() {
        return (
            <Canvas 
                state={ this.state } 
                handleRandomMemeClick={ this.handleRandomMemeClick } 
                handleChange={ this.handleChange }
                handleColorChange={ this.handleColorChange }
                handleBorderColorChange={ this.handleBorderColorChange }
                handleFileChange={ this.handleFileChange } 
                handleAddText={ this.handleAddText }
                handleRemoveText={ this.handleRemoveText }
                handleTextSizeChange={ this.handleTextSizeChange }

                imageData = {this.state.imageData}
                texts = {this.state.texts}
                handleExport = {this.handleExport} 
                setImage = {this.setImage}
                setText={ this.setText } 
            />
        )
    }
}

export default MemeGenerator