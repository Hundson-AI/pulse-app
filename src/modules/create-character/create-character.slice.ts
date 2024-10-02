import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch, State } from '@modules/store';
import {
	Character,
	ECharacterGender,
	ECharacterLanguage,
	ECharacterUnlockModeLevel,
} from 'src/services/characters.api';

interface characterAdder extends Character {
	imageString: string;
}

const initialState: characterAdder = {
	imageString: '',
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
	occupation: '',
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
			state: characterAdder,
			{ payload }: PayloadAction<Partial<characterAdder>>
		) => {
			return { ...state, ...payload };
		},
		reset: (state: characterAdder) => {
			return { ...state, ...initialState };
		},
	},
});

export function useCreateCharacterSlice() {
	const dispatch = useDispatch<Dispatch>();
	const state = useSelector(({ createCharacter }: State) => createCharacter);
	return { dispatch, ...state, ...slice.actions };
}

export default slice.reducer;

export const selectCreateCharacter = (state: State) => state.createCharacter;
