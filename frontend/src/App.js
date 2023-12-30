import "./App.css";
import env from 'react-dotenv'

function App() {
console.log("JWT KEY "+env.JWT_SECRET);
console.log("BACKEND API URL "+env.BACKEND_API_URL);
  return (
    <div>
      <h1> Hello {env.JWT_SECRET}</h1>
    </div>
  );
}

export default App;
