import { useState, useEffect } from 'react';
import '../src/index.css';
import NumberFormat from 'react-number-format';







function App() {

  // Setting States
  const [prevState, setPrevState] = useState("")
  const [curState, setCurState] = useState("")
  const [input, setInput] = useState("0")
  const [operator, setOperator] = useState(null)
  const [total, setTotal] = useState(false)

  // Setting up Events
  const inputNum = e => {
    // Checking Conditions

    // This conditon accepts "." only one time. It doesn't allow 2 dots ".." in it.
    if (curState.includes(".") && e.target.innerText === ".") {
      return
    }

    // If total then previous state is clear
    if (total) {
      setPrevState("")
    }

    //  This condition will take double decimal numbers like "77"
    if (curState) {
      setCurState(pre => pre + e.target.innerText)
    } else {
      setCurState(e.target.innerText)
    }
    setTotal(false)

  }

  useEffect(() => {
    setInput(curState)
  }, [curState])

  useEffect(() => {
    setInput("0")
  }, [])



  const operatorType = e => {
    setTotal(false)
    setOperator(e.target.innerText)
    if (curState === "") {
      return
    }
    if (prevState !== "") {
      equals()
    } else {
      setPrevState(curState)
      setCurState("")
    }
  }
  const equals = e => {
    if (e?.target.innerText === "=") {
      setTotal(true)
    }

    let cal
    switch (operator) {
      case "/":
        cal = String(parseFloat(prevState) / parseFloat(curState))
        break;
      case "+":
        cal = String(parseFloat(prevState) + parseFloat(curState))
        break;
      case "x":
        cal = String(parseFloat(prevState) * parseFloat(curState))
        break;
      case "-":
        cal = String(parseFloat(prevState) - parseFloat(curState))
        break;

      default:
        break;
    }

    setInput("")
    setPrevState(cal)
    setCurState("")
  }


  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1))
    } else {
      setCurState("-" + curState)
    }
  }
  const percent = () => {
    if (prevState) {
      setCurState(String(parseFloat(curState) / 100 * prevState))
    } else {
      setCurState(String(parseFloat(curState) / 100))
    }
  }
  const reset = () => {

    setPrevState("")
    setCurState("")
    setInput("0")
  }


  return <div className='min-h-screen font-body bg-yellow-200 grid place-content-center'>
    <div className='container text-2xl bg-black w-80 p-4 rounded-2xl shadow-2xl'>
      <div className='wrapper grid h-full w-full grid-cols-4 gap-5'>
        <div className='screen col-span-full text-white text-right text-6xl p-2 overflow-hidden'>{input !== "" || input === "0" ? <NumberFormat value={input} displayType={'text'} thousandSeparator={true} /> : <NumberFormat value={prevState} displayType={'text'} thousandSeparator={true} />}</div>
        <div className='btn light-gray bg-gray-400 grid place-content-center rounded-full h-16 w-16 cursor-pointer hover:bg-gray-200' onClick={reset}>AC</div>
        <div className='btn light-gray bg-gray-400 grid place-content-center rounded-full h-16 w-16 cursor-pointer  hover:bg-gray-200' onClick={minusPlus}>+/-</div>
        <div className='btn light-gray bg-gray-400 grid place-content-center rounded-full h-16 w-16 cursor-pointer hover:bg-gray-200' onClick={percent}>%</div>
        <div className='btn orange bg-org hover:bg-org1  grid place-content-center rounded-full h-16 w-16 cursor-pointer  text-white' onClick={operatorType}>/</div>
        <div className='btn grid justify-center items-center hover:bg-num1 rounded-full h-16 w-16 cursor-pointer bg-num  text-white' onClick={inputNum}>7</div>
        <div className='btn grid place-content-center rounded-full h-16 w-16 hover:bg-num1 cursor-pointer bg-num  text-white' onClick={inputNum}>8</div>
        <div className='btn grid place-content-center rounded-full h-16 w-16 hover:bg-num1 cursor-pointer bg-num  text-white' onClick={inputNum}>9</div>

        <div className='btn orange bg-org hover:bg-org1  grid place-content-center rounded-full h-16 w-16 cursor-pointer  text-white' onClick={operatorType}>x</div>
        <div className='btn grid place-content-center rounded-full h-16 w-16 cursor-pointer hover:bg-num1 bg-num  text-white' onClick={inputNum}>4</div>
        <div className='btn grid place-content-center rounded-full h-16 w-16 cursor-pointer hover:bg-num1 bg-num  text-white' onClick={inputNum}>5</div>
        <div className='btn grid place-content-center rounded-full h-16 w-16 cursor-pointer hover:bg-num1 bg-num  text-white' onClick={inputNum}>6</div>
        <div className='btn orange bg-org hover:bg-org1  grid place-content-center rounded-full h-16 w-16 cursor-pointer  text-white' onClick={operatorType}>-</div>
        <div className='btn grid place-content-center rounded-full h-16 w-16 cursor-pointer hover:bg-num1 bg-num  text-white' onClick={inputNum}>1</div>
        <div className='btn grid place-content-center rounded-full h-16 w-16 cursor-pointer hover:bg-num1 bg-num  text-white' onClick={inputNum}>2</div>
        <div className='btn grid place-content-center rounded-full h-16 w-16 cursor-pointer hover:bg-num1 bg-num  text-white ' onClick={inputNum}>3</div>

        <div className='btn orange bg-org hover:bg-org1 grid place-content-center rounded-full h-16 w-16 cursor-pointer  text-white' onClick={operatorType}>+</div>
        <div className='btn grid col-span-2 place-content-center rounded-full h-16 w-36 hover:bg-num1 text-white cursor-pointer bg-num ' onClick={inputNum}>0</div>
        <div className='btn grid  place-content-center rounded-full h-16 w-16 cursor-pointer bg-num hover:bg-num1 text-white ' onClick={inputNum}>.</div>
        <div className='btn orange  bg-org hover:bg-org1 grid place-content-center rounded-full h-16 w-16  text-white cursor-pointer' onClick={equals}>=</div>
      </div>
    </div>
  </div>
}

export default App;
