import { colors } from '@theme';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';

interface SideDrawerProps {
    visible: boolean;
    onClose: () => void;
    side: 'left' | 'right';
    children: React.ReactNode;
    drawerWidth?: number;
    overlayOpacity?: number;
    animationDuration?: number;
    drawerStyle?: ViewStyle;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
    visible,
    onClose,
    side,
    children,
    drawerWidth = 300,
    overlayOpacity = 0.5,
    animationDuration = 300,
    drawerStyle,
}) => {
    const screenWidth = Dimensions.get('window').width;
    const translateX = useRef(
        new Animated.Value(side === 'left' ? -drawerWidth : screenWidth),
    ).current;
    const overlayOpacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Open Drawer
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: animationDuration,
                    useNativeDriver: true,
                }),
                Animated.timing(overlayOpacityAnim, {
                    toValue: overlayOpacity,
                    duration: animationDuration,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            // Close Drawer
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: side === 'left' ? -drawerWidth : screenWidth,
                    duration: animationDuration,
                    useNativeDriver: true,
                }),
                Animated.timing(overlayOpacityAnim, {
                    toValue: 0,
                    duration: animationDuration,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [
        visible,
        translateX,
        overlayOpacityAnim,
        side,
        drawerWidth,
        screenWidth,
        animationDuration,
        overlayOpacity,
    ]);

    if (!visible) {
        return null;
    }

    return (
        <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
            <View style={styles.container}>
                {/* Overlay */}
                <TouchableWithoutFeedback onPress={onClose}>
                    <Animated.View style={[styles.overlay, { opacity: overlayOpacityAnim }]} />
                </TouchableWithoutFeedback>

                {/* Drawer */}
                <Animated.View
                    style={[
                        styles.drawer,
                        drawerStyle,
                        {
                            width: drawerWidth,
                            transform: [{ translateX }],
                            [side]: 0,
                        },
                    ]}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

export default SideDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.black,
    },
    drawer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        backgroundColor: colors.white,
        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
});
