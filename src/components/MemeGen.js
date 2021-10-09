import React, { Component } from "react"
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
                    text: "",
                    color: "#000000",
                    borderColor: "#FFFFFF",
                    height: null,
                    width: null,
                    size: 30,
                    x:250, 
                    y:50
                },
                {
                    id: 1,
                    text: "",
                    color: "#000000",
                    borderColor: "#FFFFFF",
                    height: null,
                    width: null,
                    size: 30,
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
            selectedText: -1
        }
        this.selectedText = -1;
        this.startX = undefined;
        this.startY = undefined;
    }
   
    getPos = (el) => {
        // yay readability
        var lx=0,ly=0;
        while(el!=null){
            lx += el.offsetLeft 
            ly += el.offsetTop 
            el = el.offsetParent
        }
        return {x: lx,y: ly};
    }

    textHittest = (x, y, textIndex) => {
        var text = this.state.texts[textIndex];
        return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
    }

    handleMouseDown = (e) => {
        console.log(this.state.texts);
        e.preventDefault();
        var offset, offsetX, offsetY;
        const { texts, canvas } = this.state;
        offset = this.getPos(canvas);
        offsetX = offset.x
        offsetY = offset.y
        this.startX = parseInt(e.clientX - offsetX);
        this.startY = parseInt(e.clientY - offsetY);
        // console.log(offsetX, offsetY, e.clientX, e.clientY)

        for (var i = 0; i < texts.length; i++) {
            if (this.textHittest(this.startX, this.startY, i)) {
                this.selectedText = i;
            }
        }
    }

    handleMouseMove = (e) => {
        e.preventDefault()
        var { canvas } = this.state;
        var offset, offsetX, offsetY, dx, dy;
        offset = this.getPos(canvas);
        offsetX = offset.x;
        offsetY = offset.y;
        var mouseX, mouseY
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
        // Put your mousemove stuff here
        dx = parseInt(mouseX - this.startX);
        dy = parseInt(mouseY - this.startY);
        // console.log("MouseMove",dx,dy,this.startX,this.startY,mouseX,mouseY,offsetX,offsetY, mouseX-this.startX);
        var texts = [...this.state.texts]
        texts[this.selectedText].x += dx;
        texts[this.selectedText].y += dy;
        this.startX = mouseX;
        this.startY = mouseY;
        this.setState({ texts })
    }

    handleMouseUp = (e) => {
        e.preventDefault();
        this.selectedText = -1;
    }
    handleMouseOut = (e) => {
        e.preventDefault();
        this.selectedText = -1;
    }

    componentDidMount = () => {
        const { url } = this.state
        var canvas = document.getElementById("my-canvas")
        var context = canvas.getContext("2d");
        var image = new Image()
        image.src = url 
        // console.log(image.src)
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const { memes } = response.data
            this.setState({ allMemeImgs: memes, image, canvas,context })
        }).then( () => {

            canvas.onmousedown = (e) => {
                e.preventDefault();
                this.handleMouseDown(e)
            }

            canvas.onmousemove  = (e) => {
                e.preventDefault();
                if(this.selectedText!==-1){
                    this.handleMouseMove(e)
                }
            }
         
            canvas.onmouseup = (e) => {
                e.preventDefault();
                this.handleMouseUp(e);
            }
          
            canvas.onmouseout = (e) => {
                e.preventDefault();
                this.handleMouseOut(e);
            }
        })
    }
    
    componentDidUpdate = () => {
        this.setImage()
    }

    setImage = () => {
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
                const { text, color, borderColor, x, y, size } = texts[i];
                context.font = `${size}px impact, sans-serif`
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

    

    handleChange = (i, event, eventType) => {
        var canvas = document.getElementById("my-canvas")
        var context = canvas.getContext("2d");
        const { value } = event.target
        console.log(this.state.texts, value);
        var texts = [...this.state.texts];
        switch(eventType){
            case "text":
                context.font = `${texts[i].size}px impact, sans-serif`
                texts[i].text = value;
                break;
            case "size":
                context.font = `${value}px impact, sans-serif`
                texts[i].size = value;
                break;
            default:
                break;
        }
        var canvasText = context.measureText(texts[i].text);
        console.log(context.measureText(value))
        texts[i].width = canvasText.width;
        texts[i].height = canvasText.actualBoundingBoxAscent + canvasText.actualBoundingBoxDescent;
        this.setState({ texts })
    }

    handleTextChange = (i, event) => {
        event.preventDefault()
        var type = "text";
        this.handleChange(i, event, type);
    }

    handleTextSizeChange = (i, event) => {
        event.preventDefault()
        this.handleChange(i, event, "size");
    }

    handleAddText = (event) => {
        event.preventDefault()
        var texts = [...this.state.texts]
        texts.push({
            id:texts.length,
            text: "",
            color: "#000000",
            borderColor: "#FFFFFF",
            x:50, 
            y:50,
            height: null, 
            width: null,
            size: 30
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
        this.setState({ url: url, width: width, height: height, updateImage: true})
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
                <Canvas />
            </div>
        )
    }
}

export default MemeGenerator