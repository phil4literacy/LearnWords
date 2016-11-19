/**************************************************
* Learn Words // LWdb.js
*
* Database access
*
* Current API as of 19. Nov 2016
* will be updated
*
*
* Property
* -------
*
* db.name
*
*
*
* Methods
* -------
*
* LW.db.get(key)
* LW.db.put(key,value)
*
* LW.db.dumpWords()
*
* LW.db.remove(key)
* LW.db.removeObjects(aKeyPrefix)
*
* LW.db.loadWords(arrayOfWords)
* LW.db.removeWords()
*
* LW.db.isEmpty()
*
* LW.db.getSettings()
* LW.db.putSettings(theSettings)
*
* LW.db.destroy()
*
* LW.db.init(dbName)
*
*
**************************************************/

"use strict";


	// Define global LearnWords object
	var LW = {}; 


	// Define database sub-object

	LW.db = {
	
		isLocalStorageAvailable: function() {
				try {
					return 'localStorage' in window && window['localStorage'] !== null;
				} catch (e) {
					return false;
				}
			},
		
		get: function(key){
			if (LW.db.isOK) {
				return JSON.parse(localStorage.getItem(key));
			}
		},
		
		remove: function(key){
			if (LW.db.isOK) {
				localStorage.removeItem( key );
			}
		},
		
		put: function(key, value){
			if (LW.db.isOK) {
				try {
					localStorage.setItem(key, JSON.stringify(value));
				} catch (e) {
					if (e == QUOTA_EXCEEDED_ERR) {
						alert('Local Storage is full');
					}
					return false;
				}
			}
		},


		putSettings: function(theSettingsObj){
                    	LW.db.put(LW.db.name+'-settings', theSettingsObj);
		},


		getSettings: function(){
			var settings = LW.db.get(LW.db.name+'-settings');
                        if (!settings) {
                            // initialize settings

                            // first is for box (or step) 1 in the Leitner box; 
                            //       ask the word again after 1 day
                            // second is for box 2 ; ask the word again after 3 days
                            // third is for box 3 ; ask the word again after 7 days

                            // Note: box 0 is for the Learn mode and it not set 
                            // as the words are accessible all the time
                      
			    settings = {
        				first : 1,
        				second: 3,
        				third: 7
    			     };
    			     LW.db.put(LW.db.name+'-settings', settings);
    			     LW.db.put(LW.db.name+'-language', 'en_GB');

                        };

	                return settings
		},




		loadWords: function(theWords) {
				var i= 0;
				var arrayOfKeys = [];

				theWords.forEach(function(element){
  					 i = i + 1;
  					 element.index = "index"+i;
  					 element.step = 0;
  					 element.date = 0;
  					 LW.db.put(LW.db.name+'-'+element.index, element);
  					 arrayOfKeys.push(element.index);
					}
				);

                                LW.db.put(LW.db.name + '-words', arrayOfKeys.join());
                                LW.db.index = arrayOfKeys; 

                                console.log(arrayOfKeys.length + " words loaded");

		},





                dumpWords: function(aKeyPrefix) {
		           if (LW.db.isOK) {
                            var key;
                            var strValue; 
                            var result = [];

                            var prefixForNumber = LW.db.name+'-index';  

                            // go through all keys starting with the name
                            // of the database, i.e 'learnWords-index14'
                            // collect the matching objects into arr
                            for (var i = 0; i < localStorage.length; i++){
                                key = localStorage.key(i);
                                strValue = localStorage.getItem(key);                            
    
                                if (key.lastIndexOf(prefixForNumber,0) === 0) {
                                    result.push(JSON.parse(strValue));
                                };
			    };

                            // Dump the array as JSON code (for select all / copy)
                            console.log(JSON.stringify(result));
                           }
                },	



		removeObjects: function(aKeyPrefix){
			if (LW.db.isOK) {
                         var key;
                         var st; 
                         var keysToDelete = [];

                         // go through all keys starting with the name
                         // of the database, i.e 'learnWords-index14'
                         for (var i = 0; i < localStorage.length; i++){
                            key = localStorage.key(i);
                            st = localStorage.getItem(key);                             
    
                            if (key.lastIndexOf(aKeyPrefix,0) === 0) {
                                keysToDelete.push(key);
                            };
			 };
                         // now we have all the keys which should be deleted
                         // in the array keysToDelete.
                         console.log(keysToDelete);
                         keysToDelete.forEach(function(aKey){
                              localStorage.removeItem(aKey);
			 });
                       }
		},


		removeWords: function(){

                        var aKeyPrefix = LW.db.name+'-index';  
                        LW.db.removeObjects(aKeyPrefix);

                        // reset index
                        localStorage.setItem(LW.db.name+'-words', '');

                        // this one triggers that memorystore is executed
                        localStorage.removeItem(LW.db.name+'-settings');

		},



		destroy: function(){

                        var aKeyPrefix = LW.db.name;  

                        LW.db.removeObjects(aKeyPrefix);

		},


		isEmpty: function(key){
			if (LW.db.isOK) {
				if (LW.db.index.length == 0) {return true} else {return false};
			}
		},




		
		init: function(dbName){
			LW.db.isOK = false;

			if (!LW.db.isLocalStorageAvailable()) {
				alert('Local Storage is not available.');
				return false;
			}
			LW.db.isOK = true;

                        LW.db.name = dbName;

                        // Initialize index array object 
                        // index is an array with the keys for all words.
                        LW.db.index = [];
                        var strIndex = LW.db.get(LW.db.name+'-words'); 
			if (strIndex) {LW.db.index = strIndex.split(',')};

		}
	};


	// LW.db.init("learnWords");	
	LW.db.init("LWdb");
        // LW.db.init("LWtestDB");	
