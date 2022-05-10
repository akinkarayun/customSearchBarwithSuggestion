import React from 'react';
import './App.css';
import Trie from './utils/Trie';

const dictionary = {
  words: ['hello linked in', 'helium', 'world', 'car', 'carpet', 'test', 'this', 'that', 'those', 'working', 'is', 'this',]
}

function App() {

  const [prefix, setPrefix] = React.useState("");
  const [suggestion, setSuggestion] = React.useState("");

  const getWords = async () => {
    const url = 'https://raw.githubusercontent.com/EKaxada/webster-words/main/dict.json'
    const res = await fetch(url, {
      method: 'GET'
    });
    console.log(res)
    return await res.json();
  }

  getWords()



  var myTrie = new Trie();


  (async () => {
    // const dictionary = await getWords();
    const words = dictionary.words;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      myTrie.insert(word)
    }
  })();

  const onChange = (e: any) => {
    var value = e.target.value;
    setPrefix(value);
    var words = value.split(" ");
    var trie_prefix = words[words.length - 1].toLowerCase();
    var found_words = myTrie.find(trie_prefix).sort((a, b) => {
      return a.length - b.length;
    });
    var first_word = found_words[0];
    if (
      found_words.length !== 0 &&
      value !== "" &&
      value[value.length - 1] !== " "
    ) {
      if (first_word != null) {
        var remainder = first_word.slice(trie_prefix.length);
        setSuggestion(value + remainder);
      }
    } else {
      setSuggestion(value);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 39) {
      setPrefix(suggestion);
    }
  };
  return (
    <div className="container">
      <input
        type="text"
        name="search-bar"
        id="search-bar"
        placeholder="Search..."
        value={prefix}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <input
        type="text"
        name="search-bar"
        id="search-bar2"
        value={suggestion}
      />
    </div>
  );
}

export default App;
