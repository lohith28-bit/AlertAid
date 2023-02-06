import React, { useState, useEffect } from "react";

const APIKEY = process.env.REACT_APP_API_KEY;

function GetLocation(props) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (!props.lat || !props.log) {
			return;
		}
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://api.geoapify.com/v1/geocode/reverse?lat=${props.lat}&lon=${props.log}&apiKey=${APIKEY}`
				);
				const jsonData = await response.json();
				setData(jsonData);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [props.lat, props.log]);

	if (loading) {
		return <p>Loading...</p>;
	}
	return <p>{data.features[0].properties.address_line1}<span> </span>{data.features[0].properties.address_line2}</p>;
}

export default GetLocation;



