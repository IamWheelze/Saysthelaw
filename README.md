# Saysthelaw

> **The law in real life — explained clearly, simply, and with evidence.**

Saysthelaw is a comprehensive web platform that makes African and global laws accessible to everyone through clear explanations, real-world case studies, and data-driven insights.

## Mission

Understanding your rights shouldn't require a law degree. Saysthelaw breaks down complex legal systems into plain language, backed by real cases and evidence.

## Features

### 🌍 Country Profiles
- Detailed legal system overviews for African countries
- Constitutional summaries
- Key laws and citizen rights
- Real-world problems and reforms
- Statistics and comparisons

### ⚖️ Case Reviews
- Analysis of real legal events
- Explanation of applicable laws
- Identification of violations
- Consequences and outcomes
- Cross-country comparisons

### 📊 Data & Statistics
- Evidence-based legal insights
- Interactive charts and visualizations
- Country comparisons
- Trend analysis

### 📚 Law Made Simple
- Complex legal concepts in plain language
- No jargon explanations
- Topic-based learning
- Real-world applications

### 🎯 Topic Categories
- Human Rights
- Police & Security
- Courts & Justice
- Labour & Employment
- Elections & Democracy
- Women & Children
- Environment
- Business & Commerce
- And more...

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)
- **Type Safety**: Strict TypeScript configuration

## Project Structure

```
Saysthelaw/
├── app/                    # Next.js app router pages
│   ├── countries/         # Country profiles
│   ├── topics/            # Topic pages
│   ├── cases/             # Case reviews
│   ├── data/              # Data & statistics
│   ├── explainers/        # Law Made Simple articles
│   ├── about/             # About page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Navigation, Footer
│   ├── sections/         # Hero, Features, Stats, CTA
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and helpers
│   ├── seo/             # SEO metadata utilities
│   └── utils/           # Helper functions
├── types/               # TypeScript type definitions
├── data/                # Static data and schemas
│   ├── countries/      # Country data
│   ├── laws/           # Laws database
│   └── topics/         # Topics data
└── public/             # Static assets
    ├── images/
    └── icons/
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/saysthelaw.git
cd Saysthelaw
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Development Guidelines

### Component Structure

- Use functional components with TypeScript
- Follow the established component patterns
- Keep components small and focused
- Use Tailwind CSS for styling

### Type Safety

- All data must have TypeScript interfaces defined in `types/index.ts`
- Use strict type checking
- Avoid `any` types

### SEO

- Every page must have proper metadata
- Use the `generateMetadata` helper from `lib/seo/metadata.ts`
- Include keywords, descriptions, and Open Graph tags

### Content Guidelines

1. **Clarity**: Write in simple, accessible language
2. **Evidence**: Back claims with sources
3. **Neutrality**: Present facts objectively
4. **Accuracy**: Verify all legal information

## Content Schema

### Country Profile
```typescript
interface CountryProfile {
  id: string;
  name: string;
  code: string;
  region: string;
  summary: string;
  systemOverview: string;
  keyLaws: Law[];
  recentCases: CaseReview[];
  statistics: DataPoint[];
  // ... see types/index.ts for full schema
}
```

### Law
```typescript
interface Law {
  id: string;
  title: string;
  country: string;
  category: LawCategory;
  yearEnacted: number;
  summary: string;
  keyProvisions: string[];
  realWorldImpact: string;
  // ... see types/index.ts
}
```

### Case Review
```typescript
interface CaseReview {
  id: string;
  title: string;
  country: string;
  whatHappened: string;
  lawsApplied: string[];
  violations?: string[];
  consequences: string;
  sources: Source[];
  // ... see types/index.ts
}
```

## Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Content Contributions

- Follow the content guidelines above
- Verify all facts with reliable sources
- Include proper citations
- Use the established data schemas

## Roadmap

### Phase 1: Foundation (Current)
- ✅ Next.js setup and architecture
- ✅ Core components and pages
- ✅ Type definitions and schemas
- ✅ SEO configuration
- 🔄 Initial country profiles
- 🔄 Sample case reviews

### Phase 2: Content Expansion
- 📋 All 54 African countries
- 📋 200+ law explanations
- 📋 100+ case reviews
- 📋 Data visualizations
- 📋 Interactive comparisons

### Phase 3: Features
- 📋 Search functionality
- 📋 User accounts
- 📋 Bookmarking
- 📋 Newsletter subscription
- 📋 Mobile app

### Phase 4: Scale
- 📋 Global law coverage
- 📋 Multiple languages
- 📋 API for developers
- 📋 Educational partnerships

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

**Important**: Saysthelaw provides educational content only. Nothing on this platform constitutes legal advice. Always consult a qualified lawyer for specific legal matters.

## Contact

- Website: https://saysthelaw.com
- Twitter: [@saysthelaw](https://twitter.com/saysthelaw)
- Email: hello@saysthelaw.com

## Acknowledgments

This platform is built to serve the public interest and promote legal literacy across Africa and beyond.

---

Built with ❤️ for legal education and transparency.
