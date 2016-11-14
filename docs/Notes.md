# Notes about LearnWords


## Preloaded words

LearnWords comes with a preconfigured ``memorystore.js`` file which contains some German words with English translation.

LearnWords offers a GUI to enter words for learning. What is does not offer is to load the data from a CSV file with data which is already available.

A way to do this is to replace the file ``memorystore.js`` with a custom version and thus do an initial load of words. 
You find instructions how to create your own  ``memorystore.js`` file below.

## How to replace the preloaded words

## Step 1
A service like http://www.csvjson.com/csv2json offers online conversion of CSV data to JSON
````
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

This leads to 

````JavaScript
[
  {
    "Apfel": "Orange",
    "apple": "orange"
  },
  {
    "Apfel": "Papaya",
    "apple": "pawpaw"
  },
  {
    "Apfel": "Himbeeren",
    "apple": "raspberry"
  },
  {
    "Apfel": "Erdbeeren",
    "apple": "strawberry"
  },
  {
    "Apfel": "Aprikose",
    "apple": "apricot"
  },
  {
    "Apfel": "Kokosnuss",
    "apple": "coconut"
  },
  {
    "Apfel": "Birne",
    "apple": "pear"
  },
  {
    "Apfel": "Ananas",
    "apple": "pineapple"
  },
  {
    "Apfel": "Guava",
    "apple": "guava"
  },
  {
    "Apfel": "Banane",
    "apple": "banana"
  },
  {
    "Apfel": "Melone",
    "apple": "melon"
  },
  {
    "Apfel": "Zitrone",
    "apple": "lemon"
  },
  {
    "Apfel": "Pflaume",
    "apple": "plum"
  },
  {
    "Apfel": "Traube",
    "apple": "grape"
  },
  {
    "Apfel": "Mango",
    "apple": "mango"
  },
  {
    "Apfel": "Limette",
    "apple": "lime"
  },
  {
    "Apfel": "Kirsche",
    "apple": "cherry"
  },
  {
    "Apfel": "Kiwi",
    "apple": "kiwi"
  },
  {
    "Apfel": "Heidelbeere",
    "apple": "blueberry"
  },
  {
    "Apfel": "Brombeere",
    "apple": "blackberry"
  }
]
````

## Step 2

Create a new ``memorystore.js`` file and put the following into it



````JavaScript
"use strict;"
var LW = {};

LW.loadWords = (function(){  // IIFE
                
               var prefix = 'index';
               var wordNo = 0; // words have numbered keys like index1, index2, ... index18
               var words = []; // what is called 'words' here 
                               // is actually an index of the keys or the word objects. 
  

               // constructor for a word object to be stored (sample)

               var LWword = function(key, aWord) {
                   this.index = key;
                   this.word = aWord.word;
                   this.translate = aWord.translate;
                   this.date = new Date();
                   this.step = 0;
               };               
  

               // anArrayOfWords - aWord object just needs to have two attributes
               // 1. word
               // 2. translate
 
               return function(anArrayOfWords){

                   anArrayOfWords.forEach(function(aWord){
                       wordNo = wordNo + 1;  
                       var key = prefix + wordNo;
                       localStorageAPI.storeItem('learnWords-'+key, new LWword(aWord));
                       words.push(key);
                   }); 

                      
                   localStorageAPI.storeItem('learnWords-words', words.join());
                 
                   console.log(words.length + ' words have been loaded!');
               };
               
               
               
               }
               
               )();

````


Then add the following function property definition for the LW object below. 
You may replace the method name with your own method name.

````JavaScript

LW.loadWordsGermanEnglish = function(){

LW.loadWords(

[
  {
    "Apfel": "Orange",
    
    
    
    
    "apple": "orange"
  },
  {
    "Apfel": "Papaya",
    "apple": "pawpaw"
  },
  {
    "Apfel": "Himbeeren",
    "apple": "raspberry"
  },
  {
    "Apfel": "Erdbeeren",
    "apple": "strawberry"
  },
  {
    "Apfel": "Aprikose",
    "apple": "apricot"
  },
  {
    "Apfel": "Kokosnuss",
    "apple": "coconut"
  },
  {
    "Apfel": "Birne",
    "apple": "pear"
  },
  {
    "Apfel": "Ananas",
    "apple": "pineapple"
  },
  {
    "Apfel": "Guava",
    "apple": "guava"
  },
  {
    "Apfel": "Banane",
    "apple": "banana"
  },
  {
    "Apfel": "Melone",
    "apple": "melon"
  },
  {
    "Apfel": "Zitrone",
    "apple": "lemon"
  },
  {
    "Apfel": "Pflaume",
    "apple": "plum"
  },
  {
    "Apfel": "Traube",
    "apple": "grape"
  },
  {
    "Apfel": "Mango",
    "apple": "mango"
  },
  {
    "Apfel": "Limette",
    "apple": "lime"
  },
  {
    "Apfel": "Kirsche",
    "apple": "cherry"
  },
  {
    "Apfel": "Kiwi",
    "apple": "kiwi"
  },
  {
    "Apfel": "Heidelbeere",
    "apple": "blueberry"
  },
  {
    "Apfel": "Brombeere",
    "apple": "blackberry"
  }
]

);
````


## Step 3

Replace the existing file 'memorystore.js' with what you created under step 2.

TODO: Add function here to clear out existing entries.

````JavaScript
LW.resetDatabase();
````

## Step 4

Start the app; 
Open web console (under developer tools).
Paste the following code into the console area and hit 'Return');

````JavaScript
LW.resetDatabase(); LW.loadWordsGermanEnglish();
````


