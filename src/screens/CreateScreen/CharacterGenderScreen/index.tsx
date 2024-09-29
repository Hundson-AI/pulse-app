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
import { ECharacterGender } from 'src/services/characters.api';

const CharacterGenderScreen = () => {
    const windowHeight = useWindowDimensions().height;
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const { dispatch, upsertCharacterCreate, gender, reset } = useCreateCharacterSlice();

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
        navigation.navigate('CharacterAgeScreen');
    };

    const handleChange = (value: ECharacterGender) => {
        dispatch(upsertCharacterCreate({ gender: value }));
    };

    return (
        <Screen preset="fixed" safeAreaEdges={['top']} contentContainerStyle={[$rootContainer]}>
            <View style={[$contentContainer]}>
                <CreateStepper totalSteps={8} currentStep={2} />
                <CreateLabel title={['캐릭터의', '성별은 무엇인가요?']} />

                <View style={$chipContainer}>
                    <Chip
                        title="여성"
                        variant={gender === 'female' ? 'default' : 'outlined'}
                        style={{ marginRight: 4 }}
                        onPress={() => handleChange(ECharacterGender.FEMALE)}
                    />
                    <Chip
                        title="남성"
                        variant={gender === 'male' ? 'default' : 'outlined'}
                        style={{ marginRight: 4 }}
                        onPress={() => handleChange(ECharacterGender.MALE)}
                    />
                    <Chip
                        title="미지정"
                        variant={gender === 'other' ? 'default' : 'outlined'}
                        onPress={() => handleChange(ECharacterGender.OTHER)}
                    />
                </View>
            </View>
            <StepsButtonGroup onNext={handleToNext} onBack={() => navigation.goBack()} />
        </Screen>
    );
};

export default CharacterGenderScreen;

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
