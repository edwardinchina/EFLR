function bodyload() {
  let cm = new CharacterMap("cm");
  let wordlist = null;
  for (var i = 1; i <= 5; i++) {
    wordlist = getWordList(i);
    cm.setLevel(wordlist,i);
  }



  var context = document.querySelector(".context");

  wrapEachCharacter(context);

  function isCharacter(text){
    return (text.length == 1 && text.codePointAt(0) > 3400)
  }

  function fwrapper(node){
    var text = node.data;
    var wrapper;
    if(isCharacter(text))
    {
      wrapper = document.createElement('span');
      wrapper.isCharacter = true;
      var level = getLevel(text);
      wrapper.className = "l"+level;
      wrapper.title = level;
    }
    return wrapper;
  }

  function getLevel(character) {
    return cm.get(character);
  }

  function wrap(node,fwrapper) {
    var wrapper = fwrapper(node);
    if(wrapper) {
      node.parentNode.insertBefore(wrapper, node);
      wrapper.appendChild(node);
    }
  }


  function wrapEach(textNode,fwrapper){
    // TODO: Am I skipping non-text nodes?
    if(textNode.nodeName != '#text'){console.warn("unexpected non-textnode"); return;}
    const len = textNode.length;
    for (var i = 0; i < len; i++) {
      var next; //second half of splitText
      if(textNode.data.length > 1){
        next = textNode.splitText(1); //denormalize
      }
      textNode.nextSibling;
      wrap(textNode,fwrapper);
      textNode = next;
    }
  }

  function unwrap(element){
    var parent = element.parentNode;
    // move all children out of the element
    while (element.firstChild){
      parent.insertBefore(element.firstChild, element);
    }
    // remove the empty element
    parent.removeChild(element);
  }

  function wrapEachCharacterList(nodesToWrap){
    [...nodesToWrap].forEach(wrapEachCharacter);
  }

  function wrapEachCharacter(nodeToWrap){
    if(nodeToWrap.nodeName == '#text'){
      wrapEach(nodeToWrap,fwrapper)
    }
    else if (nodeToWrap.isCharacter) {
      wrapEachCharacterList(nodeToWrap.childNodes);
    }
    else if (nodeToWrap.hasChildNodes) {
      wrapEachCharacterList(nodeToWrap.childNodes);
    }
  }

}
