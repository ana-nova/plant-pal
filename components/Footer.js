import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <Link href={"/"}>Homepage</Link>
      <Link href={"/myPlants"}>My Plants</Link>
    </div>
  );
}
