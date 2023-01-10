
import reactLogo from '../assets/react.svg'

export default function Navbar(){
return (<nav>
<div className='navbar-content'>
    <img src={reactLogo} alt="react-logo" className='temp-logo rotate' />
    <h1>QuizzApp</h1>
</div>
</nav>)
}