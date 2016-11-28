/**************************************************
* Learn Words // settings.js
* coded by Anatolii Marezhanyi aka e1r0nd//[CRG] - March 2014
* http://linkedin.com/in/merezhany/ e1r0nd.crg@gmail.com
* Placed in public domain.
*
* All four action files
*    settings.js
*    learn.js
*    repeat.js
*    vocabulary.js
*
* have been place together into this file action.js.
*
* This will make it easier to do further changes.
*
* Update by Hannes Hirzel, November 2016
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
			var settings = LW.db.getSettings();
			
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
			
			LW.Utils.clearFields();
			//check for empty fields
			if (!first) {
				error = LW.Utils.setFieldError(form.children(':nth-child(1)'));
				errorName = 'empty';
			} else if (!second) {
				error = LW.Utils.setFieldError(form.children(':nth-child(2)'));
				errorName = 'empty';
			} else if (!third) {
				error = LW.Utils.setFieldError(form.children(':nth-child(3)'));
				errorName = 'empty';
			} else { //only digits is valid
				if (!LW.Utils.isNumber(first)) {
					error = LW.Utils.setFieldError(form.children(':nth-child(1)'));
					errorName = 'number';
				};
				if (!LW.Utils.isNumber(second)) {
					error = LW.Utils.setFieldError(form.children(':nth-child(2)'));
					errorName = 'number';
				};
				if (!LW.Utils.isNumber(third)) {
					error = LW.Utils.setFieldError(form.children(':nth-child(3)'));
					errorName = 'number';
				};
			}
			if (error) { //show error if any
				var errorTxt = (errorName == 'empty') ? LW.local[LW.local.current].errorEmpty : LW.local[LW.local.current].errorValid;
				$(Settings.errorSettings).removeClass('nodisplay').text(errorTxt);
			} else { //otherwise save new settings
				settings = {
					first : first,
					second: second,
					third: third
				};
                                LW.db.putSettings(settings);
				$(Settings.errorSettings).removeClass('nodisplay').text(LW.local[LW.local.current].errorNo);
				
				Settings.params = settings; //store local
			};
		},
		
		cancelSetting: function(){
			LW.Utils.clearFields();
			Settings.getSettings();
		},
		
		init: function(){
			$(document).on('click', '#saveSettings', Settings.saveSetting);
			$(document).on('click', '#cancelSettings', Settings.cancelSetting);
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
			$(Vocabulary.totalWordsNum).text(LW.db.index.length);
		},
		
		removeWord: function(self, notReindex){ //remove word from vocabulary
			var id = $(self).data('id'),
				node = $(self).data('node');
			
			if (!notReindex) {
				LW.db.index.splice(id, 1); //remove from index
				LW.db.put(LW.db.name+'-words', LW.db.index.join());
			}
			LW.db.remove(LW.db.name+'-'+node); //remove this word
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
			
			$(LW.db.index).each(function(index, node){
				var item = LW.db.get(LW.db.name+'-'+node),
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
                        "use strict";
                        
			var inputWord = wordTxt.val().trim(),
				inputTranslate = translate.val().trim(),
				form = addForm,
				error = false,
				word = {};
			
			LW.Utils.clearFields();
			//check for empty fields
			if (!inputWord) {
				error = LW.Utils.setFieldError(form.children(':nth-child(1)').children(':nth-child(1)'));
			} else if (!inputTranslate) {
				error = LW.Utils.setFieldError(form.children(':nth-child(2)').children(':nth-child(1)'));
			}
			if (error) { //show error if any
				$(Vocabulary.errorVocabularyBox).removeClass('nodisplay');
				$(Vocabulary.errorVocabulary).text(local[local.currentLocal].errorEmpty);
			} else { //otherwise save new word to Vocabulary
				var newIndexVal;
                                var todayDate = LW.Utils.getToday(true);
				word = {
					index: todayDate,
					word : inputWord,
					translate: inputTranslate,
					step: 0,
					date: 0
				};

                                // save newly added word
                                newIndexVal = 'index'+(LW.db.index.length+1);
				LW.db.put(LW.db.name+'-'+newIndexVal, word); 

				var contentInner = Vocabulary.rowTemplate.replace(/{{node}}/g,todayDate).replace(/{{txt}}/g,inputWord).replace(/{{translate}}/g,inputTranslate).replace(/{{index}}/g,(addWord) ? LW.db.index.length : LW.db.index.indexOf(inputWord));
				
				if (addWord) {
					LW.db.index.push(newIndexVal);
					wordTxt.val('');
					translate.val('');
					$(Vocabulary.errorVocabularyBox).removeClass('nodisplay');
					$(Vocabulary.errorVocabulary).text(LW.local[LW.local.current].errorNoW);
					$(Vocabulary.vocabularyBox).append(contentInner);
				} else {
					var id = wordTxt.attr('id').slice(5);
					
					LW.db.index[LW.db.index.indexOf(id)] = newIndexVal;
					$('#' + id).before(contentInner);
					Vocabulary.removeWord($('#del-' + id), true);
				}
				
				LW.db.put(LW.db.name+'-words', LW.db.index.join()); //add word to Vocabulary list
				LW.Utils.clearFields();
				Vocabulary.recountTotal();
				Learn.wordsLearn = [];
				Learn.recountIndexLearn();
				Learn.showWord();
			};
		},
		





		
		init: function(){
			$(document).on('click', '#addBtn', function(){
				Vocabulary.addSaveWord($(Vocabulary.inputWordTxt), $(Vocabulary.inputTranslate), $(Vocabulary.addWordForm), true);
			});
			$(document).on('click', '.js-edit-btn', function(){
				$('#'+$(this).data('node')).hide();
				$('#'+$(this).data('node')+'Edit').show();
			});
			$(document).on('click', '.js-save-btn', function(){
				Vocabulary.addSaveWord($('#word-'+$(this).data('node')), $('#translate-'+$(this).data('node')), $('#form-'+$(this).data('node')));
			});
			$(document).on('click', '.js-del-btn', function(){
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
				$(LW.db.index).each(function(index, node){ //the initial counting
					var item = LW.db.get(LW.db.name+'-'+node);
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
				$(allWordsOk).text(LW.local[LW.local.current].allWordsOk);
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
						date: (step == 1) ? (LW.Utils.getToday() + LW.Utils.delay * Settings.params.first) : 0
					};
				
				LW.db.put(LW.db.name+'-'+Learn.wordsLearn[Learn.currentIndex].index, word); //save word
				
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
			$(document).on('click', '#rememberBtn', Learn.rememberWord);
			$(document).on('click', '#repeatBtn', Learn.repeatWord);
			$(document).on('click', '#knownBtn', Learn.knownWord);
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
		
		answerWasCorrectFeedback: function(correct)
		{
			$('#feedback').show();
			
			var answerType = "wrong";
			if(correct)
			{
				answerType = "correct";
			}
			$('#feedback').html('<img src="media/symbols/' + answerType + '.png">');
			LW.Utils.playAudio("media/sound/" + answerType + ".mp3");

			return true;
		},



		recountIndexRepeat: function(){ //count words to Repeat
			if (!Repeat.wordsRepeat.first.length && !Repeat.wordsRepeat.second.length && !Repeat.wordsRepeat.third.length) {
				$(LW.db.index).each(function(index, node){ //the initial counting
					var item = LW.db.get(LW.db.name+'-'+node);
					
					if (LW.Utils.getToday() > item.date) { //if this word is for today
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
				wordPlaceholder = Vocabulary[(Repeat.wordsRepeat.first.length) ? 'translates' : 'words'][LW.Utils.getRandomInt(0, Vocabulary[(Repeat.wordsRepeat.first.length) ? 'translates' : 'words'].length-1)];	
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
				LW.Utils.shuffle(arrOptionButtons);
				
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
				
				
				LW.db.put(LW.db.name+'-'+Repeat.wordsRepeat[Repeat.currentIndex].word, word); //save word
				
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



                MoveWordToOtherBoxAndGiveFeedback: function(word,answer) {

			if (answer == ((Repeat.wordsRepeat.first.length) ? word.translate : word.word)){
                                Repeat.answerWasCorrectFeedback(true);
				word.step++;  // put word into next box
				word.date = LW.Utils.getToday() + LW.Utils.delay * Settings.params[(Repeat.wordsRepeat.first.length) ? 'second' : 'third'];
			} else {
                                Repeat.answerWasCorrectFeedback(true);
				word.step--;  
				word.date = (Repeat.wordsRepeat.first.length) ? 0 : LW.Utils.getToday() + LW.Utils.delay * Settings.params.first;
			};

			//save word
			LW.db.put(LW.db.name+'-'+word.index, word);
		},



		
		checkWord: function(self){
			var word = {
					index: Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'][0].index,
					word : Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'][0].word,
					translate: Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'][0].translate,
					step: Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'][0].step,
				};

			Repeat.MoveWordToOtherBoxAndGiveFeedback(word,$(self).text());


			setTimeout(function () {
				$('#feedback').hide();

                                //remove word from word keys index
				Repeat.wordsRepeat[(Repeat.wordsRepeat.first.length) ? 'first' : 'second'].splice(0, 1); 

                                // recalculate indexes for Learn box (step 0) and 
                                // Repeat boxes (steps 1 .. 3)
				Learn.wordsLearn = [];
				Learn.recountIndexLearn();
				Learn.showWord();
				Repeat.recountIndexRepeat();
				Repeat.showWord();
			}, 2000);


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
				word.date = LW.Utils.getToday() + LW.Utils.delay * Settings.params.second;
			};
			LW.db.put(LW.db.name+'-'+word.index, word); //save word
			Repeat.wordsRepeat.third.splice(0, 1); //remove from index
			Learn.wordsLearn = [];
			Learn.recountIndexLearn();
			Learn.showWord();
			Repeat.recountIndexRepeat();
			Repeat.showWord();
		},
		
		init: function(){
			$(document).on('click', '[data-type=checkWordBtn]', function(){
				Repeat.checkWord(this)
			});
			$(document).on('click', '#enterBtn', Repeat.repeatWord);
		}
	};
	
	Repeat.init();
}


