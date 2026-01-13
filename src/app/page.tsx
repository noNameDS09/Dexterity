import Hero from '../components/Hero';
import About from '../components/About';
import Events from '../components/Events';
// import EventFlow from '../components/EventFlow';
// import CTA from '../components/CTA';
// import Footer from '../components/Footer';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
export default function Home() {
  return (
    <main className="min-h-screen bg-stone-900">
      <Hero />
      <About />
      <Events />
    </main>
  );
}
