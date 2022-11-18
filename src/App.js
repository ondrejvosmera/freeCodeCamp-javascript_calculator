import React from 'react'
import './App.css'

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ['/', '*', '-', '+', '='];

const App = () => {
  return (
    <div className='calculator'>
      <div className='display'>
        6969
      </div>
      <div className='numbers-container'>
        {numbers.map(number => (
          <button key={number} className={`button number ${number === 0 && 'wide'}`}>{number}</button>
        ))}
      </div>
      <div className='operations-container'>
        {operations.map(operation => (
          <button key={operation} className='button math-operation'>{operation}</button>
        ))}
      </div>
    </div>
  )
}

export default App
