// This is a simplified version of the useFonts hook that doesn't depend on expo-font
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export const useFonts = (fontMap) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFonts = async () => {
            try {
                // For React Native CLI, fonts are linked at build time via react-native.config.js
                // We just need to manage the loading state
                console.log("Font families to use:", Object.keys(fontMap));
                
                // Short timeout to simulate loading and let React Native initialize
                setTimeout(() => {
                    console.log("Fonts ready to use:", Object.keys(fontMap));
                    setFontsLoaded(true);
                }, 100);
            } catch (error) {
                console.error('Error in font loading process:', error);
                setError(error);
                // Continue even with error
                setFontsLoaded(true); 
            }
        };

        loadFonts();
    }, []);
    
    console.log(`useFonts: ${Platform.OS} fonts loaded: ${fontsLoaded}`);
    return [fontsLoaded, error];
};