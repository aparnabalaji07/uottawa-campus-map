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
      const response = await fetch('/api/directions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startLocation,
          destination,
        }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setDirections(data.text);
      } else {
        setError(data.error || 'Could not get directions.');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to navigation service.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') getDirections();
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

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                Starting Location
              </label>
              <input
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                list="buildings-start"
              />
              <datalist id="buildings-start">
                {buildings.map((b, i) => (
                  <option key={i} value={b} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                Destination
              </label>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                list="buildings-dest"
              />
              <datalist id="buildings-dest">
                {buildings.map((b, i) => (
                  <option key={i} value={b} />
                ))}
              </datalist>
            </div>

            {error && (
              <div className="bg-red-50 p-4 border-l-4 border-red-500">
                {error}
              </div>
            )}

            <button
              onClick={getDirections}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-4 rounded-lg flex justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Getting Directions…
                </>
              ) : (
                <>
                  <Search />
                  Get Directions
                </>
              )}
            </button>
          </div>
        </div>

        {directions && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Navigation className="text-green-600" />
              <h2 className="text-xl font-bold">Walking Directions</h2>
            </div>

            <pre className="whitespace-pre-wrap text-gray-800">
              {directions}
            </pre>

            <button
              onClick={clearDirections}
              className="mt-4 bg-gray-200 px-4 py-2 rounded"
            >
              New Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
}