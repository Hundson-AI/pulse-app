import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC, useRef, useState } from 'react';
import {
    TextInput,
    View,
    ViewStyle,
    TouchableOpacity,
    TextStyle,
    Pressable,
    NativeSyntheticEvent,
    TextInputSelectionChangeEventData,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Generate from '@assets/svgs/generate.svg';
import AdvancedListData from './AdvancedListData';
import Button from '@components/Button';
import { selectTempValue } from '@modules/create-character/update-tempcharacter.slice';
import { CharacterImage, UserCharacter } from 'src/services/characters.api';
import { Tag } from 'src/services/tags.api';
import { windowHeight, windowWidth } from '@utils/deviceInfo';
import Plus from '@assets/svgs/plus.svg';

interface Props {
    title: string;
    placeholder?: string;
    maxChar?: number;
    value: string | number | boolean | any[] | CharacterImage | Tag[] | string[] | undefined;
    valueKey?: keyof UserCharacter;
    keyboardType?: 'numeric' | 'default';
    dataType: 'list' | 'default';
    onChange: (text: string | any[]) => void;
    style?: ViewStyle;
}
const AdvancedCharacterInput: FC<Props> = ({
    title,
    placeholder,
    maxChar,
    value,
    valueKey,
    onChange,
    keyboardType,
    dataType = 'default',
    style,
}) => {
    const [focused, setFocused] = useState(false);
    const textInputRef = useRef<TextInput>(null);
    const [selection, setSelection] = useState({ start: 0, end: 0 });
    const [localText, setLocalText] = useState(typeof value == 'string' ? value : '');

    const handleAIGenerate = () => {
        console.log('AI 생성 button pressed');
        textInputRef.current?.focus();
    };

    const onListAdd = () => {
        let tmp_value: any[] = [];

        if (Array.isArray(value)) {
            value.forEach(data => {
                tmp_value.push(data);
            });
        }

        tmp_value.push(localText);

        onChange(tmp_value);
    };

    const onTextChange = (text: string) => {
        if (dataType == 'default') {
            setLocalText(text);
            onChange(text);
        } else if (dataType == 'list') {
            setLocalText(text);
        }
    };

    const insertTextAtCursor = (insertText: string) => {
        const { start, end } = selection;
        const before = localText.slice(0, start);
        const after = localText.slice(end);
        const newValue = before + insertText + after;

        if (!maxChar || newValue.length <= maxChar) {
            onTextChange(newValue);

            const newCursorPosition = start + insertText.length;
            setSelection({ start: newCursorPosition, end: newCursorPosition });
        } else {
            console.warn('Maximum character limit reached.');
        }

        textInputRef.current?.focus();
    };

    const handleInsertChar = () => {
        insertTextAtCursor('{{char}}');
    };

    const handleInsertUser = () => {
        insertTextAtCursor('{{user}}');
    };

    return (
        <View style={$masterContainer}>
            <Text text={title} weight="medium" size="md" style={{ marginBottom: 6 }} />
            <View style={[$rootContainer]}>
                <View style={[$inputLeftContainer, focused ? $inputFocused : $inputBlurred]}>
                    <TextInput
                        ref={textInputRef}
                        keyboardType={keyboardType}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        style={[
                            $inputContainer,
                            dataType != 'default' ? { minHeight: 80 } : { minHeight: 120 },
                            style,
                        ]}
                        placeholder={placeholder}
                        maxLength={maxChar}
                        value={localText}
                        scrollEnabled={true}
                        onChangeText={
                            maxChar
                                ? text => {
                                      if (text.length <= maxChar) {
                                          onTextChange(text);
                                      }
                                  }
                                : onTextChange
                        }
                        onSelectionChange={(
                            event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
                        ) => {
                            setSelection(event.nativeEvent.selection);
                        }}
                        selection={selection}
                        placeholderTextColor={colors.gray[400]}
                        multiline={true}
                        numberOfLines={5}
                        textAlignVertical="top"
                    />
                    {maxChar && (
                        <View style={$maxCharContainer}>
                            <Text size="xxs" style={$maxChar}>
                                {localText.length} / {maxChar}
                            </Text>
                        </View>
                    )}
                </View>
                {dataType != 'default' && (
                    <Pressable
                        style={[$inputRightContainer]}
                        onPress={() => {
                            onListAdd();
                        }}>
                        <Plus />
                    </Pressable>
                )}
            </View>
            {/* Conditionally render the buttons when focused */}
            {focused && (
                <View style={$buttonsContainer}>
                    <Pressable onPress={handleAIGenerate}>
                        <LinearGradient
                            colors={[colors.orange[500], colors.mint[500]]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={$gradientButton}>
                            <Generate />
                            <Text style={$buttonText}>AI생성</Text>
                        </LinearGradient>
                    </Pressable>
                    <TouchableOpacity onPress={handleInsertChar} style={$button}>
                        <Text size="lg" style={$buttonText}>
                            캐릭터
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleInsertUser} style={$button}>
                        <Text size="lg" style={$buttonText}>
                            유저
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            {dataType == 'default' ? (
                <></>
            ) : (
                <AdvancedListData
                    valueKey={typeof valueKey == 'string' ? valueKey : ''}
                    onChange={onChange}
                    leftStyle={$inputLeftContainer}
                    rightStyle={$inputRightContainer}
                />
            )}
        </View>
    );
};

export default AdvancedCharacterInput;

const $masterContainer: ViewStyle = {
    width: '100%',
    marginBottom: 30,
    flex: 1,
};

const $rootContainer: ViewStyle = {
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
};

const $inputLeftContainer: TextStyle = {
    display: 'flex',
    flex: 8,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 2,
    overflow: 'hidden',
};
const $inputRightContainer: TextStyle = {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    aspectRatio: 1,
};

const $inputContainer: TextStyle = {
    display: 'flex',
    margin: 10,
};

const $inputFocused: TextStyle = {
    borderColor: colors.orange[500],
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

const $buttonsContainer: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
};

const $button: ViewStyle = {
    flex: 1,
    backgroundColor: colors.orange[500],
    paddingVertical: 9,
    paddingHorizontal: 24,
    marginHorizontal: 6,
    alignItems: 'center',
    borderRadius: 100,
};

const $gradientButton: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 9,
    paddingHorizontal: 24,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
};

const $buttonText: TextStyle = {
    color: colors.white,
};
