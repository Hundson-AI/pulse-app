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
import StepsButtonGroup from '../StepsButtonGroup';

const CharacterAgeScreen = () => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const { dispatch, upsertCharacterCreate, age, reset } = useCreateCharacterSlice();

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
        navigation.navigate('CharacterLanguageScreen');
    };

    const handleChange = (value: string) => {
        dispatch(upsertCharacterCreate({ age: +value }));
    };

    return (
        <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={[$rootContainer]}>
            <View style={[$contentContainer]}>
                <CreateStepper totalSteps={8} currentStep={3} />
                <CreateInput
                    title={['캐릭터 나이를', '알려 주세요!']}
                    keyboardType="numeric"
                    value={age.toString()}
                    onChange={handleChange}
                    maxChar={10}
                />
            </View>
            <StepsButtonGroup onNext={handleToNext} onBack={() => navigation.goBack()} />
        </Screen>
    );
};

export default CharacterAgeScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.lg,
};
const $contentContainer: ViewStyle = {
    flex: 1,
    justifyContent: 'flex-start',
};
