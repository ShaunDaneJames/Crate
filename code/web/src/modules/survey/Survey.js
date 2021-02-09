// Imports
import React, { useState } from 'react';
import { APP_URL } from '../../setup/config/env';

// UI Imports
// import sporty from './assets/running.jpg';

// App Imports
import { surveyQuestions } from './surveyQuestions';

// State will store current question
// as well as obj with response tallies

const Survey = () => {
  const [question, setQuestion] = useState(surveyQuestions[0]);
  const [styleAnswers, setStyleAnswers] = useState({
    grunge: [],
    sporty: [],
    classic: [],
    casual: [],
    bohemian: [],
  });

  const recordAnswer = (cat) => {
    setStyleAnswers(styleAnswers, styleAnswers[cat].push(question.id));
    let i = surveyQuestions.indexOf(question);
    if (i === surveyQuestions.length - 1) {
      console.log('Limit Reached');
      calculateStyle()
      //go to the function that calculates the style
      //conditionally render the users style
      //on the conditionally rendered your style view, path to the profile (history)
      //TODO: ensure that when survey is complete they are ALSO subscribed to the crate they clicked on
      //TODO: add style to profile page
      return;
    }
    setQuestion(surveyQuestions[i + 1]);
  };

  const createAnswer = (answer) => {
    return (
      <div
        onClick={() => recordAnswer(answer.category)}
        key={answer.text}
        style={{ padding: '1em' }}
      >
        <h3>{answer.text}</h3>
        <img
          src={APP_URL + answer.image}
          style={{ width: '10em', height: '7em' }}
        />
      </div>
    );
  };

  const calculateStyle = () => {
    let styleTally = Object.entries(styleAnswers)
    let sortedStyles = styleTally.sort((a,b) => {
      return b[1].length > a[1].length ? 1 : -1
    })
    debugger;
    let style1 = sortedStyles[0][1]
    let style2 = sortedStyles[1][1]
    if (style1.length === 1) {
      console.log('Your style is: ecletic style')
    } else if (style1.length === style2.length) {
      console.log(`Your style is: ${sortedStyles[0][0]} but ${sortedStyles[1][0]}`)
    } else if (style1.length > style2.length) {
      console.log(`Your style is: ${sortedStyles[0][0]}`)
    }
    //need to sort the object by array length
    //condition 1: array[0] has length 1: eclectic
    //condition 2: if array[0] = array[1]: style 1 but style 2
    //condition 3: array[0] is not equal to array[1]: that style
    //then render this is your style view (leads to profile etc)
  }

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ padding: '4em' }}>{question.question}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {question.answers.map((answer) => createAnswer(answer))}
      </div>
    </section>
  );
};

export default Survey;
