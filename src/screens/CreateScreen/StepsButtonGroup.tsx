import Button from '@components/Button';
import { colors } from '@theme';
import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';

interface Props {
    onNext: () => void;
    onBack: () => void;
    nextDisabled?: boolean;
}

const StepsButtonGroup: FC<Props> = ({ onBack, onNext, nextDisabled }) => {
    return (
        <View style={$buttonContainer}>
            <Button title="다음" onPress={onNext} disabled={nextDisabled} />
            <Button title="뒤로가기" variant="ghost" onPress={onBack} />
        </View>
    );
};

export default StepsButtonGroup;

const $buttonContainer: ViewStyle = {
    paddingHorizontal: spacing.lg,
    marginHorizontal: -spacing.lg,
    backgroundColor: colors.white,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
};
