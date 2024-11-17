import { useEffect, useState } from 'react';
import {randomIntFromInterval} from '../tools'
import './Answer.css';

const Answers = ({onChangeAnswer, currentQwestion, allVariants, answer, checked}) => {
    const [countryes, setCountryes] = useState([])
    const [authors, setAuthors] = useState([])
    const [names, setNames] = useState([])

    const changeVariant = (variantName) => {
        const indexOfRightvariant = randomIntFromInterval(0, 3)
        const selectedTypeAllVariants = [...allVariants[variantName]].filter(item => item !== currentQwestion[variantName])
        const variants = []
        for(let i = 0; i < 4; i++) {
            if (i === indexOfRightvariant) {
                variants.push(currentQwestion[variantName])
            } else {
                console.log(selectedTypeAllVariants)
                const variant = selectedTypeAllVariants.splice(randomIntFromInterval(0, selectedTypeAllVariants.length-1), 1)
                variants.push(variant[0])
            }
        }
        return variants
    }

    const changeStyle = (field ,value) => {
        let className = 'vaiant'
        const isSelected = value === answer[field]
        const isRight = value === currentQwestion[field]
        if (checked) {
            if (isSelected) {
                className += ' error'
            }
            if (isRight) {
                className += ' good'
            }
        } else {
            if (isSelected) {
                className += ' selected'
            }
        }
        return className
    }
    
    useEffect(()=>{
        setCountryes(changeVariant('country'))
        setAuthors(changeVariant('author'))
        setNames(changeVariant('name'))
    }, [currentQwestion])


  return ( 
  <div>
    <div>
        <div>Страна</div>
        <div className='answers-row'>
            {countryes.map(countrie => 
                <div key={countrie} className={changeStyle('country', countrie)} onClick={()=>onChangeAnswer('country', countrie)}>{countrie}</div>
            )}
        </div>
    </div>
    <div>
        <div>Автор</div>
        <div className='answers-row'>
            {authors.map(author => <div key={author} className={changeStyle('author', author)} onClick={()=>onChangeAnswer('author', author)}>
                {author}
            </div>)}
        </div>
    </div>
    <div>
        <div>Название</div>
        <div>
            {names.map(name => <div key={name} className={changeStyle('name', name)} onClick={()=>onChangeAnswer('name', name)}>{name}</div>)}
        </div>
    </div>
  </div>
  )
}

export default Answers;
