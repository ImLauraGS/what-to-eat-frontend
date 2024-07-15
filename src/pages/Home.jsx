import React from 'react'
import MainHero from '../components/MainHero'
import InstructionsHero from '../components/InstructionsHero'
import { useUser } from '../context/userContext';
import HeroAdd from '../components/HeroAdd';


export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <MainHero/>
      {!user && (
      <InstructionsHero/>
      )}
      <HeroAdd/>
    </div>
  )
}
