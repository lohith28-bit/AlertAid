import React, { useRef, useState } from 'react';
import "./captureImage.css";

function CaptureImage(props) {
	const [image, setImage] = useState(null);
	const fileInputRef = useRef(null);
	const [sendBtn, setSndBtn] = useState(false);
	const [response, setResponse] = useState(null);

	const handleFileSelect = async e => {
		const file = e.target.files[0];
		const imageUrl = URL.createObjectURL(file);
		setImage(imageUrl);
		setSndBtn(true);
		setResponse(null); // Reset the response state
	};

	const sendpic = async () => {
		// console.log(props.PIN);

		const formData = new FormData();
		formData.append('image', fileInputRef.current.files[0]);
		await fetch('/upload-image', {
			method: 'POST',
			body: formData
		})
		// .then(
		// 	res => res.json()).then(
		// 		data2 => {
		// 			// console.log(data2);
		// 			// setResponse(data1);
		// 		}
		// 	)
		fetch(`/send_sms/${props.Full_address}`)
			.then(
				res => res.json()).then(
					data3 => {
						console.log(data3);
					}
				)
		await fetch(`/Automate_Police_Hospital/${props.PIN}`).then(
			res => res.json()).then(
				data1 => {
					console.log(data1);
					setResponse(data1);
				}
			)
		setSndBtn(false);
		setImage(null);
	};

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
			{sendBtn && <button className="btn btn-info" onClick={sendpic}>Send</button>}
			{response && <div className="response"><b>We have alerted the nearby hospital and police station through their numbers {JSON.stringify(response.Hospital_Contact_no)} and {JSON.stringify(response.Police_Contact_no)}</b></div>}
		</div>
	);
}

export default CaptureImage;

