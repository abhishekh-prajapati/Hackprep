import "./resources.css";
import { SearchProvider } from "./context/SearchContext";

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SearchProvider>
      <div className="resources-scope p-8 max-w-7xl mx-auto">
        {children}
      </div>
    </SearchProvider>
  );
}
