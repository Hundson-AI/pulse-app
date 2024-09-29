import { Text } from '@components/Text';
import { Tag } from 'src/services/tags.api';
import { colors } from '@theme';
import React, { FC } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

interface CharacterCardChipProps {
    tag: Tag;
}

const CharacterCardChip: FC<CharacterCardChipProps> = ({ tag }) => {
    return (
        <View style={$chipRoot}>
            <Text size="xxs" style={$chipText}>
                {tag.tag_name}
            </Text>
        </View>
    );
};

export default CharacterCardChip;

const $chipRoot: ViewStyle = {
    height: 24,
    backgroundColor: colors.gray[950],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
    paddingHorizontal: 12,
};

const $chipText: TextStyle = {
    color: colors.white,
};
