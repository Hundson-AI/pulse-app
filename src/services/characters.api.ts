import axios from 'axios';
import { Api } from './api';
import { Tag } from './tags.api';
import { useDataPersist } from '@hooks';
import { DataPersistKeys } from '@hooks';

const { getPersistData } = useDataPersist();

export class CharacterApi extends Api {
	async createCharacter(character: AddCharacterRequest) {
		try {
			console.log(character);
			await this.setClientHeaders(
				await getPersistData(DataPersistKeys.TOKEN)
			);

			const response: any = await this.postMultipart(
				'/chara/add',
				character
			);

			console.log(response);

			if (response.status !== 201) {
				throw new Error('Failed to create character');
			}
			return response.data.data as UserCharacter;
		} catch (error: any) {
			console.error(error.response.data);

			error.response.data.detail.forEach((data: any) => {});

			throw error;
		}
	}

	async updateCharacter(update: updateCharacterRequest) {
		try {
			await this.setClientHeaders(
				await getPersistData(DataPersistKeys.TOKEN)
			);

			const response: any = await this.axiosInstance.patch(
				'/chara/update',
				update
			);

			if (response.status !== 204) {
				throw new Error('Failed to update character');
			}
			return true;
		} catch (error: any) {
			console.error(error.response.data);

			throw error;
		}
	}

	async getCharacters() {
		try {
			const response: any = await this.axiosInstance.get('/chara/list');

			if (response.status !== 200) {
				throw new Error('Failed to fetch characters');
			}
			return response.data.data as UserCharacter[];
		} catch (error: any) {
			console.error(error.response.data);
			throw error;
		}
	}
}

export const characterApi = new CharacterApi();

export interface Character {
	name: string;
	gender: ECharacterGender;
	age: number;
	language: ECharacterLanguage;
	tags: Tag[];
	aiGenerated: boolean;
	description: string;
	first_word: string;
	original_content: boolean;
	nsfw: boolean;
	unlock_mode_level: ECharacterUnlockModeLevel;
	occupation: string;
	background_world: string;
	starting_situation: string;
	background_characteristics: string[];
	speech_characteristics: string;
	personality_characteristics: string;
	voice_template: string;
	maker_comment: string;
	chat_type: string;
	character_secret: string;
	hidden_quests: any[];
}

export interface UserCharacter extends Character {
	id: string;
	images?: CharacterImage;
	temporalImage?: string;
}

export interface updateCharacterRequest {
	character_id: string;
	name: string;
	gender: ECharacterGender;
	age: number;
	language: ECharacterLanguage;
	tags: string[];
	aiGenerated: boolean;
	description: string;
	first_word: string;
	original_content: boolean;
	nsfw: boolean;
	unlock_mode_level: ECharacterUnlockModeLevel;
	background_world: string;
	starting_situation: string;
	background_characteristics: string[];
	speech_characteristics: string;
	personality_characteristics: string;
	voice_template: string;
	maker_comment: string;
	chat_type: string;
	character_secret: string;
	hidden_quests: any[];
}

export interface AddCharacterRequest extends Character {
	image?: string;
	tag_ids: string[];
}

export interface CharacterImage {
	thumb_src: string;
	medium_src: string;
	full_size_src: string;
	origin_src: string;
}

export enum ECharacterGender {
	MALE = 'male',
	FEMALE = 'female',
	OTHER = 'other',
}

export enum ECharacterLanguage {
	KO = 'ko',
	EN = 'en',
	JP = 'jp',
}

export enum ECharacterUnlockModeLevel {
	DEFAULT = 'default',
	START = 'start',
	UNAVAILABLE = 'unavailable',
}
