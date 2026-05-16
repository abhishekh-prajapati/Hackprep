import ExploreClient from "./ExploreClient";

export const metadata = {
  title: "Explore | HackPrep Resources",
  description: "Discover real projects from actual hackathons worldwide, powered by AI.",
};

export default function ExplorePage() {
  return (
    <main>
      <ExploreClient />
    </main>
  );
}
