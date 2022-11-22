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
    const { calcStore, currentNumber, lastPressed } = this.state;
    const { innerText } = e.target;

    switch (innerText){
      case 'AC': {
        this.setState({
          currentNumber: '0',
          calcStore: undefined,
        });
        break;
      }

      case '=': {
        const evaluated = eval(calcStore);
        this.setState({
          currentNumber: evaluated,
          calcStore: evaluated
        });
        break;
      }

      default: {
        let x = undefined;
        if(operations.includes(lastPressed)) {
          if (operations.includes(innerText) && innerText !== '-') {
            x = currentNumber.slice(0, -3) + ` ${innerText} `;
          } else {
            x = `${currentNumber} ${innerText} `;
          }
        } else {
          x = currentNumber === '0' ? innerText : (currentNumber + innerText);
        }

        this.setState ({
          calcStore: x,
          currentNumber: x,
          lastPressed: innerText
        });
    }
  }
}

  render () {
    const { currentNumber, calcStore } = this.state;
  return (
    <div className='calculator'>
      <div className='calcStore'>
        { calcStore }
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
