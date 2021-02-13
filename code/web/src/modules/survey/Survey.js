// Imports
import React, { useEffect, useState } from 'react';
import { APP_URL } from '../../setup/config/env';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// App Imports
import { surveyQuestions } from './surveyQuestions';
import userRoutes from '../../setup/routes/user';
import { postUserStyle } from './api/actions';
import { login } from '../user/api/actions';

const Survey = (props) => {
  const [question, setQuestion] = useState(surveyQuestions[0]);
  const [userStyle, setUserStyle] = useState(null);
  const [styleAnswers, setStyleAnswers] = useState({
    Grunge: [],
    Sporty: [],
    Classic: [],
    Casual: [],
    Bohemian: [],
  });

  const recordAnswer = (cat) => {
    setStyleAnswers(styleAnswers, styleAnswers[cat].push(question.id));
    let i = surveyQuestions.indexOf(question);

    if (i === surveyQuestions.length - 1) {
      calculateStyle();
      return;
    }

    setQuestion(surveyQuestions[i + 1]);
  };

  const calculateStyle = () => {
    let tally = Object.entries(styleAnswers);
    let sortedStyles = tally.sort((a, b) => {
      return b[1].length > a[1].length ? 1 : -1;
    });

    let style1 = sortedStyles[0][1].length;
    let style2 = sortedStyles[1][1].length;

    if (style1 === 1) {
      setUserStyle('Eclectic');
    } else if (style1 === style2) {
      setUserStyle(`${sortedStyles[0][0]} but ${sortedStyles[1][0]}`);
    } else if (style1 > style2) {
      setUserStyle(`${sortedStyles[0][0]}`);
    }
  };

  const createAnswer = (answer, height, width) => {
    return (
      <div
        onClick={() => recordAnswer(answer.category)}
        key={answer.text}
        style={{ padding: '1em' }}
      >
        <h3 style={{ display: 'flex', justifyContent: 'center', padding: '1em' }}>{answer.text}</h3>
        <img
          src={APP_URL + answer.image}
          style={{ width: width, height: height }}
        />
      </div>
    );
  };

  useEffect(() => {
    if (userStyle) {
      postUserStyle(props.user.details.email, userStyle)
        .then(() => {
          props.user.details.style = userStyle
          login(props.user.details)
        })
        .then(
          window.setTimeout(() => {
            props.history.push(userRoutes.subscriptions.path);
          }, 3000)
        )
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userStyle]);

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!userStyle && (
        <section>
          <h1 style={{ display: 'flex', justifyContent: 'center', padding: '1em', fontSize: '3em' }}>{question.question}</h1>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {question.answers.map((answer) => createAnswer(answer, question.height, question.width))}
          </div>
        </section>
      )}
      {userStyle && (
        <section>
          <h1 style={{ display: 'flex', justifyContent: 'center', padding: '1em', fontSize: '2em' }}>Congrats! Your style is {userStyle}!</h1>
        </section>
      )}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(withRouter(Survey));
