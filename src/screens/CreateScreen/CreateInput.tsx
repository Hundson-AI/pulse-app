import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC } from 'react';
import { Dimensions, TextInput, View, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native';
import CreateLabel from './CreateLabel';

interface Props {
    title: string[];
    placeholder?: string;
    maxChar?: number;
    required?: boolean;
    value: string;
    keyboardType?: 'numeric' | 'default';
    onChange: (text: string) => void;
}

const CreateInput: FC<Props> = ({
    title,
    placeholder,
    maxChar,
    required,
    value,
    onChange,
    keyboardType,
}) => {
    var width = Dimensions.get('window').width;

    return (
        <View style={[{ width: width * 0.7 }, $rootContainer]}>
            <CreateLabel title={title} required={required} />
            <TextInput
                keyboardType={keyboardType}
                style={$inputContainer}
                placeholder={placeholder}
                maxLength={maxChar}
                value={value}
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
            />
            {maxChar && (
                <View>
                    <Text size="xxs" style={$maxChar}>
                        {value.length} / {maxChar}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default CreateInput;

const $rootContainer: ViewStyle = {
    minWidth: 230,
};

const $inputContainer: TextStyle = {
    borderBottomWidth: 2,
    borderBottomColor: colors.gray[950],
    fontSize: 16,
};

const $maxChar: TextStyle = {
    color: colors.gray[400],
    textAlign: 'right',
};
