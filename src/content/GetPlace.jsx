import React, { useState, useEffect } from "react";

import CaptureImage from './CaptureImage'

const APIKEY = process.env.REACT_APP_API_KEY;

const now = new Date();

const year = now.getFullYear();
const month = now.getMonth() + 1; 
const day = now.getDate();
const hour = now.getHours();
const minute = now.getMinutes();
const second = now.getSeconds();

// format the date and time
const date = `${day}-${month}-${year}`;
const time = `${hour}: ${minute}:${second}`;
// var PIN = 0 

function GetLocation(props) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [PIN, setPIN] = useState(0)
	const [Full_address,set_Full_address] = useState("");
	useEffect(() => {
		if (!props.lat || !props.log) {
			return;
		}
		const fetchData = async () => {
			try {
				// const response = await fetch(
				// 	`https://api.geoapify.com/v1/geocode/reverse?lat=${props.lat}&lon=${props.log}&apiKey=${APIKEY}`
				// );
				const response = await fetch(
					`https://api.geoapify.com/v1/geocode/reverse?lat=13.2546&lon=74.7851&apiKey=${APIKEY}`
				);
				// const response = await fetch(
				// 	`https://api.geoapify.com/v1/geocode/reverse?lat=13.3424&lon=74.74731&apiKey=${APIKEY}`
				// );
				const jsonData = await response.json();
				setData(jsonData);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [props.lat, props.log]);
	useEffect(() => {
		if (data) {
			setPIN(data.features[0].properties.postcode);
			set_Full_address(data.features[0].properties.formatted)
		}
	}, [data]);

	if (loading) {
		return <p>Loading...</p>;
	}
	return <div>
		<p><b>Date : </b>{date}</p>
		<p><b>Time : </b>{time}</p>
	<p><b>SubUrban : </b>{data.features[0].properties.suburb}</p>
		<p><b>Street : </b>{data.features[0].properties.street}</p>
		<p><b>Address : </b>{data.features[0].properties.address_line1}<span> </span>{data.features[0].properties.address_line2}</p>
		<CaptureImage PIN={PIN} Full_address={Full_address}></CaptureImage>
	</div>;
}

export default GetLocation;



