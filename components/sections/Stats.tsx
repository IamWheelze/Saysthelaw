const stats = [
  {
    value: '54',
    label: 'African Countries',
    description: 'Comprehensive coverage',
  },
  {
    value: '200+',
    label: 'Laws Explained',
    description: 'From constitutions to statutes',
  },
  {
    value: '100+',
    label: 'Case Reviews',
    description: 'Real-world applications',
  },
  {
    value: '15+',
    label: 'Legal Topics',
    description: 'Organized by theme',
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">By the Numbers</h2>
          <p className="text-xl text-primary-100">
            Building the most comprehensive legal education platform for Africa
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl font-semibold mb-1">{stat.label}</div>
              <div className="text-primary-100 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
