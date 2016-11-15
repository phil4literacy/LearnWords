# How to create a file memorystore.js


## Introduction - Preloaded words

LearnWords comes with a preconfigured ``memorystore.js`` file which contains some German words with English translation.

LearnWords offers a GUI to enter words for learning. 
What is does not offer is to load the data from a CSV file with data which is already available.

A way to do this is to replace the file ``memorystore.js`` with a custom version and thus do an initial load of words. 
You find instructions how to create your own  ``memorystore.js`` file below.


## How to replace the preloaded words

## Step 1

A service like http://www.csvjson.com/csv2json offers online conversion of CSV data to JSON

The very first row is a "header".

````
word, translate
Apfel  ,  apple
Orange   , orange
Papaya   , pawpaw
Himbeeren  , raspberry
Erdbeeren , strawberry
Aprikose   , apricot
Kokosnuss  , coconut
Birne  , pear
Ananas  , pineapple
Guava  , guava
Banane , banana
Melone  , melon
Zitrone  , lemon
Pflaume  , plum
Traube , grape
Mango , mango
Limette , lime
Kirsche , cherry
Kiwi , kiwi
Heidelbeere , blueberry
Brombeere , blackberry
````

This gives a literal array of objects. 


## Step 2

In step 1 we got an array.
Add an assignment in front ``var theWords=``.

````JavaScript

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

````

## Step 3

Add code to initialize the missing attributes of the words and load them into the localStorage.

````JavaScript

/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

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
  localStorageAPI.storeItem('learnWords-'+element.index, element);
  arrayOfKeys.push(element.index);
});

// TODO add code to store arrayOfKeys

````

## Step 4

Save the code thus created as a new ``memorystore.js`` file

TODO: check for the settings and initialize them.
