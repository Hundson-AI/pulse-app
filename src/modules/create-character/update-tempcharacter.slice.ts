import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch, State } from '@modules/store';
import {
    ECharacterGender,
    ECharacterLanguage,
    ECharacterUnlockModeLevel,
    UserCharacter,
} from 'src/services/characters.api';

const initialState: UserCharacter = {
    id: '',
    name: '',
    gender: ECharacterGender.FEMALE,
    age: 18,
    language: ECharacterLanguage.KO,
    tags: [],
    aiGenerated: true,
    first_word: '',
    description: '',
    original_content: false,
    nsfw: false,
    unlock_mode_level: ECharacterUnlockModeLevel.DEFAULT,
    background_world: '',
    starting_situation: '',
    background_characteristics: [],
    personality_characteristics: '',
    speech_characteristics: '',
    voice_template: '',
    maker_comment: '',
    chat_type: '',
    character_secret: '',
    hidden_quests: [],
};

const slice = createSlice({
    name: 'create-character',
    initialState,
    reducers: {
        upsertCharacterCreate: (
            state: UserCharacter,
            { payload }: PayloadAction<Partial<UserCharacter>>,
        ) => {
            return { ...state, ...payload };
        },
        reset: () => initialState,
    },
});

export function useTempCharacterSlice() {
    const dispatch = useDispatch<Dispatch>();
    const state = useSelector(({ tempCharacter }: State) => tempCharacter);
    return { dispatch, ...state, ...slice.actions };
}

export default slice.reducer;

export const selectTempCharacter = (state: State) => state.tempCharacter;

export const selectTempValue = (state: State, key: keyof UserCharacter) => state.tempCharacter[key];
