
function getWordList(level){
  var wordlist = document.getElementById("l" + level).value;
  wordlist = wordlist.split(new RegExp( "[|，, ]{1}", "g" ));
  return wordlist;
}
