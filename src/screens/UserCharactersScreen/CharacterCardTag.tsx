import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC } from 'react';
import { View } from 'react-native';

interface Props {
    text: string;
}

const CharacterCardTag: FC<Props> = ({ text }) => {
    return (
        <View
            style={{
                paddingHorizontal: 12,
                paddingVertical: 4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.gray[950],
                borderRadius: 50,
            }}>
            <Text text={text} size="xxs" style={{ color: colors.white }} />
        </View>
    );
};

export default CharacterCardTag;
