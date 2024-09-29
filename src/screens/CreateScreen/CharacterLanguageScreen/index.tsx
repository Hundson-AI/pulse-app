import Button from '@components/Button';
import { Screen } from '@components/Screen';
import Topbar from '@components/Topbar/Topbar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';
import CreateStepper from '../CreateStepper';
import CreateInput from '../CreateInput';
import { useCreateCharacterSlice } from '@modules/create-character/create-character.slice';
import { AppStackParamList } from '@navigator/AppNavigator';
import Chip from '@components/Chip';
import CreateLabel from '../CreateLabel';
import StepsButtonGroup from '../StepsButtonGroup';
import { ECharacterLanguage } from 'src/services/characters.api';

const CharacterLanguageScreen = () => {
    const windowHeight = useWindowDimensions().height;
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const { dispatch, upsertCharacterCreate, language, reset } = useCreateCharacterSlice();

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
        navigation.navigate('CharacterTagScreen');
    };

    const handleChange = (value: ECharacterLanguage) => {
        dispatch(upsertCharacterCreate({ language: value }));
    };

    return (
        <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={[$rootContainer]}>
            <View style={$contentContainer}>
                <CreateStepper totalSteps={8} currentStep={4} />
                <CreateLabel
                    title={['캐릭터 기본 언어를', '지정해 주세요']}
                    subtitle="챗봇 대화에서 사용할 기본 언어를 선택해 주세요"
                />
                <View style={$chipContainer}>
                    <Chip
                        title="한국어"
                        variant={language === 'ko' ? 'default' : 'outlined'}
                        style={{ marginRight: 4 }}
                        onPress={() => handleChange(ECharacterLanguage.KO)}
                    />
                    <Chip
                        title="영어"
                        variant={language === 'en' ? 'default' : 'outlined'}
                        style={{ marginRight: 4 }}
                        onPress={() => handleChange(ECharacterLanguage.EN)}
                    />
                    <Chip
                        title="일본어"
                        variant={language === 'jp' ? 'default' : 'outlined'}
                        onPress={() => handleChange(ECharacterLanguage.JP)}
                    />
                </View>
            </View>
            <StepsButtonGroup onNext={handleToNext} onBack={() => navigation.goBack()} />
        </Screen>
    );
};

export default CharacterLanguageScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.lg,
};
const $contentContainer: ViewStyle = {
    flex: 1,
    justifyContent: 'flex-start',
};

const $chipContainer: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
};
