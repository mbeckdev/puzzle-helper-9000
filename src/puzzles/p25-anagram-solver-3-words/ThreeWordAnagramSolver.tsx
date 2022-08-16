import React, { useState, useEffect } from 'react';
import data from '../../assets/tenThousandWords.txt';

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

  let url = data;
  console.log(url);

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

    // console.log(rawText);

    //STEP3 - Lowercase everything

    return tempWordList;
  }

  // let initialState = '';
  let wordList = [];
  useEffect(() => {
    if (rawText) {
      console.log('rawText exists, about to splitUpData');
      wordList = splitUpData(rawText);

      // gameLogic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // let answer = 0;
  let answer1 = getAnswer();
  // setAnswer(dur);

  function getAnswer() {
    return 42;
  }

  return (
    <div>
      <h2>ThreeWordAnagramSolver</h2>
      <label htmlFor="theInput">
        Crazy string of 3 words + one extra letter:{' '}
      </label>
      <input type="text" name="theInput" />
      <button>GO</button>
      <span> Answer is {answer1}</span>
    </div>
  );
}

export default ThreeWordAnagramSolver;
