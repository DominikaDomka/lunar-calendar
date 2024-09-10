import type { NextPage } from 'next';
import LunarPhaseWidget from '../components/LunarPhaseWidget';

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <LunarPhaseWidget />
    </div>
  );
}

export default Home;