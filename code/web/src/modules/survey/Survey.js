// Imports
import React, { useEffect, useState } from 'react';
import { APP_URL } from '../../setup/config/env';
import { connect } from 'react-redux';

// App Imports
import { surveyQuestions } from './surveyQuestions';
import userRoutes from '../../setup/routes/user';
import { postUserStyle } from './api/actions';

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
      setUserStyle('Ecletic');
    } else if (style1 === style2) {
      setUserStyle(`${sortedStyles[0][0]} but ${sortedStyles[1][0]}`);
    } else if (style1 > style2) {
      setUserStyle(`${sortedStyles[0][0]}`);
    }
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

  useEffect(() => {
    if (userStyle) {
      postUserStyle(props.user.details.email, userStyle)
        .then(
          window.setTimeout(() => {
            props.history.push(userRoutes.subscriptions.path);
          }, 3000)
        )
        .then((response) => console.log(response))
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
          <h1 style={{ padding: '4em' }}>{question.question}</h1>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {question.answers.map((answer) => createAnswer(answer))}
          </div>
        </section>
      )}
      {userStyle && (
        <section>
          <h1>Congrats! Your style is {userStyle}!</h1>
        </section>
      )}
    </section>
  );
};

const mapStateToProps = function (state) {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Survey);
