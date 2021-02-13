import { fireEvent, screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Survey from '../Survey.js'
jest.mock('./api/actions.js');

describe('Survey', () => {

  beforeEach(() => {
    render(<Survey />)
  })

  it('should render the survey', () => {
    screen.debug()
  })
})
