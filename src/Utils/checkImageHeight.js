const checkImageHeight = (width, height, maxHeight) => {
    let newHeight = height
    let newWidth = width
    if (height>maxHeight){
        let ratio = maxHeight/height
        newWidth = width * ratio
        newHeight = maxHeight
    }
    return {newHeight, newWidth}
}

export default checkImageHeight;