import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [scenario, setScenario] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await axios.post('http://localhost:5000/predict', {
        scenario: scenario,
      });
      setResponse(result.data);
    } catch (err) {
      setError('An error occurred while fetching the data.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setScenario('');
    setResponse(null);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://imgs.search.brave.com/jjgo7B56Sskd5Kh_vb-BXl105LISq53-sLdjNPXvZjA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/My8xMi8yMC8xMC9y/aWdodC00OTI2MTU2/XzY0MC5qcGc")', // Replace with your background image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Main Container */}
      <div className="relative z-10 p-6 bg-white bg-opacity-80 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Legal Suggestion App</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter your legal scenario..."
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          ></textarea>

          {/* Button Section - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-sm"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Suggestion'}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="w-full p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none text-sm"
            >
              Clear Response
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Response */}
        {response && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Best Match:</h3>
            <p><strong>Section:</strong> {response.section}</p>
            <p><strong>Description:</strong> {response.description}</p>
            <p><strong>Similarity:</strong> {response.similarity.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
