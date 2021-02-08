// Imports
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI Imports

// App Imports
import { surveyQuestions } from './surveyQuestions';

// State will store current question
// as well as obj with response tallies

const Survey = () => {
  const [question, setQuestion] = useState(surveyQuestions[0]);
  const [styleAnswers, setStyleAnswers] = useState({
    grunge: 0,
    sporty: 0,
    classic: 0,
    casual: 0,
    bohemian: 0,
  });

  const advanceQuestion = () => {
    // TODO: Refactor
    let i = surveyQuestions.indexOf(question);
    if (i === surveyQuestions.length - 1) {
      console.log('Limit Reached');
      return;
    }
    setQuestion(surveyQuestions[i + 1]);
  };

  return (
    <section onClick={() => advanceQuestion()}>
      <h1>{question.question}</h1>
    </section>
  );
};

export default Survey;
