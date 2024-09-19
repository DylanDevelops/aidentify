import "./App.css";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const homepage = useQuery(api.homepage.get);
  return (
    <div className="App">
      <h1>AIdentify</h1>
      {homepage?.map(({ _id, message }) => <div key={_id}>{message}</div>)}
      
    </div>
  );
}

export default App;