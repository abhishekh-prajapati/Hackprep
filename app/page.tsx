import ExploreClient from "./explore/ExploreClient";

export const metadata = {
  title: "HackPrep | Real-time Hackathon Ideas",
  description: "Explore real-world hackathon projects powered by Gemini AI.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <ExploreClient />
    </main>
  );
}