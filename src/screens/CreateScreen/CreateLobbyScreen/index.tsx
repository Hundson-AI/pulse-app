import Button from '@components/Button';
import { Screen } from '@components/Screen';
import Topbar from '@components/Topbar/Topbar';
import { AppStackParamList } from '@navigator/AppNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import LottieView from 'lottie-react-native';
import React, { FC, useLayoutEffect } from 'react';
import { Text, useWindowDimensions, View, ViewStyle } from 'react-native';
import { spacing } from 'src/theme/spacing';

const CreateLobbyScreen = () => {
    const windowHeight = useWindowDimensions().height;
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => <Topbar />,
        });
    }, []);

    return (
        <Screen
            preset="fixed"
            safeAreaEdges={['top', 'bottom']}
            contentContainerStyle={[$rootContainer]}>
            <View style={$contentContainer}>
                <View
                    style={{
                        flex: 1,
                        paddingTop: 100,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}>
                    <LottieView
                        source={require('@assets/lottie/rocket.json')}
                        autoPlay
                        loop
                        style={{ width: 200, height: 200 }}
                    />
                </View>
            </View>
            <View style={$buttonContainer}>
                <Button
                    title="만들기로 입장하기"
                    onPress={() => {
                        navigation.navigate('CharacterNameScreen');
                    }}
                />
                <Button
                    title="뒤로가기"
                    variant="ghost"
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            </View>
        </Screen>
    );
};

export default CreateLobbyScreen;

const $rootContainer: ViewStyle = {
    flex: 1,
    paddingHorizontal: spacing.lg,
};

const $buttonContainer: ViewStyle = {
    paddingHorizontal: spacing.lg,
    marginHorizontal: -spacing.lg,
    paddingTop: spacing.lg,
};
const $contentContainer: ViewStyle = {
    flex: 1,
    justifyContent: 'flex-start',
};
