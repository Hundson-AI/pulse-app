import { Text } from '@components/Text';
import React, { FC } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

interface Props {
    title: string[];
    subtitle?: string;
    required?: boolean;
}

const CreateLabel: FC<Props> = ({ title, required = false, subtitle }) => {
    const renderText = () => {
        const texts = [];
        for (let i = 0; i < title.length; i++) {
            texts.push(
                <Text size="xxl" key={i}>
                    {title[i]}
                    {required && i === title.length - 1 && '*'}
                </Text>,
            );
        }
        return texts;
    };

    return (
        <View style={$titleContainer}>
            {renderText()}
            {subtitle && (
                <Text size="xxs" style={$subtitle}>
                    {subtitle}
                </Text>
            )}
        </View>
    );
};

export default CreateLabel;

const $titleContainer: ViewStyle = {
    paddingTop: 36,
    paddingBottom: 30,
};

const $subtitle: TextStyle = {
    marginTop: 6,
};
