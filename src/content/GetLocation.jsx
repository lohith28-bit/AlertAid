import React, { useState, useEffect } from 'react';
import GetPlace from "./GetPlace"
function GetLocation() {
	const [location, setLocation] = useState({});
	
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					});
				},
				error => console.error(error)
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
		}
	}, []);

	return (
		<div>
			<GetPlace lat={location.latitude} log={location.longitude}/>

		</div>
	);
}

export default GetLocation;
