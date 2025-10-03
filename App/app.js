import { Character } from "./js/models/character.model.js";
import { Relationship } from "./js/models/relationship.model.js";
import { CharacterService } from "./js/services/character.service.js";
import { FileService } from "./js/services/file.service.js";

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
    /** @type {Element} */
    modalContainer;

    constructor(mainContainer, modalContainer) {
        this.mainContainer = mainContainer;
        this.modalContainer = modalContainer;
    }

    injectDependencies(di) {
        this.characterService = di.characterService;
        this.fileService = di.fileService;
    }

    async openCharacter() {
        this.loadedCharacter = await this.fileService.openCharacterFromJson();
        this.characterService.renderCharacter(this.loadedCharacter);
        this.loadedRelationships = this.loadedCharacter.relationships;
        this.colorPalette = this.loadedCharacter.color_palette;
    }

    async saveCharacter() {
        if(!this.loadedRelationships) {
            this.loadedRelationships = [];
        } 
        this.loadedCharacter = this.characterService.getCharacter(this.colorPalette, this.loadedRelationships);
        this.fileService.saveCharacterToJson(this.loadedCharacter);
    }

    saveModal() {
        const id = document.getElementById('relId').value;
        if(!id) return;
        if(!this.loadedRelationships) {
            this.loadedRelationships = [];
            let rel = this.characterService.createNewRelationship();
            if(rel) {
                this.loadedRelationships.push(rel);
            }
            else {
                return;
            }
        } 
        let rel = this.loadedRelationships.find(entry => entry.id === String(id));
        if(rel) {
            this.characterService.updateRelationship(rel);
        }
        else {
            rel = this.characterService.createNewRelationship();
            if(rel) {
                this.loadedRelationships.push(rel);
            }
            else {
                return;
            }
        }
        this.characterService.renderRelationsships(this.loadedRelationships);
        this.closeModal()
    }

    openModal(id) {
        const rel = this.loadedRelationships.find(entry => entry.id === String(id));
        this.characterService.setModalContent(rel);
        this.modalContainer.classList.add('active');
    }

    openModalNew() {
        document.getElementById('modalTitle').innerText = "New Relationship";
        this.modalContainer.classList.add('active');
    }

    closeModal() {
        this.modalContainer.classList.remove('active');
        this.characterService.removeModalContent();
    } 

    removeRelationship(id) {
        const toRemove = this.loadedRelationships.find(entry => entry.id === String(id));
        const index = this.loadedRelationships.indexOf(toRemove);
        if(index !== -1) {
            this.loadedRelationships.splice(index, 1);
        }
        this.characterService.renderRelationsships(this.loadedRelationships);
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
    document.getElementById('main-content'),
    document.getElementById('relationship-modal')
);

setupDI(app);
window.app = app;