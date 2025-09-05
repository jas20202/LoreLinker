export class Character {
    name;
    age;
    height;
    appearance;
    personality;
    backstory;
    color_palette;
    relationships;

    constructor(name, age, height, appearance, personality, backstory, color_palette, relationships) {
        this.name = name;
        this.age = age;
        this.height = height;
        this.appearance = appearance;
        this.personality = personality;
        this.backstory = backstory;
        this.color_palette = color_palette;
        this.relationships = relationships;
    }
}