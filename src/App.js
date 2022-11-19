import React from 'react'
import './App.css'

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ['/', 'x', '-', '+', '='];

class App extends React.Component  {

  state = {
    lastPressed: undefined,
    prevNumber: undefined,
    currentNumber: '0'
  }

  handleClick = (e) => {
    const { lastPressed, prevNumber, currentNumber } = this.state;
    const { innerText } = e.target;

    if (!Number.isNaN(Number(innerText))) {
      if (currentNumber === '0') {
        this.setState ({
          currentNumber: innerText
        });
      } else {
        this.setState ({
          currentNumber: currentNumber + innerText
        });
      }
    }

    switch (innerText){
      case 'AC': {
        this.setState({
          currentNumber: '0',
          prevNumber: undefined
        });
        break;
      }

      case '.': {
        if(!currentNumber.includes('.')) {
          this.setState({
            currentNumber: currentNumber + '.'
          });
          break;
        }
      }
    }

    this.setState({
      lastPressed: innerText
    });
  }

  render () {
    const { currentNumber } = this.state;
  return (
    <div className='calculator'>
      <div className='display'>
        { currentNumber }
      </div>
      <div className='numbers-container'>
        <button className='button AC' onClick={this.handleClick}>AC</button>
        {numbers.map(number => (
          <button key={number} className={`button number ${number === 0 && 'wide'}`} onClick={this.handleClick}>{number}</button>
        ))}
        <button className='button number' onClick={this.handleClick}>.</button>
      </div>
      <div className='operations-container'>
        {operations.map(operation => (
          <button key={operation} className='button math-operation' onClick={this.handleClick}>{operation}</button>
        ))}
      </div>
    </div>
  )
}
}

export default App
