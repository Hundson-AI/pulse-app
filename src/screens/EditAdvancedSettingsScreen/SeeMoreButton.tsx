import { Text } from '@components/Text';
import React, { FC } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';
import TriangleDown from '@assets/svgs/triangle_down.svg';
import { colors } from '@theme';

interface Props {
    open: boolean;
    onPress: () => void;
}

const SeeMoreButton: FC<Props> = ({ open, onPress }) => {
    const handlePress = () => {
        onPress();
    };

    return (
        <Pressable style={$rootContainer} onPress={handlePress}>
            <Text
                text="세부 설정 더보기"
                weight="medium"
                size="md"
                style={{
                    color: open ? colors.gray[200] : colors.orange[950],
                }}
            />
            <TriangleDown
                color={colors.orange[500]}
                style={{
                    transform: open ? [{ rotate: '180deg' }] : [],
                }}
            />
        </Pressable>
    );
};

export default SeeMoreButton;

const $rootContainer: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
};
