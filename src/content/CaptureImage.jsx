import React, { useRef, useState } from 'react';
import "./captureImage.css";

function CaptureImage() {
	const [image, setImage] = useState(null);
	const fileInputRef = useRef(null);
	//
	const [sendBtn, setSndBtn] = useState(false);

	const handleFileSelect = async e => {
		const file = e.target.files[0];

		const imageUrl = URL.createObjectURL(file);
		const image = new Image();
		image.src = imageUrl;

		await new Promise((resolve, reject) => {
			image.onload = resolve;
			image.onerror = reject;
		});

		const canvas = document.createElement('canvas');
		const maxSize = 500;
		let { width, height } = image;
		if (width > height) {
			if (width > maxSize) {
				height *= maxSize / width;
				width = maxSize;
			}
		} else {
			if (height > maxSize) {
				width *= maxSize / height;
				height = maxSize;
			}
		}
		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0, width, height);

		const resizedImageUrl = canvas.toDataURL('image/jpeg');
		setImage(resizedImageUrl);
		setSndBtn(true);
	};
	const sendpic = () => {
		setSndBtn(false);
		setImage(false)
	}
	return (
		<div>
			<input
				type="file"
				accept="image/*"
				capture="environment"
				ref={fileInputRef}
				onChange={handleFileSelect}
				style={{ display: 'none' }}
			/>
			<button className='btn btn-danger' onClick={() => fileInputRef.current.click()}>
				Capture
			</button>
			{image && <img src={image} alt="captured" height={300} width={300} />}
			{sendBtn && (<button className="btn btn-info" onClick={sendpic}>Send</button>)}
		</div>
	);
}

export default CaptureImage;