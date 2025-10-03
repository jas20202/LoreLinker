import { Character } from "../models/character.model.js";

export class FileService {
    /** @returns {Promise<Character>} */
    async openCharacterFromJson() {
        const filePath = await electronApi.openFile();

        const response = await fetch(filePath);
        const data = await response.json(); 
        
        return data.character;
    }

    async saveCharacterToJson(character) {
        const data = JSON.stringify({character: character});
        console.log(data);
        await electronApi.saveFile(data);
    }
}