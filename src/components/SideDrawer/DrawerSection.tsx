import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';

interface DrawerItem {
    label: string;
    onPress: () => void;
    endDecorator?: React.ReactNode;
}

interface Props {
    title?: string;
    items: DrawerItem[];
    divider?: boolean;
}

const DrawerSection: FC<Props> = ({ title, items, divider }) => {
    const renderItems = () => {
        return items.map((item, index) => {
            return (
                <View key={index} style={$drawerItem}>
                    <Text text={item.label} onPress={item.onPress} weight="medium" size="md" />
                    {item.endDecorator}
                </View>
            );
        });
    };

    return (
        <View style={$drawerSection}>
            <Text weight="medium" size="xs" text={title} style={$drawerSectionTitle} />
            {renderItems()}
            {divider && (
                <View
                    style={{
                        backgroundColor: colors.gray[100],
                        height: 1,
                        width: '100%',
                        marginTop: 10,
                    }}
                />
            )}
        </View>
    );
};

export default DrawerSection;

const $drawerSection: ViewStyle = {
    padding: spacing.mlg,
};

const $drawerSectionTitle: TextStyle = {
    color: colors.gray[500],
};

const $drawerItem: ViewStyle = {
    paddingVertical: spacing.xsm,
};
