import React from "react";
import { useGeolocated } from "react-geolocated";
import GetPlace from "./GetPlace"

const GetLocation = () => {
	const { coords, isGeolocationAvailable, isGeolocationEnabled } =
		useGeolocated({
			positionOptions: {
				enableHighAccuracy: false,
			},
			userDecisionTimeout: 5000,
		});
	return !isGeolocationAvailable ? (
		<div>Your browser does not support Geolocation</div>
	) : !isGeolocationEnabled ? (
		<div>Geolocation is not enabled</div>
	) : coords ? (
		<GetPlace lat={coords.latitude} log={coords.longitude} />
	) : (
		<div>Getting the location data&hellip; </div>
	);
};

export default GetLocation;





