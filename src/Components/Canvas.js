import React, { useState, useRef } from "react";
import DragableText  from "./DragableText";
import { Stage, Layer, Image } from "react-konva";
import DisplayMeme from './DisplayMeme'

// props contains => imageData, texts, handleExport(layer), setImage(layer, image)
const Canvas = (props) => {
	const [selectedId, selectText] = useState(null);
	const layerRef = useRef(null);
	const stageRef = useRef(null);

	const checkDoSelect = (e) => {
		const clickedOnEmpty = e.target.index === 0;
		if (clickedOnEmpty) {
			selectText(null);
		}
	};

	const handleExport = (event) => {
		event.preventDefault()
		const uri = stageRef.current.toDataURL();
		var link = document.createElement("a");
		link.download = "meme.png";
		link.href = uri;
		link.click();
	  };

	return (
		<div className="memeRoot">
			<DisplayMeme 
				state={ props.state } 
				handleRandomMemeClick={ props.handleRandomMemeClick } 
				handleChange={ props.handleChange }
				handleColorChange={ props.handleColorChange }
				handleBorderColorChange={ props.handleBorderColorChange }
				handleFileChange={ props.handleFileChange } 
				handleAddText={ props.handleAddText }
				handleRemoveText={ props.handleRemoveText }
				handleTextSizeChange={ props.handleTextSizeChange }
				handleDownloadClick = { handleExport }
			/>
			<div className="canvas inverted" >
			<Stage 
				width= { props.imageData.width }
				height= { props.imageData.height }
				onMouseDown= { checkDoSelect }
				onTouchStart= { checkDoSelect }
				ref = { stageRef }
				onContentMouseover
			>
				<Layer ref={layerRef} >
					<Image
						x={0}
						y={0}
						image={props.imageData.object}
					/>
					{props.texts.map((text, i) => {
						return (
							<DragableText
								key={i}
								shapeProps={text}
								isSelected={text.id === selectedId}
								onSelect={ () => selectText(text.id) }
								onChange={(newAttrs) => {
									const rects = props.texts.slice();
									rects[i] = newAttrs;
									props.setText(rects);
								}}
							/>
						);
					})}
				</Layer>
			</Stage>
			</div>
		</div>
		
	);
}

export default Canvas