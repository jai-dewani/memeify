import React, {Component } from "react"
import DisplayMeme from './displayMeme'
import Canvas from './canvas'

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

        this.state = {
            texts: [
                {
                    id: 0,
                    text: "Top",
                    color: "#000000",
                    borderColor: "#FFFFFF",
                    size: 10,
                    x:250, 
                    y:50
                },
                {
                    id: 1,
                    text: "Bottom",
                    color: "#000000",
                    borderColor: "#FFFFFF",
                    size: 10,
                    x:250, 
                    y:300
                },
            ],
            context: undefined, 
            canvas: undefined,
            topText: "",
            bottomText: "",
            bottomColor: "#000000",
            bottomBorderColor: "#FFFFFF",
            height: 335,
            width: 568,
            url: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [],
            image: undefined,
            maxHeight: Math.floor(window.innerHeight*0.8),
            updateImage: false,
            // isDragging: false,
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRandomClick = this.handleRandomClick.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleAddText = this.handleAddText.bind(this)
        this.handleRemoveText = this.handleRemoveText.bind(this)
        this.selectedText = -1;
    }

    

    componentDidMount() {
        const { url } = this.state
        var image = new Image()
        image.src = url 
        console.log(image.src)
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const { memes } = response.data
            this.setState({ allMemeImgs: memes, image })
        }).then( () => {
            var canvas = document.getElementById("my-canvas")
            var context = canvas.getContext("2d");
            this.setState({
                context,
                canvas,
            })
            console.log(this.state);
            // canvas.onmousedown = function(evt){
            //     evt.preventDefault();
            //     this.handleMouseDown(evt);
            // }
            // canvas.onmousemove = function(evt){
            //     evt.preventDefault();
            //     this.handleMouseMove(evt);
            // }
         
            // canvas.onmouseup = function(evt){
            //     evt.preventDefault();
            //     this.handleMouseUp(evt);
            // }
          
            // canvas.onmouseout = function(evt){
            //     evt.preventDefault();
            //     this.handleMouseOut(evt);
            // }
        })
    }
    
    componentDidUpdate() {
        this.setImage()
    }





    // textHittest = (x, y, textIndex) => {
    //     var text = this.texts[textIndex];
    //     return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
    // }

    // handleMouseDown(e){
    //     e.preventDefault();
    //     var startX, startY;
    //     const { offsetY, offsetX } = this.state; 
    //     startX = parseInt(e.clientX - offsetX);
    //     startY = parseInt(e.clientY - offsetY);
    //     // Put your mousedown stuff here
    //     for (var i = 0; i < this.texts.length; i++) {
    //         if (this.textHittest(startX, startY, i)) {
    //             this.selectedText = i;
    //         }
    //     }
    // }

    // handleMouseMove(e){
    //     e.preventDefault()
    //     if (this.selectedText < 0) {
    //         return;
    //     }
    //     var canvasOffset = document.getElementById("my-canvas").offset();
    //     var offsetX = canvasOffset.left;
    //     var offsetY = canvasOffset.top;
    //     var mouseX, mouseY, startX, startY
    //     mouseX = parseInt(e.clientX - offsetX);
    //     mouseY = parseInt(e.clientY - offsetY);
    //     // Put your mousemove stuff here
    //     var dx = mouseX - startX;
    //     var dy = mouseY - startY;
    //     startX = mouseX;
    //     startY = mouseY;
    
    //     var text = this.state.texts[this.selectedText];
    //     text.x += dx;
    //     text.y += dy;
    //     this.setImage()
    // }

    // handleMouseUp(e){
    //     e.preventDefault();
    //     this.selectedText = -1;
    // }
    // handleMouseOut = (e) => {
    //     e.preventDefault();
    //     this.selectedText = -1;
    // }

    setImage = () => {
        console.log(this.state);
        const { image, texts, height, width, url, maxHeight } = this.state
        var canvas = document.getElementById("my-canvas")
        var context = canvas.getContext("2d");
        // context.clearRect(0, 0, canvas.width, canvas.height);
        image.src = url;
        image.crossOrigin = "anonymous"
        const { newheight, newwidth } = checkImageHeight(width, height, maxHeight);
        image.onload = () => {
            canvas.height = newheight
            canvas.width = newwidth
            context.drawImage(image, 0, 0, width, height, 0, 0, newwidth, newheight);
            for (var i = 0; i < texts.length; i++) {
                context.font = "2em impact, sans-serif"
                const { text, color, borderColor, x, y, size } = texts[i];
                const topWidth = context.measureText(text).width
                context.strokeStyle = borderColor
                context.strokeText(text, x, y)
                context.fillStyle = color
                context.fillText(text, x, y)
            }
        }
    }
    
    handleColorChange = (i, event) => {
        const { name, value } = event.target

        setTimeout(() => {
            var texts = [...this.state.texts];
            texts[i].color = value; 

            this.setState({ [name]: value })
        }, 250);
    }

    handleBorderColorChange = (i, event) => {
        const { name, value } = event.target

        setTimeout(() => {
            var texts = [...this.state.texts];
            texts[i].borderColor = value; 

            this.setState({ [name]: value })
        }, 250);
    }

    handleChange(i, event) {
        event.preventDefault()
        const { value } = event.target
        var texts = [...this.state.texts];
        texts[i].text = value;
        this.setState({ texts })
    }

    handleAddText(event){
        event.preventDefault()
        var texts = [...this.state.texts]
        texts.push({
            id:texts.length,
            text: "",
            color: "#000000",
            borderColor: "#FFFFFF",
            size: 10,
            x:50, 
            y:50
        })
        this.setState({ texts });
    }

    handleRemoveText(event){
        event.preventDefault()
        var texts = this.state.texts.slice(0,-1);
        this.setState({ texts });
    }

    handleRandomClick(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const { url, width, height } = this.state.allMemeImgs[randNum]
        this.setState({ url: url, width: width, height: height, updateImage: true})
        console.log(this.state)
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

    handleDownloadClick(event){
        event.preventDefault();
        console.log(event);
        var canvas = document.getElementById("my-canvas")
        var image = canvas.toDataURL("image/jpeg");
        var img = new Image();
        img.crossOrigin="anonymous"
        img.href=image
        var link = document.createElement('a');
        link.download = "meme.jpeg"
        link.href=image 
        link.click()
    }

    render() {
        return (
            <div className="memeRoot">
                <DisplayMeme 
                    state={ this.state } 
                    handleRandomClick={ this.handleRandomClick } 
                    handleChange={ this.handleChange }
                    handleChangeBT={ this.handleChangeBT }
                    handleColorChange={ this.handleColorChange }
                    handleBorderColorChange={ this.handleBorderColorChange }
                    handleFileChange={ this.handleFileChange } 
                    handleAddText={ this.handleAddText }
                    handleRemoveText={ this.handleRemoveText }
                    handleDownloadClick={ this.handleDownloadClick }
                />
                <Canvas />
            </div>
        )
    }
}

export default MemeGenerator