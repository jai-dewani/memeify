import React, { Component } from "react"
import DisplayMeme from './displayMeme'

const checkImageHeight = (width, height, maxHeight) => {
    let newheight = height
    let newwidth = width
    if (height>maxHeight){
        let ratio = maxHeight/height
        newwidth = width * ratio
        newheight = maxHeight
    }
    return {newheight, newwidth}
}

class MemeGenerator extends Component {
    constructor() {
        super()
        // Add a texts array insted of different text options,
        // Use this array to store objects having details like 
        // Text, color, BColor, size, font?maybe

        // Create a draw function which will be called after every change

        // http://jsfiddle.net/m1erickson/9xAGa/
        
        this.state = {
            topText: "",
            topColor: "#000000",
            topBorderColor: "#FFFFFF",
            bottomText: "",
            bottomColor: "#000000",
            bottomBorderColor: "#FFFFFF",
            height: 335,
            width: 568,
            url: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [],
            image: undefined,
            updateImage: false,
            maxHeight: Math.floor(window.innerHeight*0.8),
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.setImage = this.setImage.bind(this)
        this.setText = this.setText.bind(this)
        this.handleColorChnage = this.handleColorChnage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                console.log(response.data);
                this.setState({ allMemeImgs: memes })
            })
        this.setImage();
    }

    setImage() {
        const myCanvas = document.getElementById("my-canvas");
        const context = myCanvas.getContext("2d");
        const img = new Image()
        const { url, width, height, maxHeight } = this.state
        const { newheight, newwidth } = checkImageHeight(width, height, maxHeight);
        img.src = url
        console.log("setImage",url,newwidth,newheight)
        img.onload = () => {
            myCanvas.height = newheight
            myCanvas.width = newwidth
            context.drawImage(img, 0, 0, width, height, 0, 0, newwidth, newheight);
        }
        this.setState({ image: img })
    }

    setText() {
        const myCanvas = document.getElementById("my-canvas");
        const context = myCanvas.getContext("2d");
        const { image, topText, topColor, topBorderColor, bottomText, bottomColor, bottomBorderColor, height, width } = this.state
        // console.log("setText",topText,bottomText)
        context.drawImage(image, 0, 0, width, height, 0, 0, width, height);
        context.font = "2em impact, sans-serif"

        const topWidth = context.measureText(topText).width
        const bottomWidth = context.measureText(bottomText).width
        context.strokeStyle = topBorderColor
        context.strokeText(topText, width / 2 - topWidth / 2, 30)
        context.strokeStyle = bottomBorderColor
        context.strokeText(bottomText, width / 2 - bottomWidth / 2, height - 10)
        context.fillStyle = topColor
        context.fillText(topText, width / 2 - topWidth / 2, 30)
        context.fillStyle = bottomColor
        context.fillText(bottomText, width / 2 - bottomWidth / 2, height - 10)

        // console.log("RENDER TEXT");
    }
    handleColorChnage(event) {
        const { name, value } = event.target
        setTimeout(() => {
            this.setState({ [name]: value })
        }, 250);
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const { url, width, height } = this.state.allMemeImgs[randNum]
        // console.log("handleSubmit",url,width,height)
        this.setState({ url: url, width: width, height: height, updateImage: true })
    }

    handleFileChange(event) {
        const scope = this;
        const url = window.URL.createObjectURL(event.target.files[0])
        const img = new Image();
        img.onload = function() {
            const { newheight, newwidth } = checkImageHeight(this.width, this.height)
            scope.setState({ url, width: newwidth, height: newheight, updateImage: true })
        }
        img.src = url;
    }

    componentDidUpdate() {
        if (this.state.updateImage) {
            this.setState({ updateImage: false })
            this.setImage()
        }
        this.setText();
    }

    render() {
        return (
            <DisplayMeme 
                state={this.state} 
                handleSubmit={this.handleSubmit} 
                handleChange={this.handleChange}
                handleColorChnage={this.handleColorChnage}
                handleFileChange={this.handleFileChange} />
        )
    }
}

export default MemeGenerator