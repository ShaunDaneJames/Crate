// Imports
import React from 'react';
import PropTypes from 'prop-types';

// UI Imports
import Card from '../../ui/card/Card';

// App Imports
import { surveyQuestions } from './surveyQuestions';

// State will store current question
// as well as obj with response tallies

const StyleSurvey = () => {
  const [question, setQuestion] = useState({});
  const [styleAnswers, setStyleAnswers] = useState({
    grunge: 0,
    sporty: 0,
    classic: 0,
    casual: 0,
    bohemian: 0,
  });
};
