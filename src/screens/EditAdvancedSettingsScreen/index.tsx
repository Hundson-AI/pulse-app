import { Screen } from '@components/Screen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useLayoutEffect } from 'react';
import { ScrollView, ToastAndroid, useWindowDimensions, View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';
import { AppStackParamList } from '@navigator/AppNavigator';
import AdvancedCharacterInput from './AdvancedCharacterInput';
import userCharactersSlice, {
    selectUserCharacterById,
    upsertCharacter,
} from '@modules/user-characters/user-characters.slice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@modules/store';
import EditAdvancedTopbar from './EditAdvancedTopbar';
import { characterApi, UserCharacter } from 'src/services/characters.api';
import SeeMoreButton from './SeeMoreButton';
import Button from '@components/Button';
import { colors } from '@theme';
import { updateCharacterRequest } from 'src/services/characters.api';
import {
    selectTempCharacter,
    selectTempValue,
    useTempCharacterSlice,
} from '@modules/create-character/update-tempcharacter.slice';

interface EditAdvancedSettingsScreenProps
    extends NativeStackScreenProps<AppStackParamList, 'EditAdvancedSettingsScreen'> {}

const EditAdvancedSettingsScreen: FC<EditAdvancedSettingsScreenProps> = ({ route }) => {
    const [open, setOpen] = React.useState(false);
    const { currentCharacter } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const character = currentCharacter;
    const { upsertCharacterCreate, age, reset } = useTempCharacterSlice();
    const [clear, setClear] = React.useState(false);
    useEffect(() => {
        dispatch(upsertCharacterCreate({ ...currentCharacter }));
    }, [currentCharacter]);

    const tempChara: UserCharacter = useSelector(selectTempCharacter);

    const [tempChar, setTempChar] = React.useState<UserCharacter>(
        character || {
            background_world: '',
        },
    );

    useEffect(() => {
        if (clear) {
            dispatch(upsertCharacter(tempChara));
            console.log('local updated');
            navigation.navigate('UserCharactersScreen');
        }
    }, [clear]);

    const handleSuccess = () => {
        setClear(true);
    };

    const handleFailed = () => {
        ToastAndroid.show(
            '캐릭터를 업데이트 하는데 실패했습니다. 다시 시도해주세요!',
            ToastAndroid.SHORT,
        );
        console.log('Failed to update character');
    };

    const updateCharacter = async (updateRequest: updateCharacterRequest) => {
        const minimumWaitTime = new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const updateResult = characterApi.updateCharacter(updateRequest);
            await Promise.all([updateResult, minimumWaitTime]);
            console.log('success');
            handleSuccess();
        } catch (error) {
            await minimumWaitTime;
            console.log(error);
            handleFailed();
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => <EditAdvancedTopbar />,
        });
    }, []);

    const handleUpdateTempChar = (key: keyof UserCharacter, value: string | string[]) => {
        console.log(value);

        dispatch(upsertCharacterCreate({ [key]: value }));
        console.log(value);
    };

    const handleSeeMorePress = () => {
        setOpen(!open);
    };

    const handleSavePress = () => {
        const update_request: updateCharacterRequest = {
            ...tempChara,
            tags: tempChara.tags.map(tag => tag.tag_id),
            character_id: tempChara.id,
        };
        updateCharacter(update_request);
    };

    return (
        <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={[$rootContainer]}>
            <ScrollView style={$scrollViewContainer}>
                <AdvancedCharacterInput
                    value={useSelector((state: State) =>
                        selectTempValue(state, 'background_world'),
                    )}
                    onChange={text => handleUpdateTempChar('background_world', text)}
                    title="캐릭터 세계관"
                    dataType={'default'}
                    maxChar={500}
                />
                <AdvancedCharacterInput
                    value={useSelector((state: State) =>
                        selectTempValue(state, 'starting_situation'),
                    )}
                    onChange={text => handleUpdateTempChar('starting_situation', text)}
                    title="채팅 시작 상황"
                    dataType={'default'}
                    maxChar={500}
                />
                <AdvancedCharacterInput
                    value={useSelector((state: State) =>
                        selectTempValue(state, 'background_characteristics'),
                    )}
                    valueKey="background_characteristics"
                    onChange={text => handleUpdateTempChar('background_characteristics', text)}
                    title="캐릭터 배경 특징"
                    dataType={'list'}
                    maxChar={60}
                />
                <AdvancedCharacterInput
                    value={useSelector((state: State) =>
                        selectTempValue(state, 'personality_characteristics'),
                    )}
                    onChange={text => handleUpdateTempChar('personality_characteristics', text)}
                    title="캐릭터 성격 특징"
                    dataType={'default'}
                    maxChar={500}
                />
                <AdvancedCharacterInput
                    value={useSelector((state: State) =>
                        selectTempValue(state, 'speech_characteristics'),
                    )}
                    onChange={text => handleUpdateTempChar('speech_characteristics', text)}
                    title="캐릭터 말투 특징"
                    dataType={'default'}
                    maxChar={500}
                />
                <AdvancedCharacterInput
                    value={useSelector((state: State) => selectTempValue(state, 'maker_comment'))}
                    onChange={text => handleUpdateTempChar('maker_comment', text)}
                    title="창작자 코멘트"
                    dataType={'default'}
                    maxChar={500}
                />
                <SeeMoreButton onPress={handleSeeMorePress} open={open} />

                <View style={open ? {} : { opacity: 0, height: 0 }}>
                    <AdvancedCharacterInput
                        value={useSelector((state: State) =>
                            selectTempValue(state, 'character_secret'),
                        )}
                        onChange={text => handleUpdateTempChar('character_secret', text)}
                        title="캐릭터의 비밀"
                        dataType={'default'}
                        maxChar={500}
                    />
                    <AdvancedCharacterInput
                        value={useSelector((state: State) =>
                            selectTempValue(state, 'hidden_quests'),
                        )}
                        valueKey="hidden_quests"
                        onChange={text => handleUpdateTempChar('hidden_quests', text)}
                        title="지정 퀘스트"
                        dataType={'list'}
                        maxChar={60}
                    />
                </View>
            </ScrollView>
            <View style={$buttonContainer}>
                <Button variant="secondary" title="저장" onPress={handleSavePress} />
            </View>
        </Screen>
    );
};

export default EditAdvancedSettingsScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    alignItems: 'center',
};

const $scrollViewContainer: ViewStyle = {
    paddingHorizontal: spacing.lg,
    width: '100%',
};

const $buttonContainer: ViewStyle = {
    width: '100%',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
};
