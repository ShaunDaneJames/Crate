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
      return;
    }
    setQuestion(surveyQuestions[i + 1]);
  };

  const createAnswer = (answer) => {
    return (
      <div onClick={() => recordAnswer(answer.category)} key={answer.text}>
        <h3>{answer.text}</h3>
        <img src={APP_URL + answer.image} />
      </div>
    );
  };

  return (
    <section>
      <h1>{question.question}</h1>
      <div>{question.answers.map((answer) => createAnswer(answer))}</div>
    </section>
  );
};

export default Survey;
