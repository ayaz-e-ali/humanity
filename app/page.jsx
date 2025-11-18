import Link from "next/link";


export default function Home() {
  return (
    <div>
      <section id="Origin" className="h-screen flex items-center justify-center flex-col gap-2">
        <h1 className="text-6xl font-serif">From Spirit to Human</h1>
        <p className="text-lg font-bold font-sans">Before form, there was only spirit.</p>
        <p className="text-lg font-bold font-sans">A silent spark drifting in the dark.</p> </section>

      <section id="Descent" className="h-screen flex items-center justify-center flex-col gap-2">
        <h3 className="text-6xl font-serif">The Descent</h3>
        <p className="text-lg font-bold font-sans">With the first breath, light met flesh.</p>
        <p className="text-lg font-bold font-sans">The spirit learned weight, time, and direction.</p> </section>

      <section id="Becoming" className="h-screen flex items-center justify-center flex-col gap-2">
        <h3 className="text-6xl font-serif">Becoming Human</h3>
        <p className="text-lg font-bold font-sans">Moments turned into stories.</p>
        <p className="text-lg font-bold font-sans">Steps shaped identity.</p>
        <p className="text-lg font-bold font-sans">And the spirit slowly became human.</p> </section>

      <ul className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 border mr-8 rounded py-2 px-4">
        <Link href={"#Origin"}>Origin</Link>
        <Link href={"#Descent"}>Descent</Link>
        <Link href={"#Becoming"}>Becoming</Link>
      </ul>
    </div>
  );
}