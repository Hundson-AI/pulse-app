// ContextMenu.js
import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';

interface ContextMenuProps {
    options: ContextMenuOption[];
    onOptionSelect: (option: any) => void;
    TriggerComponent?: React.ReactNode;
    triggerStyle?: any;
    triggerProps?: any;
}

export interface ContextMenuOption {
    label: string;
    value: any;
}

const ContextMenu: FC<ContextMenuProps> = ({
    options,
    onOptionSelect,
    TriggerComponent,
    triggerStyle,
    triggerProps,
}) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <View style={styles.container}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchorPosition="bottom"
                contentStyle={styles.menuContainer}
                anchor={
                    <TouchableOpacity
                        onPress={openMenu}
                        style={[styles.triggerButton, triggerStyle]}
                        {...triggerProps}>
                        {TriggerComponent || <DefaultTrigger />}
                    </TouchableOpacity>
                }>
                {options.map((option, index) => (
                    <Menu.Item
                        key={index}
                        onPress={() => {
                            onOptionSelect(option);
                            closeMenu();
                        }}
                        title={option.label}
                        titleStyle={styles.menuItemText}
                        style={styles.menuItem}
                    />
                ))}
            </Menu>
        </View>
    );
};

const DefaultTrigger = () => (
    <View style={styles.defaultTrigger}>
        <Text text="show menu" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    triggerButton: {
        padding: 10,
    },
    defaultTrigger: {
        padding: 10,
        borderRadius: 5,
    },
    menuContainer: {
        marginTop: 30,
        backgroundColor: colors.white,
        borderColor: colors.gray[200],
        borderWidth: 1,
        borderRadius: 20,
    },
    menuItem: {},
    menuItemText: {
        fontSize: 12,
        fontWeight: 'medium',
        color: colors.gray[950],
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});

export default ContextMenu;
