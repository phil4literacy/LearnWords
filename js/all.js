/**************************************************
* Learn Words // utils.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
**************************************************/

var LW = {}; // global LearnWords object



if(typeof(Utils) == 'undefined' || Utils == null || !Utils){
	
	Utils = {
	
		isNumber: function(str, withDot){ //validate filed for number value
			var NumberReg = /^\d+$/,
				NumberWithDotReg = /^[-+]?[0-9]*\.?[0-9]+$/;
			
            return withDot ? NumberWithDotReg.test(str) : NumberReg.test(str);
		},
		
		clearFields: function(){
			$('.form-group').each(function(i, node){ //clear all error styles
				$(node).removeClass('has-error');
			});
			$('#errorSettings').addClass('nodisplay');
		},
		
		setFieldError: function(self){ //set the error style for the current input field
			$(self).addClass('has-error');
			return true;
		},
		
		getRandomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		
		getToday: function(fullDate){
			var now = new Date();
			
			if (fullDate) {
				return new Date().valueOf();
			} else {
				return new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
			}
		},
		
		closeMobMenu: function(){
			if ($('#bs-example-navbar-collapse-1').hasClass('in')) {
				$('#navbarToggle').click();
			}
		},
		shuffle: function(a) {
			 var j, x, i;
		    for (i = a.length; i; i--) {
		        j = Math.floor(Math.random() * i);
		        x = a[i - 1];
		        a[i - 1] = a[j];
		        a[j] = x;
		    }		   
		}	
	};
}

/**************************************************
* Learn Words // localdtorage.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
**************************************************/
if(typeof(LW.wdsDB) == 'undefined' || LW.wdsDB == null || !LW.wdsDB){
	
	LW.wdsDB = {
	
		isLocalStorageAvailable: function() {
				try {
					return 'localStorage' in window && window['localStorage'] !== null;
				} catch (e) {
					return false;
				}
			},
		
		readItem: function(key){
			if (LW.wdsDB.isOK) {
				return JSON.parse(localStorage.getItem( key ));
			}
		},
		
		removeItem: function(key){
			if (LW.wdsDB.isOK) {
				localStorage.removeItem( key );
			}
		},
		
		storeItem: function(key, value){
			if (LW.wdsDB.isOK) {
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
		
		init: function(){
			LW.wdsDB.isOK = false;
			if (!LW.wdsDB.isLocalStorageAvailable()) {
				alert('Local Storage is not available.');
				return false;
			}
			LW.wdsDB.isOK = true;
		}
	};
	
	LW.wdsDB.init();
}

/**************************************************
* Learn Words // memorystore.js
* The in-memory Store. Encapsulates logic to access data.
* All fields are required.
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
**************************************************/
if (LW.wdsDB.isOK && (LW.wdsDB.readItem('learnWords-settings') == 'undefined' || LW.wdsDB.readItem('learnWords-settings') == null)) {
	settings = {
		first : 1,
		second: 3,
		third: 7
	};
	LW.wdsDB.storeItem('learnWords-settings', settings);
	
	LW.wdsDB.storeItem('learnWords-language', 'en_GB');
	
	var words = ['index1', 'index2', 'index3', 'index4', 'index5', 'index6', 'index7', 'index8', 'index9', 'index10', 'index11', 'index12', 'index13', 'index14'];
	LW.wdsDB.storeItem('learnWords-words', words.join());
	
	index1 = {
		index: 'index1',
		word: 'das Auto',
		translate: 'car',
		step: 0,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index1', index1);
	
	index2 = {
		index: 'index2',
		word: 'laufen',
		translate: 'run',
		step: 0,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index2', index2);

	index3 = {	
		index: 'index3',
		word: 'alt',
		translate: 'old',
		step: 0,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index3', index3);
	
	index4 = {	
		index: 'index4',
		word: 'krank',
		translate: 'sick',
		step: 0,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index4', index4);
	
	index5 = {
		index: 'index5',
		word: 'heute',
		translate: 'today',
		step: 0,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index5', index5);
	
	index6 = {
		index: 'index6',
		word: 'schreiben',
		translate: 'write',
		step: 0,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index6', index6);
	
	index7 = {
		index: 'index7',
		word: 'hell',
		translate: 'light',
		step: 0,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index7', index7);
	
	index8 = {
		index: 'index8',
		word: 'reich',
		translate: 'rich',
		step: 0,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index8', index8);
	
	index9 = {
		index: 'index9',
		word: 'süß',
		translate: 'sweet',
		step: 1,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index9', index9);
	
	index10 = {
		index: 'index10',
		word: 'weiblich',
		translate: 'female',
		step: 1,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index10', index10);
	
	index11 = {
		index: 'index11',
		word: 'bestellen',
		translate: 'order',
		step: 1,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index11', index11);
	
	index12 = {
		index: 'index12',
		word: 'kalt',
		translate: 'cold',
		step: 2,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index12', index12);
	
	index13 = {
		index: 'index13',
		word: 'sauer',
		translate: 'sour',
		step: 2,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index13', index13);
	
	index14 = {
		index: 'index14',
		word: 'fliegen',
		translate: 'fly',
		step: 3,
		date: 0
	};
	LW.wdsDB.storeItem('learnWords-index14', index14);
	
	console.log(localStorage);
}/**************************************************
* Learn Words // navigation.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
**************************************************/
if(typeof(Navigation) == 'undefined' || Navigation == null || !Navigation){
	
	Navigation = {
	
		hashguard: function(init){ //onHashChange
			if (init) this.hash = window.location.hash;
			if (this.hash != window.location.hash){
				$(window).trigger('hashbreak', {"prevhash":this.hash});
				this.hash = window.location.hash;
			}
			setTimeout('Navigation.hashguard(false)', 50);
		},
		
		hashbreak: function(){ //hashchange event
			var hashUrl = window.location.hash.slice(3);
			
			if (hashUrl) {
				$('[data-target=' + window.location.hash.slice(3) + ']').click();
			} else {
				$('[data-target=summary]').click();
			}
		},
		
		navSelect: function(){
			$('[data-toggle=nav]').each(function(){
				$(this).addClass('nodisplay');
			});
			$('[data-type=nav-select-li]').each(function(){
				$(this).removeClass('active');
			});
			$(this).parent().addClass('active');
			$('#'+$(this).data('target')).removeClass('nodisplay');
			Utils.closeMobMenu();
		},
		
		init: function(){
			$(document).on('click touchstart', '[data-type=nav-select]', Navigation.navSelect);
			$(window).bind('hashbreak', Navigation.hashbreak);
			Navigation.hashguard(false);
		}
	};
	
	Navigation.init();
}

﻿/**************************************************
* Learn Words // local.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
**************************************************/
if(typeof(local) == 'undefined' || local == null || !local){
	local = {
	
		en_GB: {
			summary: 'Summary',
			learn: 'Learn',
			repeat: 'Repeat',
			vocabulary: 'Vocabulary',
			settings: 'Settings',
			editWords: 'Edit words',
			first: 'First',
			second: 'Second',
			third: 'Third',
			saveBtn: 'Save',
			cancelBtn: 'Cancel',
			language: 'Language',
			en_GB: 'english',
			de_DE: 'deutsch',
			ru_RU: 'русский',
			errorEmpty: 'All fields are required.',
			errorValid: 'Entered values are incorrect.',
			errorNo: 'New settings was saved.',
			errorNoW: 'New word was added.',
			totalWords: 'Total words',
			learnWordsNum: 'Words to learn',
			repeatWords: 'Words to repeat',
			rememberBtn: 'Remember',
			repeatBtn: 'Repeat',
			knownBtn: 'Know',
			allWordsOk: 'No more words for learning.',
			inputWordLbl: 'Word',
			inputTranslateLbl: 'Translate',
			enterBtn: 'Check',
			allWordsDone: 'No more words for repeat.'
		},
		
		ru_RU: {
			summary: 'Сводка',
			learn: 'Учить',
			repeat: 'Повторять',
			vocabulary: 'Словарь',
			settings: 'Настройки',
			editWords: 'Редактировать слова',
			first: 'Первый',
			second: 'Второй',
			third: 'Третий',
			saveBtn: 'Сохранить',
			cancelBtn: 'Отменить',
			language: 'Язык',
			en_GB: 'english',
			de_DE: 'deutsch',
			ru_RU: 'русский',
			errorEmpty: 'Все поля обязательны.',
			errorValid: 'Введенные значения невалидны.',
			errorNo: 'Новые значение были записаны.',
			errorNoW: 'Новое слово добавлено.',
			totalWords: 'Всего слов',
			learnWordsNum: 'Слов учить',
			repeatWords: 'Сегодня поторить слов',
			rememberBtn: 'Запомнил',
			repeatBtn: 'Повторить',
			knownBtn: 'Знаю',
			allWordsOk: 'Нет больше слов для изучения.',
			inputWordLbl: 'Слово',
			inputTranslateLbl: 'Перевод',
			enterBtn: 'Проверить',
			allWordsDone: 'Нет больше слов для повторения.'
		},
		
		de_DE: {
			summary: 'Summe',
			learn: 'Lernen',
			repeat: 'Wiederholen',
			vocabulary: 'Vokabular',
			settings: 'Rahmen',
			editWords: 'Wörter ändern',
			first: 'Erste',
			second: 'Zweite',
			third: 'Dritte',
			saveBtn: 'Speichern',
			cancelBtn: 'Stornieren',
			language: 'Sprache',
			en_GB: 'english',
			de_DE: 'deutsch',
			ru_RU: 'русский',
			errorEmpty: 'Alle Felder sind erforderlich.',
			errorValid: 'Eingegebene Werte sind falsch.',
			errorNo: 'Neue Einstellungen gespeichert wurde.',
			errorNoW: 'Neues Wort hinzugefügt.',
			totalWords: 'Insgesamt Worte',
			learnWordsNum: 'Wörter zu lernen',
			repeatWords: 'Worte zu wiederholen',
			rememberBtn: 'Merken',
			repeatBtn: 'Wiederholen',
			knownBtn: 'Wissen',
			allWordsOk: 'Keine Worte mehr für das Lernen.',
			inputWordLbl: 'Wort',
			inputTranslateLbl: 'Übersetzen',
			enterBtn: 'Prüfen',
			allWordsDone: 'Keine Worte mehr für wiederholen.'
		},
		changeLocalContent: function(){ // change inner content
			var langNode = $('[data-toggle=lang]'),
				langSelect = $('[data-type=lang-select]');
			
			$(langNode).each(function(i, node){
				$(node).text(local[local.currentLocal][$(node).data('lang')]);
			});
			$(langSelect).each(function(i, node){
				$(node).removeClass('selected');
			});
		},
		
		langSelect: function(){ //change localization
			local.currentLocal = $(this).data('lang');
			$('#langSelect').click();
			$('.navbar-toggle:visible').click();
			local.changeLocalContent();
			LW.wdsDB.storeItem('learnWords-language', local.currentLocal);
			$(this).addClass('selected');
			return false;
		},
		
		init: function(){
			local.currentLocal = LW.wdsDB.readItem('learnWords-language');
			$(document).on('click touchstart', '[data-type=lang-select]', local.langSelect);
		}
	}
	
	local.init();
}/**************************************************
* Learn Words // settings.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
**************************************************/
if(typeof(Settings) == 'undefined' || Settings == null || !Settings){
	
	Settings = {
	
		inputFirstCheck: $('#inputFirstCheck'),
		inputSecondCheck: $('#inputSecondCheck'),
		inputThirdCheck: $('#inputThirdCheck'),
		settingFrom: $('#settingFrom'),
		errorSettings: $('#errorSettings'),
		
		params: {},
	
		getSettings: function(){ //read setting's values
			var settings = LW.wdsDB.readItem('learnWords-settings');
			
			$(Settings.inputFirstCheck).val(settings.first);
			$(Settings.inputSecondCheck).val(settings.second);
			$(Settings.inputThirdCheck).val(settings.third);
			
			Settings.params = settings; //store local
		},
		
		saveSetting: function(){ //save setting's values to DB
			var first = $(Settings.inputFirstCheck).val().trim(),
				second = $(Settings.inputSecondCheck).val().trim(),
				third = $(Settings.inputThirdCheck).val().trim(),
				form = $(Settings.settingFrom),
				errorName = '',
				error = false;
			
			Utils.clearFields();
			//check for empty fields
			if (!first) {
				error = Utils.setFieldError(form.children(':nth-child(1)'));
				errorName = 'empty';
			} else if (!second) {
				error = Utils.setFieldError(form.children(':nth-child(2)'));
				errorName = 'empty';
			} else if (!third) {
				error = Utils.setFieldError(form.children(':nth-child(3)'));
				errorName = 'empty';
			} else { //only digits is valid
				if (!Utils.isNumber(first)) {
					error = Utils.setFieldError(form.children(':nth-child(1)'));
					errorName = 'number';
				};
				if (!Utils.isNumber(second)) {
					error = Utils.setFieldError(form.children(':nth-child(2)'));
					errorName = 'number';
				};
				if (!Utils.isNumber(third)) {
					error = Utils.setFieldError(form.children(':nth-child(3)'));
					errorName = 'number';
				};
			}
			if (error) { //show error if any
				var errorTxt = (errorName == 'empty') ? local[local.currentLocal].errorEmpty : local[local.currentLocal].errorValid;
				$(Settings.errorSettings).removeClass('nodisplay').text(errorTxt);
			} else { //otherwise save new settings
				settings = {
					first : first,
					second: second,
					third: third
				};
				LW.wdsDB.storeItem('learnWords-settings', settings);
				$(Settings.errorSettings).removeClass('nodisplay').text(local[local.currentLocal].errorNo);
				
				Settings.params = settings; //store local
			};
		},
		
		cancelSetting: function(){
			Utils.clearFields();
			Settings.getSettings();
		},
		
		init: function(){
			$(document).on('click touchstart', '#saveSettings', Settings.saveSetting);
			$(document).on('click touchstart', '#cancelSettings', Settings.cancelSetting);
		}
	};
	
	Settings.init();
}

/**************************************************
* Learn Words // vocabulary.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
**************************************************/
if(typeof(Vocabulary) == 'undefined' || Vocabulary == null || !Vocabulary){
	
	Vocabulary = {
		rowTemplate: '<div id="{{node}}" class="row"><div class="col-md-5 col-sm-5 col-xs-4">{{txt}}</div>'+
					'<div class="col-md-5 col-sm-5 col-xs-4">{{translate}}</div>'+
					'<div class="col-md-2 col-sm-2 col-xs-4"><button data-node="{{node}}" type="button" class="btn btn-info js-edit-btn"><span class="glyphicon glyphicon-edit"></span></button></div>'+
					'</div>'+
					'<div id="{{node}}Edit" class="row nodisplay"><form id="form-{{node}}" role="form">'+
					'<div class="col-md-5 col-sm-5 col-xs-4"><input type="text" class="form-control inp-fld" id="word-{{node}}" placeholder="Enter word" value="{{txt}}"></div>'+
					'<div class="col-md-5 col-sm-5 col-xs-4"><input type="text" class="form-control inp-fld" id="translate-{{node}}" placeholder="Enter translate" value="{{translate}}"></div>'+
					'<div class="col-md-2 col-sm-2 col-xs-4"><button data-node="{{node}}" type="button" class="btn btn-success js-save-btn"><span class="glyphicon glyphicon-ok"></span></button>'+
					'<button id="del-{{node}}" data-node="{{node}}" data-id="{{index}}" type="button" class="btn btn-danger js-del-btn"><span class="glyphicon glyphicon-remove"></span></button>'+
					'</div></form>'+
					'</div>',
		
		totalWordsNum: $('#totalWordsNum'),
		vocabularyBox: $('#vocabularyBox'),
		errorVocabularyBox: $('#errorVocabularyBox'),
		errorVocabulary: $('#errorVocabulary'),
		inputWordTxt: $('#inputWordTxt'),
		inputTranslate: $('#inputTranslate'),
		addWordForm: $('#addWordForm'),
		
		words: [],
		translates: [],
		
		recountTotal: function(){
			$(Vocabulary.totalWordsNum).text(LW.wdsDB.index.length);
		},
		
		removeWord: function(self, notReindex){ //remove word from vocabulary
			var id = $(self).data('id'),
				node = $(self).data('node');
			
			if (!notReindex) {
				LW.wdsDB.index.splice(id, 1); //remove from index
				LW.wdsDB.storeItem('learnWords-words', LW.wdsDB.index.join());
			}
			LW.wdsDB.removeItem('learnWords-'+node); //remove this word
			$('#'+node).remove();
			$('#'+node+'Edit').remove();
			Vocabulary.recountTotal();
			Learn.wordsLearn = [];
			Learn.recountIndexLearn();
			Repeat.wordsRepeat = {
				currentIndexFirst: 0,
				first: [],
				currentIndexSecond: 0,
				second: [],
				currentIndexThird: 0,
				third: []
			};
			Repeat.recountIndexRepeat();
		},
		
		viewWord: function(){
			var contentInner = '';
			
			$(LW.wdsDB.index).each(function(index, node){
				var item = LW.wdsDB.readItem('learnWords-'+node),
					txt = item.word,
					translate = item.translate;
				
				Vocabulary.words.push(txt);
				Vocabulary.translates.push(translate);
				contentInner +=	Vocabulary.rowTemplate.replace(/{{node}}/g,node).replace(/{{txt}}/g,txt).replace(/{{translate}}/g,translate).replace(/{{index}}/g,index);
			});
			
			$(Vocabulary.vocabularyBox).html(contentInner);
			Vocabulary.recountTotal();
		},
		
		addSaveWord: function(wordTxt, translate, addForm, addWord){
			var inputWord = wordTxt.val().trim(),
				inputTranslate = translate.val().trim(),
				form = addForm,
				error = false,
				word = {};
			
			Utils.clearFields();
			//check for empty fields
			if (!inputWord) {
				error = Utils.setFieldError(form.children(':nth-child(1)').children(':nth-child(1)'));
			} else if (!inputTranslate) {
				error = Utils.setFieldError(form.children(':nth-child(2)').children(':nth-child(1)'));
			}
			if (error) { //show error if any
				$(Vocabulary.errorVocabularyBox).removeClass('nodisplay');
				$(Vocabulary.errorVocabulary).text(local[local.currentLocal].errorEmpty);
			} else { //otherwise save new word to Vocabulary
				var todayDate = Utils.getToday(true);
				word = {
					index: todayDate,
					word : inputWord,
					translate: inputTranslate,
					step: 0,
					date: 0
				};
				LW.wdsDB.storeItem('learnWords-'+todayDate, word); //save word
				contentInner = Vocabulary.rowTemplate.replace(/{{node}}/g,todayDate).replace(/{{txt}}/g,inputWord).replace(/{{translate}}/g,inputTranslate).replace(/{{index}}/g,(addWord) ? LW.wdsDB.index.length : LW.wdsDB.index.indexOf(inputWord));
				
				if (addWord) {
					LW.wdsDB.index.push(todayDate);
					wordTxt.val('');
					translate.val('');
					$(Vocabulary.errorVocabularyBox).removeClass('nodisplay');
					$(Vocabulary.errorVocabulary).text(local[local.currentLocal].errorNoW);
					$(Vocabulary.vocabularyBox).append(contentInner);
				} else {
					var id = wordTxt.attr('id').slice(5);
					
					LW.wdsDB.index[LW.wdsDB.index.indexOf(id)] = todayDate;
					$('#' + id).before(contentInner);
					Vocabulary.removeWord($('#del-' + id), true);
				}
				
				LW.wdsDB.storeItem('learnWords-words', LW.wdsDB.index.join()); //add word to Vocabulary list
				Utils.clearFields();
				Vocabulary.recountTotal();
				Learn.wordsLearn = [];
				Learn.recountIndexLearn();
				Learn.showWord();
			};
		},
		
		init: function(){
			$(document).on('click touchstart', '#addBtn', function(){
				Vocabulary.addSaveWord($(Vocabulary.inputWordTxt), $(Vocabulary.inputTranslate), $(Vocabulary.addWordForm), true);
			});
			$(document).on('click touchstart', '.js-edit-btn', function(){
				$('#'+$(this).data('node')).hide();
				$('#'+$(this).data('node')+'Edit').show();
			});
			$(document).on('click touchstart', '.js-save-btn', function(){
				Vocabulary.addSaveWord($('#word-'+$(this).data('node')), $('#translate-'+$(this).data('node')), $('#form-'+$(this).data('node')));
			});
			$(document).on('click touchstart', '.js-del-btn', function(){
				Vocabulary.removeWord(this);
			});
		}
	};
	
	Vocabulary.init();
}

/**************************************************
* Learn Words // learn.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
**************************************************/
if(typeof(Learn) == 'undefined' || Learn == null || !Learn){
	
	Learn = {
	
		wordsLearn: [],
		currentIndex: 0,
		
		learnWordsNum: $('#learnWordsNum'),
		learnWordsTopNum: $('#learnWordsTopNum'),
		learnWordsTopSNum: $('#learnWordsTopSNum'),
		
		learnWord: $('#learnWord'),
		translateWord: $('#translateWord'),
		learnWordsGrp: $('#learnWordsGrp'),
		noWordsLeft: $('#noWordsLeft'),
		allWordsOk: $('#allWordsOk'),
		
		recountIndexLearn: function(){ //count words to learn
			if (!Learn.wordsLearn.length) {
				$(LW.wdsDB.index).each(function(index, node){ //the initial counting
					var item = LW.wdsDB.readItem('learnWords-'+node);
					if (item.step == 0) {
						Learn.wordsLearn.push(item);
					}
				});
			}
			var wordsLearnLength = (Learn.wordsLearn.length) ? Learn.wordsLearn.length : '';
			
			$(learnWordsNum).text(wordsLearnLength || '0');
			$(learnWordsTopNum).text(wordsLearnLength);
			$(learnWordsTopSNum).text(wordsLearnLength);
		},
		
		showWord: function(){ //show a next word to learn
			if (Learn.wordsLearn.length) {
				$(learnWord).text(Learn.wordsLearn[Learn.currentIndex].word);
				$(translateWord).text(Learn.wordsLearn[Learn.currentIndex].translate);
				$(learnWordsGrp).removeClass('nodisplay');
				$(noWordsLeft).addClass('nodisplay');
			} else {
				$(allWordsOk).text(local[local.currentLocal].allWordsOk);
				$(noWordsLeft).removeClass('nodisplay');
				$(learnWordsGrp).addClass('nodisplay');
			}
		},
		
		actionWord: function(step, reindex){
			if (step) {
				var word = {
						index: Learn.wordsLearn[Learn.currentIndex].index,
						word : Learn.wordsLearn[Learn.currentIndex].word,
						translate: Learn.wordsLearn[Learn.currentIndex].translate,
						step: step,
						date: (step == 1) ? (Utils.getToday() + 864000000 * Settings.params.first) : 0
					};
				
				LW.wdsDB.storeItem('learnWords-'+Learn.wordsLearn[Learn.currentIndex].index, word); //save word
				
				if (reindex) {
					Learn.wordsLearn.splice(Learn.currentIndex, 1); //remove from index
					Learn.recountIndexLearn();
				} else {
					Learn.currentIndex++;
				}
			} else {
				Learn.currentIndex++;
			}
			
			if (Learn.currentIndex >= Learn.wordsLearn.length) {
				Learn.currentIndex = 0;
			}
			Learn.showWord();
		},
		
		rememberWord: function(){
			Learn.actionWord(1, true);
		},
		
		repeatWord: function(){
			Learn.actionWord(0);
		},
		
		knownWord: function(){
			Learn.actionWord(4, true);
		},
		
		init: function(){
			$(document).on('click touchstart', '#rememberBtn', Learn.rememberWord);
			$(document).on('click touchstart', '#repeatBtn', Learn.repeatWord);
			$(document).on('click touchstart', '#knownBtn', Learn.knownWord);
		}
	};
	
	Learn.init();
}

/**************************************************
* Learn Words // repeat.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
**************************************************/
if(typeof(Repeat) == 'undefined' || Repeat == null || !Repeat){
	
	Repeat = {
	
		wordsRepeat: {
			first: [],
			second: [],
			third: []
		},
		
		repeatWordsNum: $('#repeatWordsNum'),
		repeatWordsTopNum: $('#repeatWordsTopNum'),
		repeatWordsTopSNum: $('#repeatWordsTopSNum'),
		checkWord: $('#checkWord'),
		checkWordInp: $('#checkWordInp'),
		enterWord: $('#enterWord'),
		inputWord: $('#inputWord'),
		noWordsRepeat: $('#noWordsRepeat'),
		enterBtn: $('#enterBtn'),
		
		recountIndexRepeat: function(){ //count words to Repeat
			if (!Repeat.wordsRepeat.first.length && !Repeat.wordsRepeat.second.length && !Repeat.wordsRepeat.third.length) {
				$(LW.wdsDB.index).each(function(index, node){ //the initial counting
					var item = LW.wdsDB.readItem('learnWords-'+node);
					
					if (Utils.getToday() > item.date) { //if this word is for today
						if (item.step == 1) {
							Repeat.wordsRepeat.first.push(item);
						} else if (item.step == 2) {
							Repeat.wordsRepeat.second.push(item);
						} if (item.step == 3) {
							Repeat.wordsRepeat.third.push(item);
						}
					}
				});
			}
			var wordsRepeatTotal = Repeat.wordsRepeat.first.length + Repeat.wordsRepeat.second.length + Repeat.wordsRepeat.third.length,
				wordsRepeatLength = (wordsRepeatTotal) ? wordsRepeatTotal : '';
			
			$(repeatWordsNum).text(wordsRepeatLength  || '0');
			$(repeatWordsTopNum).text(wordsRepeatLength);
			$(repeatWordsTopSNum).text(wordsRepeatLength);
		},
		
		getWord: function(index, arrWords){
			//if index is 0 we get the correct word. The other words are random
			if (index == 0) {
				wordPlaceholder = Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'][0]		[(Repeat.wordsRepeat.first.length) ? 'translate' : 'word'];
			} else {
				wordPlaceholder = Vocabulary[(Repeat.wordsRepeat.first.length) ? 'translates' : 'words'][Utils.getRandomInt(0, Vocabulary[(Repeat.wordsRepeat.first.length) ? 'translates' : 'words'].length-1)];	
			}
			
			if(arrWords.indexOf(wordPlaceholder) >= 0)
			{
				Repeat.getWord(index, arrWords);
			}
			
			return wordPlaceholder;
		},


		showWord: function(){ //show a next word to Repeat
			if (Repeat.wordsRepeat.first.length || Repeat.wordsRepeat.second.length) {
				var id = Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'][0].index,
					wordPlaceholder = '';
				var arrWords = new Array();	
				$(checkWordInp).text(Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'][0][(Repeat.wordsRepeat.first.length) ? 'word' : 'translate']).data('id', id);
				
				var arrOptionButtons = $('[data-type=checkWordBtn]');
				//the answer buttons are shuffled so that we don't know which one is the correct word.
				Utils.shuffle(arrOptionButtons);
				
				arrOptionButtons.each(function(index, node){

					wordPlaceholder = Repeat.getWord(index, arrWords);
					
					arrWords[index] = wordPlaceholder;	
					
					$(this).text(wordPlaceholder);
				});				$(enterBtn).data('direction', true);
				$(checkWord).removeClass('nodisplay');
				$(enterWord).addClass('nodisplay');
				$(noWordsRepeat).addClass('nodisplay');
			} else if (Repeat.wordsRepeat.third.length) {
				$(enterWordInp).text(Repeat.wordsRepeat.third[0].translate);
				$(checkWord).addClass('nodisplay');
				$(enterWord).removeClass('nodisplay');
				$(noWordsRepeat).addClass('nodisplay');
			} else {
				$(checkWord).addClass('nodisplay');
				$(enterWord).addClass('nodisplay');
				$(noWordsRepeat).removeClass('nodisplay');
			}
		},
		
		actionWord: function(step, reindex){
			if (step) {
				
				
				LW.wdsDB.storeItem('learnWords-'+Repeat.wordsRepeat[Repeat.currentIndex].word, word); //save word
				
				if (reindex) {
					Repeat.wordsRepeat.splice(Repeat.currentIndex, 1); //remove from index
					Repeat.recountIndexRepeat();
				} else {
					Repeat.currentIndex++;
				}
			} else {
				Repeat.currentIndex++;
			}
			
			if (Repeat.currentIndex >= Repeat.wordsRepeat.length) {
				Repeat.currentIndex = 0;
			}
			Repeat.showWord(Repeat.currentIndex);
		},
		
		checkWord: function(self){
			var word = {
					index: Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'][0].index,
					word : Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'][0].word,
					translate: Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'][0].translate,
					step: Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'][0].step,
				};
			
			if ($(self).text() == ((Repeat.wordsRepeat.first.length) ? word.translate : word.word)){
				word.step++;
				word.date = Utils.getToday() + 864000000 * Settings.params[(Repeat.wordsRepeat.first.length) ? 'second' : 'third'];
			} else {
				word.step--;
				word.date = (Repeat.wordsRepeat.first.length) ? 0 : Utils.getToday() + 864000000 * Settings.params.first;
			}
			LW.wdsDB.storeItem('learnWords-'+word.index, word); //save word
			Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'].splice(0, 1); //remove from index
			Learn.wordsLearn = [];
			Learn.recountIndexLearn();
			Learn.showWord();
			Repeat.recountIndexRepeat();
			Repeat.showWord();
		},
		
		repeatWord: function(){
			var word = {
					index: Repeat.wordsRepeat.third[0].index,
					word : Repeat.wordsRepeat.third[0].word,
					translate: Repeat.wordsRepeat.third[0].translate,
					step: Repeat.wordsRepeat.third[0].step,
				};
			if ($(enterWordInp).val() == word.word) {
				word.step++;
				word.date = 0;
			} else {
				word.step--;
				word.date = Utils.getToday() + 864000000 * Settings.params.second;
			};
			LW.wdsDB.storeItem('learnWords-'+word.index, word); //save word
			Repeat.wordsRepeat.third.splice(0, 1); //remove from index
			Learn.wordsLearn = [];
			Learn.recountIndexLearn();
			Learn.showWord();
			Repeat.recountIndexRepeat();
			Repeat.showWord();
		},
		
		init: function(){
			$(document).on('click touchstart', '[data-type=checkWordBtn]', function(){
				Repeat.checkWord(this)
			});
			$(document).on('click touchstart', '#enterBtn', Repeat.repeatWord);
		}
	};
	
	Repeat.init();
}

/**************************************************
* Learn Words // main.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
**************************************************/
// read settings
Settings.getSettings();

// set user saved local
if (local.currentLocal != $('[data-type=lang-select].selected').data('lang')) {
	$('[data-lang='+local.currentLocal+']').click();
};

// read vocabulary

LW.wdsDB.index = LW.wdsDB.readItem('learnWords-words').split(',');
Vocabulary.viewWord();
Learn.recountIndexLearn();
Learn.showWord();
Repeat.recountIndexRepeat();
Repeat.showWord();
Utils.closeMobMenu();
