import "./index.css"
import './App.css'
import { useCallback, useEffect, useRef, useState } from "react"
function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqstuvwxyz"

    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*_~`"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const PasswordCopy = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 20)

    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '500px' }}>
      <div className="d-flex p-3 rounded flex-column justify-content-center align-items-center" style={{ backgroundColor: '#3a3a3a' }}>
        <h1 style={{ color: "white" }} className='text-white text-center mt-3'>Password Generator</h1>
        <div className="input-group m-2">
          <input type="text"
            value={password}
            className="form-control fw-bold"
            placeholder="password"
            ref={passwordRef}
            readOnly
            style={{ color: '#714b06' }}
          />
          <button className="btn btn-primary" onClick={PasswordCopy}>Copy</button>
        </div>
        <div className="mt-3 text-white d-flex flex-column">
          <div className="d-flex">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              id="range"
              onChange={(e) => { setlength(e.target.value) }}
              className="me-2"
            />
            <label htmlFor="range">Length: {length}</label>
          </div>
          <div>
            <input
              type="Checkbox"
              id="numberAllowed"
              defaultChecked={numberAllowed}
              onChange={() => { setNumberAllowed(prev => !prev) }}
              className="me-2"
            />

            <label htmlFor="numberAllowed">Include Numbers</label>
          </div>
          <div>
            <input
              type="Checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="me-2"
            />
            <label htmlFor="charAllowed">Include Chars</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
