import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import React from 'react'
import { appImages } from '../constants/images';
import LottieView from 'lottie-react-native';
import { appAnimations } from '../constants/animations';

const SplashScreen = ({ onLayoutRootView }) => {


    return (
        <View style={styles.container}>
            {<View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'center', width: '100%' }}>
                <LottieView source={appAnimations['splash']} style={{ paddingTop: 180, paddingHorizontal: 240, alignItems: 'flex-end', justifyContent: 'flex-end' }} progress={1} autoPlay={true} loop={false} />
            </View>}
            <View style={{ flex: 1, backgroundColor: 'pinkd', justifyContent: 'flex-end' }}>
                <Image
                    style={styles.logoImage}
                    resizeMode='stretch'
                    source={appImages['adportsLogo']}
                />
            </View>
        </View>
        // <View
        //     style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        //     onLayout={onLayoutRootView}>
        //     {<View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'center', width: '100%' }}>
        //         <LottieView source={appAnimations['splash']} style={{ paddingTop: 190, paddingHorizontal: 240, alignItems: 'flex-end', justifyContent: 'flex-end' }} progress={1} autoPlay={true} loop={false} />
        //     </View>}
        //     <View style={{ flex: 1, backgroundColor: 'pinkd', justifyContent: 'flex-end' }}>
        //         <Image
        //             style={styles.logoImage}
        //             resizeMode='stretch'
        //             source={appImages['adportsLogo']}
        //         />
        //     </View>
        // </View >
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 50,
        width: 250,
        height: 87
    },
    logoImage: {
        height: 30,
        width: 162,
        marginBottom: 50
    },
})