
import Link from "next/link";
export default function Home() {
  return (
    <div>
    <h1 className="mainHeading">MY TODO APP</h1>
    <Link href={"/todo"}><li>My Todo App</li></Link>
    </div>
  );
}
