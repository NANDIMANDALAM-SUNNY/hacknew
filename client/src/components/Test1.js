import React from 'react'
import { useContext } from 'react'
import storeContext from './Context/storeContext'


const Test1 = () => {
    const {token} = useContext(storeContext)
console.log(token)

  return (
   <>
    <p>{token}</p>
    <p>cdcsd</p>
    <h1>cdcsdcsd</h1>
   </>
  )
}

export default Test1