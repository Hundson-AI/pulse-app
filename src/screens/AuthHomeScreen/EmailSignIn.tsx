import React from 'react';
import {
    ViewStyle,
    View,
    TextStyle,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    TextInput,
} from 'react-native';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppStackParamList } from '@navigator/AppNavigator';
import { Text } from '@components/Text';
import { spacing } from 'src/theme/spacing';
import { colors } from '@theme';
import Button from '@components/Button';
import { authApi } from 'src/services/auth.api';
import { useDispatch } from 'react-redux';
import { useAuthSlice } from '../../modules/auth/auth.slice';
import { DataPersistKeys, useDataPersist } from '@hooks';

const EmailSignIn = () => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const [userId, setUserId] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const { signIn } = useAuthSlice();
    const dispatch = useDispatch();
    const { setPersistData, getPersistData } = useDataPersist();

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const { access_token } = await authApi.signIn(userId, password);
            dispatch(signIn({ token: access_token, user: null }));
            setPersistData(DataPersistKeys.TOKEN, access_token);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleChangeUserId = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = e.nativeEvent.text;
        setUserId(text);
    };
    const handleChangePassword = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = e.nativeEvent.text;
        setPassword(text);
    };

    return (
        <>
            <View>
                <Text text="아이디" style={$helper} />
            </View>
            <View style={$inputContainer}>
                <TextInput
                    value={userId}
                    onChange={handleChangeUserId}
                    placeholder={'아이디'}
                    placeholderTextColor={colors.gray[300]}
                />
            </View>
            <View style={$inputContainer}>
                <View>
                    <Text text="비밀번호" style={$helper} />
                </View>
                <TextInput
                    value={password}
                    secureTextEntry
                    onChange={handleChangePassword}
                    placeholder={'비밀번호'}
                    placeholderTextColor={colors.gray[300]}
                />
            </View>
            <Button
                disabled={userId === ''}
                onPress={handleSignIn}
                style={$button}
                title="로그인"
            />
        </>
    );
};

export default EmailSignIn;

const $button: ViewStyle = {
    borderRadius: spacing.xxs,
};

const $helper: TextStyle = {
    color: colors.gray[300],
    fontWeight: '600',
    fontSize: spacing.sm,
    marginBottom: spacing.xxxs,
};

const $inputContainer: ViewStyle = {
    marginBottom: spacing.lg,
};
