import Image from "next/image";
import Landing from "./components/Landing";
import Schedule from "./components/Schedule";

export default function Home() {
  return (
    <div>
      <Landing />
      <Schedule />
    </div>
  );
}
