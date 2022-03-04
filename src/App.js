import { JimpDemo } from "./components/JimpDemo/JimpDemo";
import "./styles.css";

export default function App() {
  return (
    <JimpDemo
      imageUrl={
        "https://cdn.pixabay.com/photo/2016/04/17/16/10/cat-1334970_960_720.jpg"
      }
      x={300}
      y={300}
      width={400}
      height={400}
    />
  );
}
