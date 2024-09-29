import { Text } from '@components/Text';
import React, { FC } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import Male from '@assets/svgs/male.svg';
import Female from '@assets/svgs/female.svg';
import Other from '@assets/svgs/other.svg';
import { colors } from '@theme';

enum ECharacterChipType {
    AI = 'AI',
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

interface Props {
    type: 'AI' | 'male' | 'female' | 'other';
}

const CharacterCardChip: FC<Props> = ({ type }) => {
    switch (type) {
        case ECharacterChipType.AI:
            return (
                <View
                    style={[
                        $chip,
                        {
                            backgroundColor: colors.purple,
                        },
                    ]}>
                    <Text text="AI" size="xxxs" weight="extraBold" style={$text} />
                </View>
            );
        case ECharacterChipType.MALE:
            return (
                <View
                    style={[
                        $chip,
                        {
                            backgroundColor: colors.genderBlue,
                        },
                    ]}>
                    <Male />
                </View>
            );
        case ECharacterChipType.FEMALE:
            return (
                <View
                    style={[
                        $chip,
                        {
                            backgroundColor: colors.genderPink,
                        },
                    ]}>
                    <Female />
                </View>
            );
        case ECharacterChipType.OTHER:
            return (
                <View
                    style={[
                        $chip,
                        {
                            backgroundColor: colors.red,
                        },
                    ]}>
                    <Other />
                </View>
            );
        default:
            return null;
    }
};

export default CharacterCardChip;

const $chip: ViewStyle = {
    height: 20,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10000,
};

const $text: TextStyle = {
    color: colors.white,
};
