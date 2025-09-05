import { Character } from "../models/character.model.js";

export class FileService {
    /** @returns {Promise<Character>} */
    async openCharacterFromJson() {
        const response = await fetch('../../../ref_character_info.json');
        const data = await response.json(); 
        
        return data.character;
    }
}