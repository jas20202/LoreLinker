import { Character } from "../models/character.model.js";

export class FileService {
    
    async openCharacterFromJson() {
        const filePath = await electronApi.openFile();
        if(filePath) {
            document.title = `Lore Linker - ${filePath}`
    
            const jsonPath = await electronApi.join(filePath, "character_info.json");
            const response = await fetch(jsonPath);
            const data = await response.json(); 
            const res = data.character;
            
            const imagePath = await electronApi.join(filePath, "character_image.png");
            const imageResonse = await fetch(imagePath);
            const imageBlob = await imageResonse.blob(); 
            console.log(imageResonse.url);
            const imageSource = URL.createObjectURL(imageBlob);

            return {res, imageSource};
        }
    }

    async saveCharacterToJson(character, image) {
        const jsonData = JSON.stringify({character: character});

        console.log(image.style.display);
        if(!image.style.display) {
            const filePath = await electronApi.saveFile(jsonData);
            if(filePath) document.title = `Lore Linker - ${filePath}`;
            return;
        }

        console.log(image);
        // works only for base64
        let u8arr;
        if (image.src.startsWith('data:')) {
            console.log("I'm here")
            let arr = image.src.split(','), mime = arr[0].match(/:(.*?);/)[1], b64str = atob(arr[arr.length - 1]), n = b64str.length; 
            u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = b64str.charCodeAt(n);
            } 
            console.log(u8arr);
        } else {
            u8arr = URL.createObjectURL(image.src);
        }
        console.log(u8arr);
        const filePath = await electronApi.saveFileWithImage({jsonData, u8arr});
        if(filePath) document.title = `Lore Linker - ${filePath}`;
    }
}

