import { colors } from '@theme';
import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, GestureResponderEvent } from 'react-native';
import { spacing } from 'src/theme/spacing';

interface FABProps {
    onPress: (event: GestureResponderEvent) => void;
    icon: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    disabled?: boolean;
}

const FAB: React.FC<FABProps> = ({ onPress, icon, style, disabled }) => {
    return (
        <TouchableOpacity
            style={[
                styles.fab,
                style,
                {
                    backgroundColor: disabled ? colors.gray[100] : colors.mint[500],
                },
            ]}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled}>
            {React.cloneElement(icon as React.ReactElement, { fill: colors.white })}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        backgroundColor: colors.mint[500],
        width: 48,
        height: 48,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: spacing.sm,
    },
});

export default FAB;
