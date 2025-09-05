export class Relationship {
    id;
    name;
    relation;
    backstory;
    image_url;

    constructor(id, name, relation, backstory, image_url) {
        this.id = id;
        this.name = name;
        this.relation = relation;
        this.backstory = backstory;
        this.image_url = image_url;
    }
}