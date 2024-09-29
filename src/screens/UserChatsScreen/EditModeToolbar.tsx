import CloseIcon from '@components/svgs/CloseIcon';
import { Text } from '@components/Text';
import { useChatListSlice } from '@modules/chat-list/chat-list.slice';
import { selectChatIds } from '@modules/chats/chats.slice';
import { colors } from '@theme';
import React, { useEffect } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { spacing } from 'src/theme/spacing';

const EditModeToolbar = () => {
    const { dispatch, setEditMode, selectedChatIds, selectAllChats, deselectAllChats } =
        useChatListSlice();
    const chatIds = useSelector(selectChatIds);

    const handleExitEditMode = () => {
        dispatch(setEditMode(false));
    };

    const handleSelectAll = () => {
        dispatch(selectAllChats(chatIds));
    };

    const handleDeselectAll = () => {
        dispatch(deselectAllChats());
    };

    const isAllSelected = selectedChatIds?.length === chatIds.length;

    return (
        <View style={$editModeContainer}>
            <Pressable
                style={[
                    $selectAllButton,
                    { borderColor: isAllSelected ? colors.mint[500] : colors.gray[200] },
                ]}
                onPress={isAllSelected ? handleDeselectAll : handleSelectAll}>
                <Text
                    text="전체"
                    weight="regular"
                    size="xs"
                    style={{
                        color: isAllSelected ? colors.mint[500] : colors.gray[200],
                        lineHeight: 24,
                    }}
                />
            </Pressable>
            <Pressable onPress={handleExitEditMode} style={$exitEditModeButton}>
                <CloseIcon height={24} width={24} fill={colors.gray[200]} />
            </Pressable>
        </View>
    );
};

export default EditModeToolbar;

const $editModeContainer: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    columnGap: spacing.mlg,
};

const $selectAllButton: ViewStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: spacing.xsm,

    borderRadius: 999,
};

const $exitEditModeButton: ViewStyle = {
    padding: spacing.xxs,
};
