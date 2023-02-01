
import React, { useState, useRef } from "react";
import "./captureImage.css";


const CaptureImage = () => {
	const videoRef = useRef(null);
	const [imgSrc, setImgSrc] = useState(null);
	const[sendBtn,setSndBtn] = useState(false);
	const [hasCameraAccess, setHasCameraAccess] = useState(false);

	const handleStart = () => {
		setHasCameraAccess(true);

		navigator.mediaDevices.getUserMedia({ video: true, audio: false })
			.then(stream => {
				videoRef.current.srcObject = stream;
				videoRef.current.play();
			});
	};

	const handleCapture = () => {
		const canvas = document.createElement("canvas");
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
		setImgSrc(canvas.toDataURL("image/jpeg"));
		setSndBtn(true);
	};

	const Sendpic =() =>{
		setSndBtn(false);
		setImgSrc(false)
	}
	return (
		<div className="Capture">
			<video
				ref={videoRef}
				style={{ width: "100%", height: "300px" }}
			/>
			{/* <br /> */}
			<div>
				{!hasCameraAccess ? (
					<button className="btn btn-info"  onClick={handleStart}>Allow camera to capture</button>
				) : (
						<button className="btn btn-danger" onClick={handleCapture}>Capture</button>
				)}
			</div>
			<div>
			{imgSrc && (
				<img
					src={imgSrc}
					
				/>
			)}
				{sendBtn && (<button className="btn btn-info" onClick={Sendpic}>Send</button>)}
			</div>
		</div>
	);
};


export default CaptureImage;
