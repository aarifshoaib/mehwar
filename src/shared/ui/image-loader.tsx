import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

interface RotatingImageLoaderProps {
    imageSource: any; // Can be require('../path/to/image.png') or {uri: 'url'}
    size?: number;
    duration?: number;
}

const RotatingImageLoader: React.FC<RotatingImageLoaderProps> = ({
    imageSource,
    size = 80,
    duration = 2000,
}) => {
    const spinValue = new Animated.Value(0);

    useEffect(() => {
        // Create the rotation animation
        const startRotation = () => {
            spinValue.setValue(0);
            Animated.timing(spinValue, {
                toValue: 1,
                duration: duration,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => startRotation()); // Loop the animation
        };

        startRotation();

        return () => {
            // Clean up animation (optional)
            spinValue.stopAnimation();
        };
    }, [spinValue, duration]);

    // Map 0-1 to 0-360 degrees
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                source={imageSource}
                style={[
                    styles.image,
                    {
                        width: size,
                        height: size,
                        transform: [{ rotate: spin }]
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
    },
});

export default RotatingImageLoader;