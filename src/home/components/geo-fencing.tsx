import { Alert, StyleSheet, View, AppState, Text } from "react-native";
import MapView, { Circle, Marker } from 'react-native-maps';
import React, { useEffect, useState } from "react";
import axiosInstance from "../../auth/services/axios.interceptor";
import { env } from "../../../env/env.dev";

const GeoFencing = () => {//24.4691935,
    const [region, setRegion] = useState({ latitude: 24.4691935, longitude: 54.3392032 });
    const [boundries, setBoundries] = useState([]);
    const [marker, setMarker] = useState({ latitude: 24.4691935, longitude: 54.3392032 });
    const [appState, setAppState] = useState(AppState.currentState);
    const geofenceRadius = 200;

    useEffect(() => {
        const fetchBoundaries = async () => {
            const response = await axiosInstance.get(`${env.coreServices}geo`);
            console.log(response.data, 'response');
            if (response.data) {
                setBoundries(response.data);
            }
        };
        fetchBoundaries();
    }, []);

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState.match(/inactive|background/) && nextAppState === "active") {
                console.log("App has come to the foreground!");
            } else if (nextAppState === "background") {
                console.log("App is now in the background!");
            }
            setAppState(nextAppState);
        };

        // Add AppState change listener
        const appStateListener = AppState.addEventListener("change", handleAppStateChange);

        // Configure Background Geolocation
        // BackgroundGeolocation.ready(
        //     {
        //         desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        //         distanceFilter: 50,
        //         stopOnTerminate: false,
        //         startOnBoot: true,
        //         preventSuspend: true,
        //         heartbeatInterval: 60,
        //         notification: {
        //             title: 'Background location is on',
        //             text: 'Background location is enabled',
        //         },
        //     },
        //     (state) => {
        //         if (!state.enabled) {
        //             BackgroundGeolocation.start();
        //         }
        //     }
        // );

        // // Add geofences for each boundary
        // boundries.forEach((boundary) => {
        //     console.log(boundary, 'boundary');
        //     BackgroundGeolocation.addGeofence({
        //         identifier: `Geofence-${boundary.id}`, // assuming boundary has a unique id
        //         radius: boundary.radius,
        //         latitude: boundary.location.latitude,
        //         longitude: boundary.location.longitude,
        //         notifyOnEntry: true,
        //         notifyOnExit: true,
        //     }).then(() => {
        //         console.log('[Geofence] successfully added');
        //     }).catch((error) => {
        //         console.warn('[Geofence] failed to add:', error);
        //     });
        // });

        // // Geofence event listener
        // BackgroundGeolocation.onGeofence((geofence) => {
        //     Alert.alert(
        //         'Geofence Event',
        //         `You have ${geofence.action === 'ENTER' ? 'entered' : 'exited'} the geofence ${geofence.identifier}`
        //     );
        // });

        // // Location event listener
        // BackgroundGeolocation.onLocation((location) => {
        //     if (typeof location !== 'undefined' && typeof location.coords !== 'undefined') {
        //         const { latitude, longitude } = location.coords;
        //         setMarker({ latitude, longitude });

        //         boundries.forEach((boundary) => {
        //             const distance = getDistance(
        //                 { latitude, longitude },
        //                 { latitude: boundary.location.latitude, longitude: boundary.location.longitude }
        //             );

        //             // Check if within the geofence radius
        //             if (distance <= boundary.radius) {
        //                 console.log("Inside geofence area.");
        //                 Alert.alert(
        //                     'Geofence Event',
        //                     `You have entered the geofence ${boundary.permises}`
        //                 );
        //             } else {
        //                 console.log("Outside geofence area.");
        //             }
        //         });
        //     }
        // });

        // // Cleanup function
        // return () => {
        //     appStateListener.remove();
        //     BackgroundGeolocation.removeGeofences();
        //     BackgroundGeolocation.removeListeners();
        // };
    }, [appState, boundries]);

    // Function to calculate distance between two coordinates
    const getDistance = (location1, location2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371e3; // Earth radius in meters
        const lat1 = toRad(location1.latitude);
        const lat2 = toRad(location2.latitude);
        const deltaLat = toRad(location2.latitude - location1.latitude);
        const deltaLon = toRad(location2.longitude - location1.longitude);

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    return (
        <View style={styles.container}>
           <MapView
                style={styles.map}
                initialRegion={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onPress={(e) => {
                    const newLocation = e.nativeEvent.coordinate;
                    console.log(newLocation, 'newLocation');
                    setMarker(newLocation);

                    boundries.forEach((boundary) => {
                        const distance = getDistance(
                            newLocation,
                            { latitude: boundary.location.latitude, longitude: boundary.location.longitude }
                        );

                        // Check if within the geofence radius
                        if (distance <= boundary.radius) {
                            console.log("Inside geofence area.");
                        } else {
                            console.log("Outside geofence area.");
                        }
                    });
                }}
            >
                <>
                    {/* Dynamic Marker to represent current location */}
                    <Marker coordinate={marker} title="Your Location" />

                    {/* Geofence Circles */}
                    {boundries.length > 0 && boundries.map((boundary, index) => (
                        <Circle
                            key={boundries[0].permises}
                            center={{
                                latitude: boundries[0].location.latitude,
                                longitude: boundries[0].location.longitude,
                            }}
                            radius={boundries[0].radius}
                            fillColor="rgba(255, 0, 0,0.2)"
                            strokeColor="rgba(255, 0, 0, 0.8)"
                            
                        />
                    ))}
                </>
            </MapView>
            {boundries.map((boundary, index) => (
                <View style={{flex: 1}}>
                    <Text>{boundary.location.latitude}</Text>
                    <Text>{boundary.location.longitude}</Text>
                    <Text>{boundary.radius}</Text>
                </View>
            ))}
        </View>
    );
};

export default GeoFencing;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '90%',
    },
});
