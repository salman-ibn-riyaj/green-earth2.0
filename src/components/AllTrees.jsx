import ChooseYourTrees from "@/components/ChooseYourTrees";

export default async function AllTrees() {
  const res = await fetch("http://localhost:5000/trees", {
    cache: "no-store",
  });
  const trees = await res.json();
  console.log(trees)

  return <ChooseYourTrees trees={trees} />;
}