import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Platform } from 'react-native';
import { darkenColor, theme } from '../theme';
import AppIcon from '../ui/icons';

const AccordionItem = ({ number, isLast = false, title, children, style = { headerStyle: {}, contentStyle: {} }, accordionType = null }) => {
    const [expanded, setExpanded] = useState(false);
    const animationHeight = useRef(new Animated.Value(0)).current; // Initial height
    const [headerBg, setHeaderBg] = useState(theme.tint);
    const [headerTintColor, setHeaderTintColor] = useState(theme.primary);
    const [borderColor, setBorderColor] = useState(null);
    const toggleAccordion = () => {
        const finalValue = expanded ? 0 : 1; // Determine final value based on expanded state

        Animated.timing(animationHeight, {
            toValue: finalValue, // Animate to final value
            duration: 300, // Duration in milliseconds
            useNativeDriver: false, // 'height' and 'maxHeight' cannot be animated using native driver
        }).start();

        setExpanded(!expanded);
    };

    useEffect(() => {
        switch (accordionType) {
            case 'danger':
                if (expanded) {
                    setHeaderBg(theme.dangerBgTint);
                    setHeaderTintColor(theme.dangerBG);
                    setBorderColor(theme.dangerBorder);
                } else {
                    setHeaderBg(theme.dangerBG);
                    setHeaderTintColor(theme.dangerBgTint);
                    setBorderColor(theme.dangerBorder);
                }
                break;
            case 'warning':
                if (expanded) {
                    setHeaderBg(theme.warningBgTint);
                    setHeaderTintColor(theme.warningBG);
                    setBorderColor(theme.warningBorder);
                } else {
                    setHeaderBg(theme.warningBG);
                    setHeaderTintColor(theme.warningBgTint);
                    setBorderColor(theme.warningBorder);
                }
                break;
            default:
                if (expanded) {
                    setHeaderBg(theme.primary);
                    setHeaderTintColor(theme.tint);
                } else {
                    setHeaderBg(theme.tint);
                    setHeaderTintColor(theme.primary);
                }
                break;
        }

    }, [accordionType, expanded])

    const maxHeight = animationHeight.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'], // Adjust these values as needed
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleAccordion} style={{ ...(expanded) ? styles.expandedHeader : styles.notExpandHeader, ...styles.header, ...style.headerStyle, ...(isLast && !expanded) ? { borderBottomStartRadius: theme.controlBorderRadius, borderBottomEndRadius: theme.controlBorderRadius } : { borderRadius: 0 }, backgroundColor: headerBg, borderColor: headerBg }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ ...styles.headerText, ...{ fontWeight: 'bold', color: headerTintColor, fontSize: 18 } }}>{number}</Text>
                    <Text style={{ ...styles.headerText, ...{ color: headerTintColor } }}>{title}</Text>
                </View>
                <AppIcon type={'feather'} name={(expanded) ? 'chevron-up' : 'chevron-down'} color={headerTintColor} size={20} />
            </TouchableOpacity>
            {expanded && <Animated.View style={[styles.accordionContainer, styles.body, { maxHeight }, style?.contentStyle, (isLast && expanded) ? styles.expandedAccordionContainerLast : null]}>
                {children}
            </Animated.View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',    
        // backgroundColor: theme.tint,
    },
    headerText: {
        textAlign: 'left',
        fontFamily: theme.fontFamily,
        fontSize: 17
    },
    body: {
        overflow: 'hidden',
        paddingHorizontal: 15,
        paddingVertical: 0,

    },
    notExpandHeader: {
        borderWidth: 0,
    },
    expandedHeader: {
        borderWidth: 0,
        borderStartWidth: 1,
        borderEndWidth: 1,
    },
    expandedHeaderText: {
        color: theme.tint
    },
    accordionContainer: {
        borderStartWidth: 1,
        borderEndWidth: 1,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderColor: theme.primary, //darkenColor(theme.tint, .1),
        borderRadius: 0
    },
    accordionContainerLast: {
        borderBottomWidth: 0
    },
    expandedAccordionContainerLast: {
        borderBottomWidth: 1,
        borderBottomColor: theme.primary,
        borderBottomEndRadius: theme.controlBorderRadius,
        borderBottomStartRadius: theme.controlBorderRadius,
    },
    expandedAccordionContainer: {
        borderTopWidth: 0,
        borderColor: theme.primary,
        borderBottomEndRadius: theme.controlBorderRadius,
        borderBottomStartRadius: theme.controlBorderRadius,
    }
});

export default AccordionItem;
