import { useDispatch, useSelector } from 'react-redux';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Dispatch, State } from '@modules/store';
import { UserCharacter } from 'src/services/characters.api';

export const userCharacterAdapter = createEntityAdapter({
    selectId: (character: UserCharacter) => character.id || '',
});

const initialState = userCharacterAdapter.getInitialState();

const slice = createSlice({
    name: 'user-characters',
    initialState,
    reducers: {
        addUserCharacter: userCharacterAdapter.addOne,
        addManyUserCharacters: userCharacterAdapter.addMany,
        updateCharacter: userCharacterAdapter.updateOne,
        upsertCharacter: userCharacterAdapter.upsertOne,
        removeUserCharacter: userCharacterAdapter.removeOne,
        removeManyUserCharacters: userCharacterAdapter.removeMany,
        resetCharacters: userCharacterAdapter.removeAll,
        setAllCharacters: userCharacterAdapter.setAll,
    },
});

export function useUserCharactersSlice() {
    const dispatch = useDispatch<Dispatch>();
    const state = useSelector(({ userCharacters }: State) => userCharacters);
    return { dispatch, ...state, ...slice.actions };
}

export const {
    addUserCharacter,
    addManyUserCharacters,
    updateCharacter,
    upsertCharacter,
    removeUserCharacter,
    removeManyUserCharacters,
    resetCharacters,
    setAllCharacters,
} = slice.actions;

export default slice.reducer;

export const {
    selectById: selectUserCharacterById,
    selectIds: selectUserCharacterIds,
    selectEntities: selectUserCharacterEntities,
    selectAll: selectAllUserCharacters,
    selectTotal: selectTotalUserCharacters,
} = userCharacterAdapter.getSelectors((state: State) => state.userCharacters);
