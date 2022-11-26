import React from 'react'
import './App.css'

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ['/', '*', '-', '+'];

function toFixedIfNecessary( value, dp ){
  return +parseFloat(value).toFixed( dp );
}

class App extends React.Component  {

  state = {
    calcStore: '0',
    operation: undefined,
    lastPressed: undefined
  }

  handleClick = (e) => {
    const { calcStore, lastPressed } = this.state;
    const { innerText } = e.target;

    switch (innerText){
      case 'AC': {
        this.setState({
          calcStore: '0',
        });
        break;
      }

      case '=': {
        const evaluated = eval(calcStore);
        this.setState({
          calcStore: toFixedIfNecessary( evaluated, 5 )
        });
        break;
      }

      case '.': {
        const splitted = calcStore.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];

        if(!last.includes('.')) {
          this.setState ({
            calcStore: calcStore + '.'
          });
        }
        break;
      }

      default: {
        let x = undefined;
        if(operations.includes(innerText)) {
          if (operations.includes(lastPressed) && innerText !== '-') {
            x = calcStore.slice(0, -3) + ` ${innerText} `;
          } else {
            x = ` ${calcStore} ${innerText} `;
          }
        } else {
          x = (calcStore === '0') ? innerText : (calcStore + innerText);
        }

        this.setState ({
          calcStore: x
        });
    }
  }
  this.setState ({
    lastPressed: innerText
  })
}

  render () {
    const { calcStore } = this.state;
  return (
    <div className='calculator'>x
      <div className='display'>
        { calcStore }
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
        <button className='button math-operation' onClick={this.handleClick}>=</button>
      </div>
    </div>
  )
}
}

export default App
