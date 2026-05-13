import { useState } from "react";
import AddSubscriptionForm from "./AddSubscriptionForm";

const imgNetflix =
  "https://www.figma.com/api/mcp/asset/0542328d-b94e-4254-84c3-8ef517cbefae";
const imgDisney =
  "https://www.figma.com/api/mcp/asset/ab43c38c-127f-431a-bc40-9d56b39dd35e";
const imgSpotify =
  "https://www.figma.com/api/mcp/asset/151b1d4a-42d1-450f-b122-ee7fc2ff95dc";
const imgHboMax =
  "https://www.figma.com/api/mcp/asset/4d1599d2-ddc9-4012-bccb-006db3df33f8";
const imgYouTube =
  "https://www.figma.com/api/mcp/asset/e3cbb420-11a8-4421-8ffe-d0d89f45e7ec";
const imgAmazonPrime =
  "https://www.figma.com/api/mcp/asset/1f3078a6-3d18-403e-b0ac-eb8c3fcd4897";

const services = [
  { id: 1, name: "Netflix", icon: imgNetflix, category: "Video" },
  { id: 2, name: "Disney+", icon: imgDisney, category: "Video" },
  { id: 3, name: "Spotify", icon: imgSpotify, category: "Music" },
  { id: 4, name: "HBO Max", icon: imgHboMax, category: "Video" },
  { id: 5, name: "YouTube", icon: imgYouTube, category: "Video" },
  { id: 6, name: "Prime Video", icon: imgAmazonPrime, category: "Video" },
];

const categories = ["All", "Video", "Music", "Software", "Gaming"];

const PickServicesModal = ({ onSubmit, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [showConfigForm, setShowConfigForm] = useState(false);

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (service) => {
    setSelectedService(service);
    setShowConfigForm(true);
  };

  const handleConfigSubmit = (subscriptionData) => {
    if (onSubmit) onSubmit(subscriptionData);
  };

  const handleBackToServiceSelect = () => {
    setShowConfigForm(false);
    setSelectedService(null);
  };

  // Show the configuration form if a service is selected
  if (showConfigForm && selectedService) {
    return (
      <AddSubscriptionForm
        service={selectedService}
        onSubmit={handleConfigSubmit}
        onCancel={handleBackToServiceSelect}
      />
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60 p-6 z-50">
      <div className="backdrop-blur-md bg-[rgba(30,41,59,0.7)] border border-white/10 rounded-lg shadow-2xl w-full max-w-2xl max-h-217.5 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-white/5 px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-text">Select Service</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5 text-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search services, apps, or providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-cinema pl-12"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Category Tabs */}
          <div className="flex gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-white/5 text-text-muted hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Popular Services Section */}
          <div>
            <h3 className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-6">
              Popular Services
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div key={service.id} className="flex flex-col items-center">
                  {/* Service Icon Container */}
                  <div className="w-20 h-20 mb-4 rounded-lg bg-surface border border-white/10 flex items-center justify-center">
                    <img
                      src={service.icon}
                      alt={service.name}
                      className="w-12 h-12"
                    />
                  </div>
                  {/* Service Name */}
                  <p className="text-text text-sm font-medium text-center mb-3">
                    {service.name}
                  </p>
                  {/* Add Button */}
                  <button
                    onClick={() => handleAdd(service)}
                    className="px-4 py-2 rounded-lg border border-blue-500/30 text-primary-soft hover:bg-blue-500/10 transition-colors text-sm font-medium"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Showing counter */}
          <p className="text-text-muted text-xs mt-8">
            Showing top {filteredServices.length} services
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 px-6 py-6 flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-text-muted hover:text-text transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (onSubmit && selectedService) {
                onSubmit(selectedService);
              }
            }}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PickServicesModal;
