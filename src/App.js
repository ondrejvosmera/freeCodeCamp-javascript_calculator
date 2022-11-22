import React from 'react'
import './App.css'

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ['/', '*', '-', '+', '='];

class App extends React.Component  {

  state = {
    calcStore: undefined,
    currentNumber: '0',
    operation: undefined,
    lastPressed: undefined
  }

  handleClick = (e) => {
    const { calcStore, operation, currentNumber } = this.state;
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
      return;
    }

    switch (innerText){
      case 'AC': {
        this.setState({
          currentNumber: '0',
          calcStore: undefined,
          operation: undefined
        });
        break;
      }

      case '.': {
        if(!currentNumber.includes('.')) {
          this.setState({
            currentNumber: currentNumber + '.'
          });
        }
        break;
      }

      default: {
        if(!operation) {
          this.setState({
            operation: innerText,
            calcStore: currentNumber,
            currentNumber: ''
          });
        } else if (innerText === '=') {
            const evaluated = eval(`${calcStore} ${operation} ${currentNumber}`);
            this.setState({
              operation: undefined,
              currentNumber: evaluated,
              calcStore: evaluated
            });
        } else {
          this.setState({
            operation: innerText
          });
        }
      }
    }
  }

  render () {
    const { currentNumber, calcStore, operation } = this.state;
  return (
    <div className='calculator'>
      <div className='calcStore'>
        { calcStore } { operation }
      </div>
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
