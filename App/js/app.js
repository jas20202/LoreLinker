import { Character } from "./models/character.model.js";
import { Relationship } from "./models/relationship.model.js";
import { CharacterService } from "./services/character.service.js";
import { FileService } from "./services/file.service.js";

export class App {

    colorPalette;

    /** @type {CharacterService} */
    characterService;
    /** @type {FileService} */
    fileService;

    /** @type {Character} */
    loadedCharacter;
    /** @type {Relationship[]} */
    loadedRelationships;

    /** @type {Element} */
    mainContainer;

    constructor(mainContainer) {
        this.mainContainer = mainContainer;
    }

    injectDependencies(di) {
        this.characterService = di.characterService;
        this.fileService = di.fileService;
    }

    /* _setModalContent(/** @type {Image} image) {
        this.modalImage.setAttribute('src', image.imageSrc);
        this.modalImage.setAttribute('alt', image.alt);
    }

    _removeModalContent() {
        this.modalImage.removeAttribute('src');
        this.modalImage.removeAttribute('alt');
    }

    _openModal() {
        this.modalContainer.classList = 'active';
        document.body.classList = 'stop-scroll';
    }

    _closeModal() {
        this.modalContainer.classList = '';
        document.body.classList = '';
        this._currentlyOpenedIndex = -1;
        this._removeModalContent();
    } */
    
    async openCharacter() {
        this.loadedCharacter = await this.fileService.openCharacterFromJson();
        this.characterService.renderCharacter(this.loadedCharacter);
        this.loadedRelationships = this.loadedCharacter.relationships;
        this.colorPalette = this.loadedCharacter.color_palette;
    }

    updateColor(input) {
        document.getElementById('customColorButton').style.backgroundColor = input.value;
    }

    removeSwatch(button) {
        this.colorPalette = this.characterService.removeSwatch(this.colorPalette, button);
    }
    
    addSwatch() {
        this.colorPalette = this.characterService.addSwatch(this.colorPalette);
    }

    clear(){
        this.colorPalette = [];
        this.relationships = [];
        this.loadedCharacter = new Character();

        this.characterService.clearFields()
    }
}

function setupDI(app) {
    console.clear();
    const di = {
        characterService: new CharacterService(),
        fileService: new FileService()
    };
    app.colorPalette = [];
    app.relationships = [];
    app.injectDependencies(di);
}


const app = new App(
    document.getElementById('main-content')
);

setupDI(app);
window.app = app;