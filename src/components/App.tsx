import {useState} from "react";
import classes from './App.module.scss'
import {Link, Outlet} from "react-router-dom";
import pngImg from '@/assets/strictProsCons.png'
import jpgImg from '@/assets/msie.jpg'
import SvgComponent from '@/assets/free-delivery-free-svgrepo-com.svg'

function TODO(a: number){
  console.log('TODOFunction')
}

export const App = () => {
  const [count, setCount] = useState(0)
  const handlePlus = () => {
    setCount(prev => prev + 1)
  }

  TODO('111')

  if(__PLATFORM__ === 'desktop') {
    return <div>ISDESKTOPPLATFORM</div>
  }
  if(__PLATFORM__ === 'mobile') {
    return <div>ISMOBILEPLATFORM</div>
  }

  if(__ENV__ === 'development') {
    // addDevTools() // Например вызовем какую-то доп функцию для dev мода
  }

  return (
    <div>
      <h1>PLATFORM = {__PLATFORM__}</h1>
      <div>
        <img src={pngImg} width={100} alt=""/>
        {pngImg}
      </div>
      <div>
        <img src={jpgImg} width={100} alt=""/>
        {jpgImg}
      </div>
      <div>
        {/*<SvgComponent width={200} height={200} strokeWidth={10} stroke="red" fill={'blue'} backgroundColor={'green'} style={{color: 'blue'}}/>*/}
        <SvgComponent width={200} height={200} strokeWidth={10} style={{backgroundColor: 'blue', stroke: 'green'}} />
      </div>
      <Link to={'/'}>Home</Link>
      <br/>
      <Link to={'/about'}>About</Link>
      <br/>
      <Link to={'/shop'}>Shop</Link>
      <br/>
      <div>{count}</div>
      <button className={classes.btn} onClick={handlePlus}>+</button>
      <Outlet />
    </div>
  );
};