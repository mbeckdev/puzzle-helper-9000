import React, { useState, useEffect } from 'react';
//real data
// import data from '../../assets/tenThousandWords.txt';
//test data
import data from '../../assets/tenThousandWordsJust20.txt';

function ThreeWordAnagramSolver() {
  //turn raw .txt file into one long array of words 10000 long   named rawText
  // find the lines that say   saw or Saw and   delete everything after the or
  //lowercase everything

  //name the new array of strings    wordList

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
  const testInput: string = 'qaqnqdq';

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
    console.log('tempWordList', tempWordList);

    //STEP2 - fix  "saw or Saw" lines
    for (let i = 0; i < tempWordList.length; i++) {
      let word = tempWordList[i].toLowerCase();
      let orString = ' or ';

      let doesIncludeOrString = word.includes(orString);
      if (doesIncludeOrString) {
        let orIndex = tempWordList[i].indexOf(orString);
        // console.log(orIndex)
        console.log(tempWordList[i], ' or index = ', orIndex);
        let changedWord = tempWordList[i].slice(0, orIndex);
        tempWordList[i] = changedWord;
        console.log(tempWordList[i], ' after');
      }

      //STEP3 - Lowercase everything
      tempWordList[i] = tempWordList[i].toLowerCase();
    }

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

  function gameLogic() {
    // console.log('game logic now ');
    console.log('game logic now ', wordList);

    //look at one word from the list.
    //  does the word fit inside the inputString?  and in the correct order?
    //     if so add it to  a new array called

    for (let i = 0; i < wordList.length; i++) {
      let wordFromList = wordList[i];
      //and       wordFromList
      //qaqnqdq   inputString

      let bln: boolean = inputString.includes(wordFromList);
      for (let j = 0; j < wordList[i].length; j++) {
        let word = wordList[i];
        let letter = word[j];
        //a   n    d
        // a

        //first time //a appears in inputString?
        let firstPlaceLetterAppears = inputString.indexOf(letter);
        console.log(
          'word = ',
          word,
          ' letter = ',
          letter,
          'firstPlaceLetterAppears in ',
          inputString,
          ' = ',
          firstPlaceLetterAppears
        );
        if (firstPlaceLetterAppears < 0) break; //letter isn't in the word
      }
    }

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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputString(testInput);
    console.log('inputString = ', inputString);
    // setInputString(e.target.value);
    // changemeback
  }
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit hit');
    gameLogic();
  };

  useEffect(() => {
    console.log('inputString = ', inputString);
  }, [inputString]);

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
      </form>
    </div>
  );
}

export default ThreeWordAnagramSolver;
