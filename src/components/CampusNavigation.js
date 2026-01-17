import { useState } from 'react';
import { Search, Navigation, Loader2, MapPin } from 'lucide-react';

export default function CampusNavigation() {
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const buildings = [
    "Tabaret Hall (TBT)",
    "Morisset Library (MRT)",
    "SITE Building (STE)",
    "Social Sciences Building (FSS)",
    "Desmarais Hall (DMS)",
    "Fauteux Hall (FTX)",
    "Pérez Hall (PRZ)",
    "Montpetit Hall (MNT)",
    "Lamoureux Hall (LMX)",
    "University Centre (UCU)",
    "Minto Sports Complex (MNO)",
    "STEM Complex (STM)"
  ];

  const getDirections = async () => {
    if (!startLocation || !destination) {
      setError('Please enter both starting point and destination');
      return;
    }

    setLoading(true);
    setError('');
    setDirections(null);

    try {
      const apiKey = process.env.GOOGLE_API_KEY;
      const response = await fetch( `/api/directions?start=${encodeURIComponent(startLocation)}&end=${encodeURIComponent(destination)}`,
        {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: `You are a campus navigation assistant for the University of Ottawa. Provide clear, step-by-step walking directions from ${startLocation} to ${destination} on the uOttawa campus in Ottawa, Canada. 

              Include tunnels, passageways, or indoor routes wherever needed. Descriptively indicate which floors to go to reach these tunnels or passageways.

              Format your response as a numbered list with detailed walking instructions. Include:
              - Approximate walking time
              - Specific landmarks to look for
              - Turn-by-turn directions
              - Building entrance information if relevant
              - Floor information to access tunnels/passages
              Keep directions concise but helpful. If you don't know the exact route, provide the best general guidance based on typical campus layouts.`
          }
        ]
      }
    ]
  }),
});


        

      const data = await response.json();
      console.log('Google API raw response:', JSON.stringify(data, null, 2));
      res.status(200).json(data);

      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setDirections(data.candidates[0].content.parts[0].text);
      } else {
        setError('Could not get directions. Please try again.');
      }
    } catch (err) {
      setError('Error connecting to navigation service: ' + err.message);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getDirections();
    }
  };

  const clearDirections = () => {
    setDirections(null);
    setStartLocation('');
    setDestination('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="space-y-6">
            {/* Starting Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                Starting Location
              </label>
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Tabaret Hall, MRT, or '90 University'"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                list="buildings-start"
              />
              <datalist id="buildings-start">
                {buildings.map((building, idx) => (
                  <option key={idx} value={building} />
                ))}
              </datalist>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., SITE Building, Morisset Library, or 'FSS'"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                list="buildings-dest"
              />
              <datalist id="buildings-dest">
                {buildings.map((building, idx) => (
                  <option key={idx} value={building} />
                ))}
              </datalist>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Get Directions Button */}
            <button
              onClick={getDirections}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Getting Directions...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Get Directions
                </>
              )}
            </button>
          </div>
        </div>

        {/* Directions Display */}
        {directions && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Navigation className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Walking Directions</h2>
                  <p className="text-sm text-gray-600">
                    From <span className="font-semibold">{startLocation}</span> to <span className="font-semibold">{destination}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-500">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {directions}
                </div>
              </div>
            </div>

            {/* Clear/New Search Button */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={clearDirections}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                New Search
              </button>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Search className="w-5 h-5" />
            How to use
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Enter your starting location (building name or abbreviation)</li>
            <li>• Enter your destination on campus</li>
            <li>• Click "Get Directions" or press Enter</li>
            <li>• Follow the step-by-step walking directions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}