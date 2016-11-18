/**************************************************
* Learn Words // memorystore.js
* 
* Example of a user generated file
*
* Hannes Hirzel, November 2016
*
* Placed in public domain.
**************************************************/

if (LW.db.isOK && (LW.db.get('learnWords-settings') == 'undefined' || LW.db.get('learnWords-settings') == null)) {
    settings = {
        first : 1,
        second: 3,
        third: 7
    };
    LW.db.put('learnWords-settings', settings);

    LW.db.put('learnWords-language', 'en_GB');

var theWords = [
  {
    "word": "Apfel",
    "translate": "apple"
  },
  {
    "word": "Orange",
    "translate": "orange"
  },
  {
    "word": "Papaya",
    "translate": "pawpaw"
  },
  {
    "word": "Himbeeren",
    "translate": "raspberry"
  },
  {
    "word": "Erdbeeren",
    "translate": "strawberry"
  },
  {
    "word": "Aprikose",
    "translate": "apricot"
  },
  {
    "word": "Kokosnuss",
    "translate": "coconut"
  },
  {
    "word": "Birne",
    "translate": "pear"
  },
  {
    "word": "Ananas",
    "translate": "pineapple"
  },
  {
    "word": "Guava",
    "translate": "guava"
  },
  {
    "word": "Banane",
    "translate": "banana"
  },
  {
    "word": "Melone",
    "translate": "melon"
  },
  {
    "word": "Zitrone",
    "translate": "lemon"
  },
  {
    "word": "Pflaume",
    "translate": "plum"
  },
  {
    "word": "Traube",
    "translate": "grape"
  },
  {
    "word": "Mango",
    "translate": "mango"
  },
  {
    "word": "Limette",
    "translate": "lime"
  },
  {
    "word": "Kirsche",
    "translate": "cherry"
  },
  {
    "word": "Kiwi",
    "translate": "kiwi"
  },
  {
    "word": "Heidelbeere",
    "translate": "blueberry"
  },
  {
    "word": "Brombeere",
    "translate": "blackberry"
  }
];

var i= 0;
var arrayOfKeys = [];

theWords.forEach(function(element){
  i = i + 1;
  element.index = "index"+i;
  element.step = 0;
  element.date = 0;
  LW.db.put('learnWords-'+element.index, element);
  arrayOfKeys.push(element.index);
}

);

LW.db.put('learnWords-words', arrayOfKeys.join());

console.log(arrayOfKeys.length + " words loaded from memorystore.js");
}

