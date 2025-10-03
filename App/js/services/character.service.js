import { Relationship } from "../models/relationship.model.js";
import { Character } from "../models/character.model.js";

export class CharacterService {

    renderCharacter(/** @type {Character} */ character) {
        document.getElementById('name').value = character.name;
        document.getElementById('age').value = character.age;
        document.getElementById('height').value = character.height;
        // document.getElementById('character-image').innerHTML = "<img src=\"../../assets/characters/" + characterId + "/character_image.png\"/>";
    
        let sheetAppearance = document.getElementById('appearance');
        let sheetPersonality = document.getElementById('personality');
        let sheetBackstory = document.getElementById('backstory');
    
        character.appearance ? sheetAppearance.innerText = character.appearance : sheetAppearance.innerText = "No Information available yet.";
        character.personality ? sheetPersonality.innerText = character.personality : sheetPersonality.innerText = "No Information available yet.";
        character.backstory ? sheetBackstory.innerText = character.backstory : sheetBackstory.innerText = "No Information available yet.";
    
        let palette = document.getElementById('palette');
        let paletteHTML = "";
        character.color_palette.forEach(swatch => {
          paletteHTML += "<div class=\"color-swatch\" id='lable-" + swatch[0] + "' style=\"background-color: " + swatch[1] + ";\">" + swatch[0] + " " + swatch[1] + "<button class='remove-btn' onclick='app.removeSwatch(this)'>×</button> </div>";
        });
        palette.innerHTML = paletteHTML;
        
        this.renderRelationsships(character.relationships);
    }

    renderRelationsships(rels){
        let relationships = document.getElementById('relationships');
        let relHTML = "";
        rels.forEach(rel => {
          relHTML += "<div class=\"relationship-card\" >";
          relHTML += "<div class=\"relationship-details\" onclick=\"app.openModal("+ rel.id +")\">";
          relHTML += "<h4>" + rel.name + "</h4>";
          relHTML += "<p><strong>Relation:</strong> " + rel.relation + "</p>";
          relHTML += "<p><strong>Backstory:</strong> " + rel.backstory + "</p>";
          relHTML += "</div>";
          relHTML += "<button class=\"remove-btn\" onclick=\"app.removeRelationship("+ rel.id +")\">×</button>"
          relHTML += "</div>";
        });
        relationships.innerHTML = relHTML;
    }

    /** @returns {Character} */
    getCharacter(colorPalette, rels) {
      return new Character(
        document.getElementById('name').value,
        document.getElementById('age').value,
        document.getElementById('height').value,
        document.getElementById('appearance').innerText,
        document.getElementById('personality').innerText,
        document.getElementById('backstory').innerText,
        colorPalette,
        rels 
      );
    }

    removeSwatch(colorPalette, button) {
      const swatch = button.parentElement;
      const label = swatch.id.split("-")[1];
      const toRemove = colorPalette.find(entry => entry[0] === label);
      const index = colorPalette.indexOf(toRemove);
      if(index !== -1) {
        colorPalette.splice(index, 1);
      }
      
      swatch.remove();
      return colorPalette;
    }

    addSwatch(colorPalette) {
      const label = document.getElementById('labelInput').value.trim();
      const color = document.getElementById('colorInput').value;

      if (!label) {
        return;
      }

      const palette = document.getElementById('palette');
      const swatch = document.createElement('div');
      swatch.className = 'color-swatch';
      swatch.style.backgroundColor = color;
      swatch.innerHTML = `${label} ${color} <button class="remove-btn" onclick="app.removeSwatch(this)">×</button>`;

      palette.appendChild(swatch);
      colorPalette.push([label, color])

      // Clear input
      document.getElementById('labelInput').value = '';
      return colorPalette;
    }

    clearFields() {
        document.getElementById('name').value = "";
        document.getElementById('age').value = "";
        document.getElementById('height').value = "";
        // document.getElementById('character-image').innerHTML = "<img src=\"../../assets/characters/" + characterId + "/character_image.png\"/>";
    
        document.getElementById('appearance').innerText = "";
        document.getElementById('personality').innerText = "";
        document.getElementById('backstory').innerText = "";
    
        document.getElementById('palette').innerHTML = "";
        
        document.getElementById('relationships').innerHTML = "";
    }

    setModalContent(/** @type {Relationship} */ rel) {
        document.getElementById('modalTitle').innerHTML = "Edit Relationship";
        document.getElementById('relId').value = rel.id;
        document.getElementById('relName').value = rel.name;
        document.getElementById('relRelation').value = rel.relation;
        document.getElementById('relBackstory').value = rel.backstory;
    }

    removeModalContent() {
        document.getElementById('relId').value = "";
        document.getElementById('relName').value = "";
        document.getElementById('relRelation').value = "";
        document.getElementById('relBackstory').value = "";
    }

    /** @returns {Relationship} */
    createNewRelationship() {
        if(document.getElementById('relId').value) {
            let rel = new Relationship(
                document.getElementById('relId').value,
                document.getElementById('relName').value,
                document.getElementById('relRelation').value,
                document.getElementById('relBackstory').value,
                ""
            );
            return rel;
        }
        console.log("Somehow I got here!");
        return;
    }

    updateRelationship(/** @type {Relationship} */ rel){
        document.getElementById('relId').value ? rel.id = document.getElementById('relId').value : rel.id = rel.id;
        rel.name = document.getElementById('relName').value;
        rel.relation = document.getElementById('relRelation').value;
        rel.backstory = document.getElementById('relBackstory').value;
    }
}
