import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC } from 'react';
import { Dimensions, TextInput, View, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native';
import CreateLabel from './CreateLabel';

interface Props {
    title: string[];
    subtitle?: string;
    placeholder?: string;
    maxChar?: number;
    required?: boolean;
    value: string;
    keyboardType?: 'numeric' | 'default';
    onChange: (text: string) => void;
    style?: ViewStyle;
}

const CreateTextArea: FC<Props> = ({
    title,
    subtitle,
    placeholder,
    maxChar,
    required,
    value,
    onChange,
    keyboardType,
    style,
}) => {
    const [focused, setFocused] = React.useState(false);

    return (
        <View>
            <CreateLabel title={title} required={required} subtitle={subtitle} />
            <View style={[$rootContainer, focused ? $inputFocused : $inputBlurred]}>
                <TextInput
                    keyboardType={keyboardType}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={[$inputContainer, style]}
                    placeholder={placeholder}
                    maxLength={maxChar}
                    value={value}
                    scrollEnabled={true}
                    onChangeText={
                        maxChar
                            ? text => {
                                  if (text.length <= maxChar) {
                                      onChange(text);
                                  }
                              }
                            : onChange
                    }
                    placeholderTextColor={colors.gray[400]}
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical="top"
                />
                {maxChar && (
                    <View style={$maxCharContainer}>
                        <Text size="xxs" style={$maxChar}>
                            {value.length} / {maxChar}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default CreateTextArea;

const $rootContainer: ViewStyle = {
    width: '100%',
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 2,
    padding: 20,
};

const $inputContainer: TextStyle = {
    display: 'flex',
};

const $inputFocused: TextStyle = {
    borderColor: colors.mint[500],
};

const $inputBlurred: TextStyle = {
    borderColor: colors.gray[200],
};

const $maxChar: TextStyle = {
    color: colors.gray[400],
    textAlign: 'right',
};

const $maxCharContainer: ViewStyle = {
    position: 'absolute',
    bottom: 10,
    right: 10,
};
