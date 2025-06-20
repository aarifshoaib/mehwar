import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, forwardRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface ModalSheetProps {
    children: ReactNode;
    snap: string[];
    enablePanDownToClose?: boolean;
    onDismiss?: () => void;
}

// Define the component using forwardRef
const ModalSheet = forwardRef<any, ModalSheetProps>(({ children, snap = ['90%'], enablePanDownToClose = true, onDismiss = null }, ref,) => {
    return (
        <View style={styles.container}>
            <BottomSheetModal handleStyle={styles.handleStyle} backgroundStyle={styles.backgroundStyle} containerStyle={styles.bottomSheetContainer} onDismiss={onDismiss} ref={ref} index={0} snapPoints={snap} enablePanDownToClose={enablePanDownToClose} style={styles.sheet}>
                {children}
            </BottomSheetModal>
        </View>
    );
});

export default ModalSheet

const styles = StyleSheet.create({
    sheet: {
        /* shadowOffset: {
             width: 0,
             height: -2,
         },
         shadowOpacity: .2,
         shadowRadius: 4.6,
         shadowColor: '#000',
         elevation: 7, */
    },
    container: {
        flex: 1,

    },
    handleStyle: {
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        shadowColor: '#000',

    },
    backgroundStyle: {
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: .15,
    },
    bottomSheetContainer: {
        backgroundColor: '#ffffff67',
    }
})