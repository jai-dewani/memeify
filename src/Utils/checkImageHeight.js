const checkImageHeight = (width, height, maxHeight) => {
    let newHeight = height
    let newWidth = width
    console.log(maxHeight);
    if (height>maxHeight){
        let ratio = maxHeight/height
        newWidth = width * ratio
        newHeight = maxHeight
        console.log("Change",newHeight, newWidth);
    }
    return {newHeight, newWidth}
}

export default checkImageHeight;