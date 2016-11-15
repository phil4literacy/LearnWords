/**************************************************
* Learn Words // main.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
**************************************************/


// Read the settings
Settings.getSettings();

// Set the user saved local
if (LW.local.current != $('[data-type=lang-select].selected').data('lang')) {
	$('[data-lang='+LW.local.current+']').click();
};

// Read vocabulary

LW.wdsDB.index = LW.wdsDB.get('learnWords-words').split(',');

Vocabulary.viewWord();
Learn.recountIndexLearn();
Learn.showWord();
Repeat.recountIndexRepeat();
Repeat.showWord();

LW.Utils.closeMobMenu();
