import Button from '@components/Button';
import { Screen } from '@components/Screen';
import Topbar from '@components/Topbar/Topbar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { ScrollView, Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';
import CreateStepper from '../CreateStepper';
import CreateInput from '../CreateInput';
import { useCreateCharacterSlice } from '@modules/create-character/create-character.slice';
import { AppStackParamList } from '@navigator/AppNavigator';
import CreateLabel from '../CreateLabel';
import CreateTextArea from '../CreateTextArea';
import Chip from '@components/Chip';
import StepsButtonGroup from '../StepsButtonGroup';
import { ECharacterUnlockModeLevel } from 'src/services/characters.api';

const CharacterFinalScreen = () => {
    const windowHeight = useWindowDimensions().height;
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const { dispatch, upsertCharacterCreate, original_content, nsfw, unlock_mode_level, reset } =
        useCreateCharacterSlice();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => (
                <Topbar
                    type="close"
                    onClose={() => {
                        reset();
                        navigation.navigate('UserCharactersScreen');
                    }}
                />
            ),
        });
    }, []);

    const handleToNext = () => {
        navigation.navigate('CreatingCharacterScreen');
    };

    const handleChangeOriginality = (value: boolean) => {
        dispatch(upsertCharacterCreate({ original_content: value }));
    };
    const handleChangeNsfw = (value: boolean) => {
        dispatch(upsertCharacterCreate({ nsfw: value }));
    };
    const handleChangeLevel = (value: ECharacterUnlockModeLevel) => {
        dispatch(upsertCharacterCreate({ unlock_mode_level: value }));
    };

    return (
        <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={[$rootContainer]}>
            <View style={$contentContainer}>
                <CreateStepper totalSteps={8} currentStep={8} />
                <ScrollView
                    style={{
                        display: 'flex',
                        flexGrow: 1,
                    }}
                    contentContainerStyle={{ paddingBottom: 20 }}>
                    <CreateLabel title={['순수 창작한', '캐릭터인가요?']} />
                    <View style={$optionContainer}>
                        <Chip
                            title="네"
                            onPress={() => handleChangeOriginality(true)}
                            variant={original_content ? 'default' : 'outlined'}
                        />
                    </View>
                    <View style={$optionContainer}>
                        <Chip
                            title="아니요. 원작자가 있습니다"
                            onPress={() => handleChangeOriginality(false)}
                            variant={!original_content ? 'default' : 'outlined'}
                        />
                    </View>
                    <CreateLabel title={['청소년 이용불가', '캐릭터인가요?']} />
                    <View style={$optionContainer}>
                        <Chip
                            title="네"
                            onPress={() => handleChangeNsfw(true)}
                            variant={nsfw ? 'default' : 'outlined'}
                        />
                        <Chip
                            title="아니요"
                            onPress={() => handleChangeNsfw(false)}
                            variant={!nsfw ? 'default' : 'outlined'}
                        />
                    </View>
                    {/* <CreateLabel title={['스파이시모드', '가능 단계 설정']} />
                    <View style={$optionContainer}>
                        <Chip
                            title="연인부터"
                            onPress={() => handleChangeLevel('default')}
                            variant={
                                prompt_data.unlock_mode_level === 'default' ? 'default' : 'outlined'
                            }
                        />
                        <Chip
                            title="처음부터"
                            onPress={() => handleChangeLevel('start')}
                            variant={
                                prompt_data.unlock_mode_level === 'start' ? 'default' : 'outlined'
                            }
                        />
                    </View>
                    <View style={$optionContainer}>
                        <Chip
                            title="비허용"
                            onPress={() => handleChangeLevel('unavailable')}
                            variant={
                                prompt_data.unlock_mode_level === 'unavailable'
                                    ? 'default'
                                    : 'outlined'
                            }
                        />
                    </View> */}
                </ScrollView>
            </View>

            <StepsButtonGroup onNext={handleToNext} onBack={() => navigation.goBack()} />
        </Screen>
    );
};

export default CharacterFinalScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.lg,
};

const $contentContainer: ViewStyle = {
    flex: 1,
    justifyContent: 'flex-start',
};

const $optionContainer: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: spacing.xxs,
    gap: spacing.xxs,
};
