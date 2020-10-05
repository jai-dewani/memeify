import React, {Component } from "react"
import DisplayMeme from './displayMeme'
import $ from 'jquery';
   
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
            topText: "",
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
            isDragging: false,
            x: 50,
            y: 50

        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.setImage = this.setImage.bind(this)
        this.setText = this.setText.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
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
        img.onload = () => {
            myCanvas.height = newheight
            myCanvas.width = newwidth
            context.drawImage(img, 0, 0, width, height, 0, 0, newwidth, newheight);
        }
        this.setState({ image: img })
    }

    setText() {
        const myCanvas = document.getElementById("my-canvas");
        const mySubmit1 = document.getElementById("submit1");
        const context = myCanvas.getContext("2d");
        const { image, topText, bottomText, bottomColor, bottomBorderColor, height, width } = this.state
        context.drawImage(image, 0, 0, width, height, 0, 0, width, height);
        var $canvas = $("#my-canvas");
        var canvasOffset = $canvas.offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var startX;
        var startY; 
        var mouseX;
        var mouseY;
        var texts = [];   
        var selectedText = -1;
        // test if x,y is inside the bounding box of texts[textIndex]
        function draw() {
            context.clearRect(0, 0, myCanvas.width, myCanvas.height);
            context.drawImage(image, 0, 0, width, height, 0, 0, width, height);
            for (var i = 0; i < texts.length; i++) {
                var text = texts[i];
                context.fillText(text.text, text.x, text.y);
            }
           
        }
        function textHittest(x, y, textIndex) {
            var text = texts[textIndex];
            return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
        }


        function handleMouseDown(e) {
            e.preventDefault();
            startX = parseInt(e.clientX - offsetX);
            startY = parseInt(e.clientY - offsetY);
            // Put your mousedown stuff here
            for (var i = 0; i < texts.length; i++) {
                if (textHittest(startX, startY, i)) {
                    selectedText = i;
                }
            }
        }
        function handleMouseUp(e) {
            e.preventDefault();
            selectedText = -1;
        }
        function handleMouseOut(e) {
            e.preventDefault();
            selectedText = -1;
        }
        function handleMouseMove(e) {
            if (selectedText < 0) {
                return;
            }
            e.preventDefault();
            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);
            // Put your mousemove stuff here
            var dx = mouseX - startX;
            var dy = mouseY - startY;
            startX = mouseX;
            startY = mouseY;

            var text = texts[selectedText];
            text.x += dx;
            text.y += dy;
            draw()
            
        } 

        myCanvas.onmousedown = function(evt){
            evt.preventDefault()
            handleMouseDown(evt);
        }
        myCanvas.onmousemove = function(evt){
            evt.preventDefault()
            handleMouseMove(evt);
        }
     
        myCanvas.onmouseup = function(evt){
            evt.preventDefault()
            handleMouseUp(evt);
        }
      
        myCanvas.onmouseout = function(evt){
            evt.preventDefault()
            handleMouseOut(evt);
        }
        mySubmit1.onclick = function (evt) {
            evt.preventDefault()
            // calc the y coordinate for this text on the canvas
            var y = texts.length * 20 + 20;
        
            // get the text from the input element
            var text1 = {
                text: topText,
                x: 20,
                y: y,
                flag:false
            };
            var text2 = {
                text: bottomText,
                x: 20,
                y: y,
                flag:true
            }

        
            // calc the size of this text for hit-testing purposes
            context.font = "2em impact, sans-serif"
            text1.width = context.measureText(text1.text).width;
            text2.width = context.measureText(text2.text).width;
            context.strokeStyle = bottomBorderColor
            context.strokeText(text1.text, width / 2 - text1.width / 2, 30)
            context.strokeText(text2.text, width / 2 - text2.width / 2, 30)
            context.fillStyle = bottomColor
            context.fillText(text1.text, width / 2 - text1.width / 2, 30)
            context.fillText(text2.text, width / 2 - text2.width / 2, 30)
            text1.height = 36;
            text2.height = 36;
            // put this new text in the texts array
            texts.push(text1);
            texts.push(text2);
            // redraw everything
            draw();
        }
        
    }

    handleColorChange(event) {
        const { name, value } = event.target
        setTimeout(() => {
            this.setState({ [name]: value })
        }, 250);
    }

    handleChange(event) {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({ [name]: value})
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const { url, width, height } = this.state.allMemeImgs[randNum]
        this.setState({ url: url, width: width, height: height, updateImage: true})
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
                state={ this.state } 
                handleSubmit={ this.handleSubmit } 
                handleChange={ this.handleChange }
                handleChangeBT={ this.handleChangeBT }
                handleColorChange={ this.handleColorChange }
                handleFileChange={ this.handleFileChange } 
            />
        )
    }
}

export default MemeGenerator