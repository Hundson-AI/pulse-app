import { colors } from '@theme';
import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import More from '@assets/svgs/more.svg';
import { Text } from '@components/Text';
import ContextMenu, { ContextMenuOption } from '@components/ContextMenu';
import { useChatListSlice } from '@modules/chat-list/chat-list.slice';
import EditModeToolbar from './EditModeToolbar';

interface TopbarProps {}

const UserChatsTopbar: FC<TopbarProps> = () => {
    const menuOptions: ContextMenuOption[] = [{ label: '채팅 목록 편집', value: 'edit' }];
    const { dispatch, setEditMode, editMode } = useChatListSlice();
    const handleOptionSelect = (option: ContextMenuOption) => {
        switch (option.value) {
            case 'edit':
                dispatch(setEditMode(true));

                break;
            default:
                break;
        }
    };

    return (
        <View style={$container}>
            <Text text="채팅" weight="bold" size="xl" />
            {editMode ? (
                <EditModeToolbar />
            ) : (
                <View>
                    <ContextMenu
                        options={menuOptions}
                        onOptionSelect={handleOptionSelect}
                        TriggerComponent={<More />}
                        triggerStyle={{ padding: 5, borderRadius: 20 }}
                    />
                </View>
            )}
        </View>
    );
};

export default UserChatsTopbar;

const $container: ViewStyle = {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    backgroundColor: colors.background.light,
    justifyContent: 'space-between',
    borderBottomColor: colors.gray[100],
    borderBottomWidth: 1,
};
