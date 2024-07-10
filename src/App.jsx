import './App.css'
import Footer from './components/Footer';
import Header from './components/Header'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div>
      <Header />
      <main className='min-h-[60dvh]'>
        <Outlet />
      </main>
      <Footer/>
    </div>

  )
}

export default App
