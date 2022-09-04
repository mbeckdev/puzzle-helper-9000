import { link } from 'fs';
import React, { useState, useEffect } from 'react';
//real data
import data from '../../assets/tenThousandWords.txt';
//test data
// import data from '../../assets/tenThousandWordsJust20.txt';

function ThreeWordAnagramSolver() {
  //turn raw .txt file into one long array of words 10000 long   named rawText
  // find the lines that say   saw or Saw and   delete everything after the or
  //lowercase everything

  // - done - name the new array of strings    wordList

  //get the input into a string called    inputString

  //logic.......................
  //look at one word from the list.
  //  does the word fit inside the inputString?  and in the correct order?
  //     if so add it to  a new array called             wordsThatFit

  // take all the wordsThatFit and look at them one by one
  // the inputString minus those letters of this word1 is the new inputStringSmallerx1
  //       then inputStringSmallerx1 minus those letters of that new word2 = inputStringSmallerx2
  //             then inputStringSmallerx2 minus those letters of new word3 = inputStringLastString
  // if inputStringLastString is size 1 letter, might have found the answer
  //   .... so in a new array called possibleAnswers, add this set of [word1,word2,word3,inputStringLastString]

  // print out nicely all the possibleAnswers and see if any of them make sense together with your brain.
  //    (idk how the heck to do that programmatically)

  // const [answer, setAnswer] = useState<any>(null);

  // const [rawText, setRawText] = useState<any>(null);

  // ******************************************************************************

  //.
  // const [answer, setAnswer] = useState<any>(null);
  const [rawText, setRawText] = useState<any>(null);

  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const [theAnswer, setTheAnswer] = useState<any>(null);
  const [inputString, setInputString] = useState<string>('');
  const [wordList, setWordList] = useState<string[]>([]);
  // const testInput: string = 'qaqnqdq';
  // const testInput: string = 'atwhnoxuildd';
  const testInput: string = 'papsfrutesutternet';

  // and this would x    atwhnoxuildd

  // let possibleAnswers: Answer[] = [];
  let possibleAnswers: string[] = [];
  // const wordList2: string[] = useRef([]);

  let url = data;
  console.log('url = ', url);

  function splitUpData(rawTxt: string) {
    console.log('... doot... splitting updata ... mock');
    let tempWordList: string[] = [];
    //STEP 1 pull in raw data - make sure there are 10000 words in it
    tempWordList = rawText.split('\r\n');
    //last one is empty - get rid of it
    tempWordList.pop();
    // console.log(tempWordList[tempWordList.length - 1]);
    // console.log('tempWordList', tempWordList);

    //STEP2 - fix  "saw or Saw" lines
    for (let i = 0; i < tempWordList.length; i++) {
      let word = tempWordList[i].toLowerCase();
      let orString = ' or ';

      let doesIncludeOrString = word.includes(orString);
      if (doesIncludeOrString) {
        let orIndex = tempWordList[i].indexOf(orString);
        // console.log(orIndex)
        // console.log(tempWordList[i], ' or index = ', orIndex);
        let changedWord = tempWordList[i].slice(0, orIndex);
        tempWordList[i] = changedWord;
        // console.log(tempWordList[i], ' after');
      }

      //STEP3 - Lowercase everything
      tempWordList[i] = tempWordList[i].toLowerCase();
    }

    // console.log('all the words!!!!! = ', tempWordList);
    return tempWordList;
  }

  useEffect(() => {
    if (rawText) {
      console.log('rawText exists, about to splitUpData');
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // wordList = splitUpData(rawText);
      setWordList(splitUpData(rawText));

      gameLogic();
    }
  }, [rawText]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw response;
      })
      .then((rawText) => {
        setRawText(rawText);
        // console.log('settingRawText');
      })
      .catch((error) => {
        console.error('Error fetching rawText: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        console.log('loading complete!');
      });
  }, [url]);

  let answer1 = getAnswer();
  function getAnswer() {
    return 42;
  }

  let wordsThatFit: string[] = [];

  function getAllWordsThatFit() {
    //look at one word from the list.
    //  does the word fit inside the inputString?  and in the correct order?
    //     if so add it to  a new array called

    let tempLetterOrder: number[] = [];
    // for one word from the big word list:
    for (let i = 0; i < wordList.length; i++) {
      let wordFromList = wordList[i];
      //and       wordFromList
      //qaqnqdq   inputString

      let bln: boolean = inputString.includes(wordFromList);

      // for each letter in one word from the big word list
      let inputStringCutShort = inputString;
      for (let j = 0; j < wordList[i].length; j++) {
        let word = wordList[i]; //and
        let letter = word[j]; //a
        //a   n    d
        // a

        //first time //a appears in inputString? //qaqnqdq
        // console.log('inputString = ', inputString);
        let indexLetterAppears = inputStringCutShort.indexOf(letter);
        // console.log('inputString=', inputString);
        // console.log('inputStringCutShort=', inputStringCutShort);
        // console.log(
        //   'word =',
        //   word,
        //   ', letter =',
        //   letter,
        //   ', indexLetterAppears in input',
        //   inputStringCutShort,
        //   'at place =',
        //   indexLetterAppears
        // );
        // debugger;
        if (indexLetterAppears < 0) {
          //letter isn't in the word
          // console.log('reseting tempLetterOrder to []');
          tempLetterOrder = [];
          break;
        }

        tempLetterOrder.push(indexLetterAppears);
        // debugger;
        //get new string starting at the index we found last - so we can check this smaller string for next letter
        inputStringCutShort = inputStringCutShort.substring(
          indexLetterAppears + 1,
          inputStringCutShort.length
        );
        // console.log('tempLetterOrder = ', tempLetterOrder);
        // if (j >= wordList[i].length - 1) {

        ///////////////////////////////////// go through all the indexes obtained to see if it's a legit order
        // check if we're on the last letter of the word
        if (j >= wordList[i].length - 1) {
          // console.log(
          //   'j >= wordList[i].length - 1',
          //   j >= wordList[i].length - 1,
          //   ' j = ',
          //   j,
          //   'wordList[i].length -1',
          //   wordList[i].length - 1
          // );
          //last letter, which means the whole word fits, /////////////////////////maybe in wrong order
          // console.log('were on the last letter yea?');
          //order should be correct if we're checking inputStringCutshort

          wordsThatFit.push(wordList[i]);

          // // check correct order
          // // 3,5,7 = good order,  5,2,7 = bad order
          // let lastNumber = 0;
          // for (let k = 0; k < tempLetterOrder.length; k++) {
          //   let thisNumber = tempLetterOrder[k];
          //   // console.log('thisNumber', thisNumber);
          //   console.log(
          //     'lastNumber = ',
          //     lastNumber,
          //     'thisNumber = ',
          //     thisNumber
          //   );
          //   if (lastNumber < thisNumber) {
          //     if (k >= tempLetterOrder.length - 1) {
          //       if (k == 3) {
          //         debugger;
          //       }
          //       console.log('k=', k);
          //       //at end of word and order is correct
          //       console.log('at end of word and order is correct');
          //       wordsThatFit.push(wordList[i]);
          //       console.log('wordsThatFit is now', wordsThatFit);

          //       console.log('reseting tempLetterOrder to []');
          //       tempLetterOrder = [];
          //       lastNumber = 0;
          //       thisNumber = 0;
          //     } else {
          //       lastNumber = thisNumber;
          //       console.log('lastNumber changed to', lastNumber);
          //     }
          //   } else {
          //     break;
          //   }
          // }
          // console.log('reseting tempLetterOrder to []');
          tempLetterOrder = [];
        }
      }
    }
  }

  /// *******************************************************
  /// *******************************************************
  /// *******************************************************
  function gameLogic() {
    setInputString(testInput);
    //changeme
    // console.log('game logic now ');
    console.log('*******************game logic now ', wordList);

    console.log('*******************');
    console.log('*******************');
    console.log('*******************');
    console.log('*******************');

    //Find all words that fit
    getAllWordsThatFit(); //sets wordsThatFit. - an array of strings

    console.log('AFTER wordsThatFit = ', wordsThatFit);

    // take all the wordsThatFit and look at them one by one
    // the inputString minus those letters of this word1 is the new inputStringSmallerx1
    //       then inputStringSmallerx1 minus those letters of that new word2 = inputStringSmallerx2
    //             then inputStringSmallerx2 minus those letters of new word3 = inputStringLastString
    // if inputStringLastString is size 1 letter, might have found the answer
    //   .... so in a new array called possibleAnswers, add this set of [word1,word2,word3,inputStringLastString]

    let word1 = 'yellow';
    let word2 = 'cat';
    let word3 = 'pickle';
    let leftOverLetter = 's';

    let finalStringToShow = word1.concat(
      ', ',
      word2,
      ', ',
      word3,
      ', ',
      leftOverLetter
    );

    possibleAnswers.push(finalStringToShow);
    console.log('possibleAnswers = ', possibleAnswers);
    setTheAnswer(possibleAnswers);
  }
  /// *******************************************************
  /// *******************************************************
  /// *******************************************************

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputString(testInput);
    // console.log('inputString = ', inputString);
    setInputString(e.target.value);
    // changemeback!
  }
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit hit');
    gameLogic();
  };

  useEffect(() => {
    console.log('inputString = ', inputString);
  }, [inputString]);

  let thing = wordsThatFit.map((word) => <li>{word}</li>);

  const [listofthings, setlistofthings] = useState<any>(null);
  useEffect(() => {
    thing = wordsThatFit.map((word) => <li>{word}</li>);
  }, [listofthings]);

  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) => <li>{number}</li>);
  return (
    <div>
      <h2>ThreeWordAnagramSolver</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="theInput">
          Crazy string of 3 words + one extra letter:{' '}
        </label>
        <input
          type="text"
          name="theInput"
          value={inputString}
          onChange={handleInputChange}
        />
        <button>GO</button>
        <span>
          {' '}
          Answer is {answer1} {theAnswer}
        </span>
        <div>
          List of english words to check against were taken from first 10000
          words of wiktionary with the{' '}
          <a href="https://creativecommons.org/licenses/by-sa/3.0/">
            Creative Commons Attribution-ShareAlike License
          </a>{' '}
          That's 97% of the most frequent english words from TV and movie
          scripts
        </div>
        <div>
          <h3>Words that fit</h3>
          <ul>{thing}</ul>
          <ul>{listItems}</ul>
        </div>
      </form>
    </div>
  );
}

export default ThreeWordAnagramSolver;
