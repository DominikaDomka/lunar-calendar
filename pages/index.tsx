import type { NextPage } from 'next';
import LunarPhaseWidget from '../components/LunarPhaseWidget';

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <LunarPhaseWidget />
    </div>
  );
}

export default Home;