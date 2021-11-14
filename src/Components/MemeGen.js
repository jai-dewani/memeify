import React, { Component } from "react"
import DisplayMeme from './displayMeme'
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
                    fillColor: "#000000",
                    strokeColor: "#FFFFFF",
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

    setImage = (layer, imageData) => {
        var canvas = layer.getCanvas()
        var context = canvas.getContext("2d")
        var image;
        if(imageData.object==null)
            image = new Image();
        else
            image = imageData.object
        image.src = imageData.url
        image.crossOrigin = "anonymous"
        image.onload = () => {
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, imageData.width, imageData.height)        
        }
    }

    handleColorChange = (i, event) => {
        const { name, value } = event.target

        setTimeout(() => {
            var texts = [...this.state.texts];
            texts[i].fillColor = value; 

            this.setState({ [name]: value })
        }, 250);
    }

    handleBorderColorChange = (i, event) => {
        const { name, value } = event.target

        setTimeout(() => {
            var texts = [...this.state.texts];
            texts[i].strokeColor = value; 

            this.setState({ [name]: value })
        }, 250);
    }

    handleTextChange = (i, event) => {
        event.preventDefault()
        const { value } = event.target
        console.log(this.state.texts, value);
        var texts = [...this.state.texts];
        texts[i].text = value;
        this.setText(texts);
    }

    setText = (text) => this.setState(text)

    handleAddText = (event) => {
        event.preventDefault()
        var texts = [...this.state.texts]
        texts.push({
            id:texts.length,
            text: "",
            fillColor: "#000000",
            strokeColor: "#FFFFFF",
            x:50, 
            y:50,
            fontSize: 30
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
        console.log("Width",width, newWidth);
        console.log("Height",height, newHeight);
        
        imageData.height = newHeight
        imageData.width = newWidth
        imageData.url = url
        imageData.updateImage = true

        this.setState({ imageData })
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
        console.log(uri);
        var link = document.createElement("a");
        link.download = "meme.png";
        link.href = uri;
        link.click();
    };

    render() {
        return (
            <div className="memeRoot">
                <DisplayMeme 
                    state={ this.state } 
                    handleRandomMemeClick={ this.handleRandomMemeClick } 
                    handleTextChange={ this.handleTextChange }
                    handleColorChange={ this.handleColorChange }
                    handleBorderColorChange={ this.handleBorderColorChange }
                    handleFileChange={ this.handleFileChange } 
                    handleAddText={ this.handleAddText }
                    handleRemoveText={ this.handleRemoveText }
                    handleTextSizeChange={ this.handleTextSizeChange }
                />
                <Canvas 
                    imageData = {this.state.imageData}
                    texts = {this.state.texts}
                    handleExport = {this.handleExport} 
                    setImage = {this.setImage}
                    setText={ this.setText } 
                />
            </div>
        )
    }
}

export default MemeGenerator