import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC } from 'react';
import { View } from 'react-native';

interface Props {
    title: string;
    text: string;
}

const BackgroundMessage: FC<Props> = ({ title, text }) => {
    return (
        <View style={$container}>
            {title && (
                <Text
                    weight="medium"
                    size="xxs"
                    style={{ color: colors.gray[500], textAlign: 'center' }}
                    text={title}
                />
            )}
            <Text weight="regular" size="xxs" style={{ color: colors.gray[400] }} text={text} />
        </View>
    );
};

export default BackgroundMessage;

const $container = {
    marginVertical: 20,
};
