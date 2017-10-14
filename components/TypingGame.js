import PropTypes from 'prop-types'
import React from 'react'
import styled from 'react-emotion'

const GameContainer = styled.div`
  max-width: 32em;
  margin: 1em auto;
  font-size: 24px;
`

const GameText = styled.div`
  line-height: 1.5;
  & .past {
    color: #888;
  }
  & .present {
    color: ${props => (props.ok ? '#4a3' : '#f00')};
    background: ${props => (props.ok ? 'transparent' : '#fcc')};
    text-decoration: underline;
  }
  & .future {
    color: #333;
  }
`

const GameInputArea = styled.div`
  margin-top: 1em;
  & label {
    color: #888;
    font-size: 18px;
  }
`

const GameInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  font-size: 1.5em;
  background: ${props => (props.ok ? 'white' : '#faa')};
  color: ${props => (props.ok ? '#333' : '#f00')};
`

export default class TypingGame extends React.Component {
  static propTypes = {
    text: PropTypes.string
  }
  state = { charactersCommitted: 0, inputText: '' }
  onChange = e => {
    const { text } = this.props
    const { charactersCommitted } = this.state
    const nextInputText = e.target.value
    if (
      nextInputText.endsWith(' ') &&
      text.substr(charactersCommitted, nextInputText.length) === nextInputText
    ) {
      this.setState({
        inputText: '',
        charactersCommitted: charactersCommitted + nextInputText.length
      })
    } else {
      this.setState({ inputText: nextInputText })
    }
  }
  render () {
    const { text } = this.props
    const { charactersCommitted, inputText } = this.state
    const ok = text.substr(charactersCommitted).startsWith(inputText)
    const past = text.substr(0, charactersCommitted)
    const present = (text.substr(charactersCommitted).match(/^\S+/) || [''])[0]
    const future = text.substr(charactersCommitted + present.length)
    return (
      <GameContainer>
        <GameText ok={ok}>
          <span className='past'>{past}</span>
          <span className='present'>{present}</span>
          <span className='future'>{future}</span>
        </GameText>
        <GameInputArea>
          <label htmlFor='text'>Type the text:</label>
          <GameInput
            ok={ok}
            id='text'
            autoFocus
            onChange={this.onChange}
            value={inputText}
          />
        </GameInputArea>
      </GameContainer>
    )
  }
}