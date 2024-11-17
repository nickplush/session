import { useEffect, useState } from 'react';
import {randomIntFromInterval} from './tools'
import './App.css';
import Answers from './components/Answers';

function App() {
  const [variants, setVariants] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState()
  const [myAnswer, setMyAnswer] = useState({})
  const [checked, setChecked] = useState(false)
  
  const [author, setAuthor] = useState([])
  const [names, setNames] = useState([])
  const countryes = ['Англия','Голландия','Испания','Италия','Фландрия','Франция']

  const importInages = (countryName, images) => {
    const authors = new Set(author)
    const curNames = new Set(names)
    const imageList = images.keys().map(image => {
      const slicedImageName = image.split('..') 
      const author = slicedImageName[0]
      const name = slicedImageName[1]
      const src = images(image)
      const country = countryName
      authors.add(author.trim())
      curNames.add(name.trim())
      return {id:image,author, name, src, country}
    });
    setAuthor((arr)=> [...arr, ...Array.from(authors)])
    setNames((arr)=> [...arr, ...Array.from(curNames)])
    return imageList
  } 


  const checkYouHomeWork = () => {
    let a = true
    const fields = ['name', 'country', 'author']
      fields.forEach(field => {
       if (selectedAnswer[field] !== myAnswer[field]) {
        a = false
       }
      });
    return a
  }


  const startNewVariant = () => {
    const arr = [...variants]
    const indexElement = randomIntFromInterval(0, arr.length-1)
    const selected = arr.splice(indexElement, 1)

    if (myAnswer && selectedAnswer && !checkYouHomeWork()) {
      console.log('ch', checkYouHomeWork())
      arr.push(selected[0])
    }

    setSelectedAnswer(selected[0])
    setMyAnswer({...selected[0], name: '', country: '', author: ''})
    setVariants(arr)
    console.log(arr.length)
    setChecked(false)
  }

  const checkToNext = () => {
    return myAnswer.name && myAnswer.country && myAnswer.author
  }

  const onMyAnswerChange = (field, value) => {
    const newAnswer = {...myAnswer}
    newAnswer[field] = value
    setMyAnswer(newAnswer)
  } 

  const check = () => {
    setChecked(true)
  }

  useEffect(()=>{
    const a = require.context('./assets/Голландия', true);
    const b = require.context('./assets/Испания', true);
    const c = require.context('./assets/Италия', true);
    const d = require.context('./assets/Англия', true);
    const e = require.context('./assets/Франция', true);
    const f = require.context('./assets/Фландрия', true);
      const a1 = importInages('Голландия', a)
      const b1 = importInages('Испания', b)
      const c1 = importInages('Италия', c)
      const d1 = importInages('Англия', d)
      const e1 = importInages('Франция', e)
      const f1 = importInages('Фландрия', f)
      const imageList = [...a1,...b1,...c1,...d1,...e1,...f1]
      setVariants(imageList)
  },[]) 


  return ( 
  <div className='window-wrapper'>
    {selectedAnswer 
    ? <div className='test-conteiner'>
      <div className='img-conteiner'> 
        <img src={selectedAnswer.src} onClick={startNewVariant}></img>
      </div>
      <div>
        <Answers 
        onChangeAnswer={onMyAnswerChange} 
        currentQwestion={selectedAnswer} 
        allVariants={{name: names, country: countryes, author}}
        answer={myAnswer}
        checked={checked}
        />
        {checkToNext() && 
        <>
        {checked 
          ? <div className='button-start' onClick={startNewVariant}>Далее</div>
          : <div className='button-start' onClick={check}>Проверить</div>
        }
        </>
}
      </div>
      </div>
    : <div className='button-start' onClick={startNewVariant}>Start</div>}
    
  </div>
  )
}

export default App;
