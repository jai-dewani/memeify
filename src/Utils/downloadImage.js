const handleDownloadClick = (event) => {
    event.preventDefault();
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

export default handleDownloadClick;