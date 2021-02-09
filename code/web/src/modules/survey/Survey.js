// Imports
import React, { useState } from 'react';
import { APP_URL } from '../../setup/config/env';

// UI Imports

// App Imports
import { surveyQuestions } from './surveyQuestions';
import userRoutes from '../../setup/routes/user';

const Survey = (props) => {
  const [question, setQuestion] = useState(surveyQuestions[0]);
  const [styleAnswers, setStyleAnswers] = useState({
    Grunge: [],
    Sporty: [],
    Classic: [],
    Casual: [],
    Bohemian: [],
  });
  const [userStyle, setUserStyle] = useState(null);

  const recordAnswer = (cat) => {
    setStyleAnswers(styleAnswers, styleAnswers[cat].push(question.id));
    let i = surveyQuestions.indexOf(question);
    if (i === surveyQuestions.length - 1) {
      calculateStyle()
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

    let style1 = sortedStyles[0][1]
    let style2 = sortedStyles[1][1]
    if (style1.length === 1) {
      setUserStyle('Ecletic')
    } else if (style1.length === style2.length) {
      setUserStyle(`${sortedStyles[0][0]} but ${sortedStyles[1][0]}`)
    } else if (style1.length > style2.length) {
      setUserStyle(`${sortedStyles[0][0]}`)
    }

    debugger;
    window.setTimeout(() => {
      props.history.push(userRoutes.subscriptions.path);
    }, 3000);
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
      {!userStyle &&
        <section>
          <h1 style={{ padding: '4em' }}>{question.question}</h1>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {question.answers.map((answer) => createAnswer(answer))}
          </div>
        </section>}
      {userStyle && 
        <section>
          <h1>Congrats! Your style is {userStyle}!</h1>
        </section>}
    </section>
  );
};

export default Survey;
