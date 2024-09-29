import { Text } from '@components/Text';
import { colors } from '@theme';
import React, { FC, useRef, useState, useEffect } from 'react';
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
import Button from '@components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectTempCharacter } from '@modules/create-character/update-tempcharacter.slice';
import { UserCharacter } from 'src/services/characters.api';
import { clear } from 'console';
import Trashcan from '@assets/svgs/trashcan.svg';
interface Props {
    valueKey: string;
    onChange: (text: string | any[]) => void;
    leftStyle: ViewStyle;
    rightStyle: ViewStyle;
}

const AdvancedListData: FC<Props> = ({ valueKey, onChange, leftStyle, rightStyle }) => {
    const characterData = useSelector(selectTempCharacter);
    const dispath = useDispatch();

    const getData = () => {
        if (valueKey == 'hidden_quests') {
            return characterData.hidden_quests;
        } else if (valueKey == 'background_characteristics') {
            return characterData.background_characteristics;
        } else {
            return [];
        }
    };

    const clearData = (curidx: number) => {
        const data = getData();
        let tmp_value: any[] = [];

        data.map((data, idx, arr) => {
            if (idx != curidx) {
                tmp_value.push(data);
            }
        });
        onChange(tmp_value);
    };

    const renderInput = () => {
        const data = getData();
        console.log(data);
        return data.map((data, idx, arr) => {
            return (
                <View style={[$rootContainer]}>
                    <View style={[leftStyle]}>
                        <TextInput
                            style={[$disabledContainer]}
                            value={data}
                            scrollEnabled={true}
                            placeholderTextColor={colors.gray[400]}
                            multiline={true}
                            numberOfLines={5}
                            textAlignVertical="top"
                        />
                    </View>
                    <Pressable style={[rightStyle]} onPress={() => clearData(idx)}>
                        <Trashcan />
                    </Pressable>
                </View>
            );
        });
    };

    return <View>{renderInput()}</View>;
};

export default AdvancedListData;

const $rootContainer: ViewStyle = {
    width: '100%',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
};

const $disabledContainer: TextStyle = {
    display: 'flex',
    backgroundColor: colors.gray[400],
    minHeight: 80,
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
