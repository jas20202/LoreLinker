export class CharacterService {

    renderCharacter(character) {
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
        console.log(character.color_palette)
        character.color_palette.forEach(swatch => {
          paletteHTML += "<div class=\"color-swatch\" style=\"background-color: " + swatch[1] + ";\">" + swatch[0] + " " + swatch[1] + "</div>";
        });
        palette.innerHTML = paletteHTML;
        
        let relationships = document.getElementById('relationships');
        let relHTML = "";
        console.log(character.relationships)
        character.relationships.forEach(rel => {
          relHTML += "<div class=\"relationship-card\">";
          relHTML += "<div class=\"relationship-details\">";
          relHTML += "<h4> <a href=\"#" + rel.id + "\">" + rel.name + "</a></h4>";
          relHTML += "<p><strong>Relation:</strong> " + rel.relation + "</p>";
          relHTML += "<p><strong>Backstory:</strong> " + rel.backstory + "</p>";
          relHTML += "</div>";
          relHTML += "</div>";
        });
        relationships.innerHTML = relHTML;
    }
    
    test() {
        console.log("I listen");
    }
}
