import React, { useState, useEffect, useRef } from "react";
import DragableText  from "./DragableText";
import { Stage, Layer } from "react-konva";
// import checkImageHeight from "../Utils/checkImageHeight";

// props contains => imageData, texts, handleExport(layer), setImage(layer, image)
const Canvas = (props) => {
	// const [image, setImage] = React.useState(props.image);
	const [texts, setTexts] = useState(props.texts)
	const [selectedId, selectText] = useState(null);
	const layerRef = useRef(null);

	const checkDoSelect = (e) => {
		const clickedOnEmpty = e.target === e.target.getStage();
		if (clickedOnEmpty) {
			selectText(null);
		}
	};

	useEffect(() => {
		props.setImage(layerRef.current,props.imageData);
	})

	return (
		<div className="canvas inverted" >
			<Stage 
				width={props.imageData.width}
				height={props.imageData.height}
				onContentMouseover
				onMouseDown={checkDoSelect}
				onTouchStart={checkDoSelect}
			>
				<Layer ref={layerRef}>
					
				</Layer>
				<Layer>
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
	);
}

export default Canvas