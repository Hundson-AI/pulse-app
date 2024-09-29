import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';

interface Props {
    text: string;
}

const ActionMessage: FC<Props> = ({ text }) => {
    const parseText = (text: string) => {
        const start = text.indexOf('*');
        const end = text.lastIndexOf('*');
        return text.slice(start + 2, end - 1);
    };

    return (
        <View style={$container}>
            <Text
                weight="regular"
                size="xxs"
                style={{ color: colors.gray[400], textAlign: 'center' }}
                text={parseText(text)}
            />
        </View>
    );
};

export default ActionMessage;

const $container: ViewStyle = {
    marginVertical: 10,
};
