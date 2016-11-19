/**************************************************
* Learn Words // localstorage.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
*
* Updated by Hannes Hirzel, November 2016
*
* Placed in public domain.
**************************************************/


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
		
		readItem: function(key){
			if (LW.db.isOK) {
				return JSON.parse(localStorage.getItem( key ));
			}
		},
		
		removeItem: function(key){
			if (LW.db.isOK) {
				localStorage.removeItem( key );
			}
		},
		
		storeItem: function(key, value){
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


		loadWords: function(theWords) {
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
                                LW.db.index = arrayOfKeys; 

                                console.log(arrayOfKeys.length + " words loaded");

		},



		isEmpty: function(key){
			if (LW.db.isOK) {
				if (LW.db.index.length == 0) {return true} else {return false};
			}
		},

                removeWords: function(){
			if (LW.db.isOK) {
                        "use strict";
                        var key;
                        var st; 
                        var keysToDelete = [];

                        var prefixForNumber = 'learnWords-index';  

                        // go through all keys starting with the name
                        // of the database, i.e 'learnWords-index14'
                        for (var i = 0; i < localStorage.length; i++){
                            key = localStorage.key(i);
                            st = localStorage.getItem(key);                            
    
                            if (key.lastIndexOf(prefixForNumber,0) === 0) {
                                keysToDelete.push(key);
                            };
			};
                        // now we have all the keys which should be deleted
                        // in the array keysToDelete.
                        console.log(keysToDelete);
                        keysToDelete.forEach(function(aKey){
                             localStorage.removeItem(aKey);
			});

                        // reset index
                        localStorage.setItem('learnWords-words', '');

                        // this one triggers that memorystore is executed
                        localStorage.removeItem('learnWords-settings');
                        }

		},


                dumpWords: function(aKeyPrefix) {
		           if (LW.db.isOK) {
                            "use strict";
                            var key;
                            var strValue; 
                            var result = [];

                            var prefixForNumber = 'learnWords-index';  

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


		
		init: function(){
			LW.db.isOK = false;
			if (!LW.db.isLocalStorageAvailable()) {
				alert('Local Storage is not available.');
				return false;
			};
                        // get index
                        LW.db.index = [];
                        var strIndex = localStorage.getItem('learnWords-words');
                        if (strIndex) {LW.db.index = strIndex.split(',')};
			LW.db.isOK = true;
		}
	};
	

// initialize database sub-object
LW.db.init();


