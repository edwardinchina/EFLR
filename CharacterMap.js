

class CharacterMap extends Map{
  constructor (name){
    super();
    this.name = name;
  }

  addItemDontReplace(item,level){
    if(!this.has(item)){
      this.set(item,level);
    }
    else {
      console.warn("duplicate : " + item);
    }
  }

  setLevel(iterable, level){ //charToObject? when do I convert it to an object?
    iterable.forEach((char, i) => {
      if(typeof(char) == "string"){
        if(isOneCharacter(char)){
          this.addItemDontReplace(char, level);
        }
        else {
          for (var i = 0; i < char.length; i++) {
            this.addItemDontReplace(char[i], level);
          }
        }
      }
      else {
          console.warn("not a string: " + char);
        }
    });
  }
}

function isOneCharacter(char){
  return typeof(char) == "string" && char.length == 1;
}
