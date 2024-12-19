import { useState } from 'react';
import './App.css';
import ChatInput from './components/ChatInput';
import ChatResponse from './components/ChatResponse';
import { fetchChatResponse } from './services/api';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      setError('Failed to fetch response. Please try again later.' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="bg-primary text-white text-center py-4">
        <h1>Gemini ChatBot</h1>
      </header>

      <div className="container my-4">
        <ChatInput onSubmit={handleQuestionSubmit} />

        {loading && <h1>Loading...</h1>}
        {error && <div className="alert alert-danger">{error}</div>}
        {response && <ChatResponse response={response} />}
      </div>
    </div>
  );
}

export default App;
