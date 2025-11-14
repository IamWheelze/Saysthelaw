const features = [
  {
    title: 'Country Profiles',
    description:
      'Detailed overviews of legal systems across Africa and beyond, from constitutions to citizen rights.',
    icon: '🌍',
  },
  {
    title: 'Real Case Reviews',
    description:
      'Understand how laws work in practice through analysis of real-world events and court cases.',
    icon: '⚖️',
  },
  {
    title: 'Data & Statistics',
    description:
      'Evidence-based insights with charts, comparisons, and visualizations of legal trends.',
    icon: '📊',
  },
  {
    title: 'Law Made Simple',
    description:
      'Complex legal concepts explained in plain language that everyone can understand.',
    icon: '📚',
  },
  {
    title: 'Topic-Based Learning',
    description:
      'Explore by theme: Human Rights, Police, Courts, Labour, Elections, and more.',
    icon: '🎯',
  },
  {
    title: 'Regular Updates',
    description:
      'Stay informed with weekly commentary on legal developments and reforms.',
    icon: '🔄',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Saysthelaw?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive platform designed to make legal knowledge accessible
            to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
