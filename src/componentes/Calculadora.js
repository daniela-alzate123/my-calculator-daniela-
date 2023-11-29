import './Calculadora.css'
import Boton from './Boton'
import { useState } from 'react'


const Calculadora = () => {


  const [data, setData] = useState({ operacion: "", resultado: "" })

  const escritura = (event) => {

    const valor = event.target.innerText
    const esOperacion = valor === '+' || valor === '-' || valor === '*' || valor === '/' || valor === '%' || valor === 'mod'

    if(data.operacion.length >= 10) return
    if(valor === '+/-' && data.operacion === '')return;
    if(valor === '%' && data.operacion.includes('%'))return;
    if(valor === 'mod' && data.operacion.includes('mod'))return;



    if(data.operacion.includes('Error')){
      setData({...data, operacion:valor})
    }else if(data.resultado!== ''&&data.operacion===''&& esOperacion ){
      setData({...data, operacion: `${data.resultado}` +valor})
    }


    else if(valor === '+/-' && data.operacion !== ''){

      if(data.operacion.slice(0,1)=== '-'){
        setData({...data, operacion: `${data.operacion.slice(1, data.operacion.length)}`})
      }else{
        setData({...data, operacion: `-${data.operacion}`})
      }

    }else{
        setData({...data, operacion: `${data.operacion}`+valor})
    }

    
    //Inner text es lo que contiene el valor del boton 
  }

  const eliminar = () =>{
    setData({...data, operacion: data.operacion.slice(0, data.operacion.length-1)})
  }

  const limpiar = ()=>{
    setData({operacion: '', resultado: ''})
  }

  const resultado = ()=>{

    try{
      let resultado = ''
      if(data.operacion.includes('%')) {
         const valores = data.operacion.split('%')
         resultado = eval(`${valores[1]}*(${valores[0]}/100)`)
      }else{
        resultado = eval(data.operacion)
      }


      setData({...data, resultado, operacion: ''})
    }catch(error){
      setData({...data, operacion: 'Error'})
    }

    try{
      let resultado = ''
      if(data.operacion.includes('mod')) {
         const valores = data.operacion.split('mod')
         resultado = eval(`${valores[0]}%(${valores[1]})`)
      }else{
        resultado = eval(data.operacion)
      }

      if (isNaN(resultado)) {
        setData({ ...data, resultado: 'Error', operacion: '' });
      } else {
        setData({ ...data, resultado: resultado === 0 ? '0' : resultado.toString(), operacion: '' });
      }


      setData({...data, resultado, operacion: ''})
    }catch(error){
      setData({...data, operacion: 'Error'})
    }
    //La funcion de eval evalua una expresion (esa expresion se concatena en el valor de operacion)
    
  }

  



  return (
    <main>
      <span className='resultado'>{data.resultado}</span>
      <span className='operacion'>{data.operacion}</span>
      <Boton texto='' clase='vacio' />
      <Boton texto='' clase='vacio' />
      <Boton texto='' clase='vacio'/>


      
      <Boton texto='⌫' clase='numero' handleClick={eliminar}/>
      <Boton texto='C' clase='rosado' handleClick={limpiar}/>
      <Boton texto='mod' clase='rosado' handleClick={escritura}/>
      
      
      <Boton texto='%' clase='rosado' handleClick={escritura}/>

      <Boton texto='/' clase='operacion' handleClick={escritura} />

      <Boton texto='7' clase='numero' handleClick={escritura} />
      <Boton texto='8' clase='numero' handleClick={escritura} />
      <Boton texto='9' clase='numero' handleClick={escritura} />

      <Boton texto='*' clase='operacion' handleClick={escritura} />

      <Boton texto='4' clase='numero' handleClick={escritura} />
      <Boton texto='5' clase='numero' handleClick={escritura} />
      <Boton texto='6' clase='numero' handleClick={escritura} />

      <Boton texto='-' clase='operacion' handleClick={escritura} />

      <Boton texto='1' clase='numero' handleClick={escritura} />
      <Boton texto='2' clase='numero' handleClick={escritura} />
      <Boton texto='3' clase='numero' handleClick={escritura} />

      <Boton texto='+' clase='operacion' handleClick={escritura} />

      
      <Boton texto='+/-' clase='rosado' handleClick={escritura}/>
      <Boton texto='0' clase='numero' handleClick={escritura} />
      <Boton texto='.' clase='numero' handleClick={escritura}/>
      

      <Boton texto='=' clase='operacion'handleClick={resultado} />
      

    </main>
  )
}

export default Calculadora
