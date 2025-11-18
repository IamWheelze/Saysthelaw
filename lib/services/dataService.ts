/**
 * Unified Data Service for Saysthelaw
 * Handles all data operations (articles, comments, subscribers, etc.)
 * Currently uses localStorage - ready for database integration
 */

import { Article, CaseReview } from '@/types';

// ============================================
// ARTICLES
// ============================================

export function getAllArticles(): Article[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('articles');
  return stored ? JSON.parse(stored) : [];
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

export function getFeaturedArticles(limit: number = 3): Article[] {
  return getAllArticles()
    .filter(article => article.featured)
    .slice(0, limit);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(article => article.category === category);
}

export function getRecentArticles(limit: number = 10): Article[] {
  return getAllArticles()
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);
}

export function saveArticle(article: Article): void {
  const articles = getAllArticles();
  const existingIndex = articles.findIndex(a => a.id === article.id);

  if (existingIndex >= 0) {
    articles[existingIndex] = article;
  } else {
    articles.push(article);
  }

  localStorage.setItem('articles', JSON.stringify(articles));
}

export function deleteArticle(id: string): void {
  const articles = getAllArticles().filter(a => a.id !== id);
  localStorage.setItem('articles', JSON.stringify(articles));
}

// ============================================
// COMMENTS
// ============================================

interface CommentData {
  id: string;
  author: string;
  email: string;
  content: string;
  timestamp: number;
  likes: number;
}

export function getComments(pageId: string): CommentData[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(`comments-${pageId}`);
  return stored ? JSON.parse(stored) : [];
}

export function saveComment(pageId: string, comment: CommentData): void {
  const comments = getComments(pageId);
  comments.unshift(comment);
  localStorage.setItem(`comments-${pageId}`, JSON.stringify(comments));
}

export function likeComment(pageId: string, commentId: string): void {
  const comments = getComments(pageId);
  const comment = comments.find(c => c.id === commentId);
  if (comment) {
    comment.likes += 1;
    localStorage.setItem(`comments-${pageId}`, JSON.stringify(comments));
  }
}

export function getTotalComments(): number {
  if (typeof window === 'undefined') return 0;
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('comments-')) {
      const comments = JSON.parse(localStorage.getItem(key) || '[]');
      total += comments.length;
    }
  }
  return total;
}

// ============================================
// EMAIL SUBSCRIBERS
// ============================================

interface Subscriber {
  email: string;
  source: string;
  timestamp: number;
}

export function getAllSubscribers(): Subscriber[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('email-subscribers');
  return stored ? JSON.parse(stored) : [];
}

export function addSubscriber(email: string, source: string): boolean {
  const subscribers = getAllSubscribers();

  // Check if already subscribed
  if (subscribers.some(sub => sub.email === email)) {
    return false;
  }

  subscribers.push({
    email,
    source,
    timestamp: Date.now(),
  });

  localStorage.setItem('email-subscribers', JSON.stringify(subscribers));
  return true;
}

export function removeSubscriber(email: string): void {
  const subscribers = getAllSubscribers().filter(sub => sub.email !== email);
  localStorage.setItem('email-subscribers', JSON.stringify(subscribers));
}

// ============================================
// IMAGES
// ============================================

interface UploadedImage {
  id: string;
  name: string;
  url: string;
  timestamp: number;
}

export function getAllImages(): UploadedImage[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('uploaded-images');
  return stored ? JSON.parse(stored) : [];
}

export function saveImage(image: UploadedImage): void {
  const images = getAllImages();
  images.push(image);
  localStorage.setItem('uploaded-images', JSON.stringify(images));
}

export function deleteImage(id: string): void {
  const images = getAllImages().filter(img => img.id !== id);
  localStorage.setItem('uploaded-images', JSON.stringify(images));
}

// ============================================
// CASE REVIEWS
// ============================================

export function getAllCaseReviews(): CaseReview[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('case-reviews');
  return stored ? JSON.parse(stored) : [];
}

export function getCaseReviewBySlug(slug: string): CaseReview | null {
  const cases = getAllCaseReviews();
  return cases.find(c => c.slug === slug) || null;
}

export function getRecentCaseReviews(limit: number = 10): CaseReview[] {
  return getAllCaseReviews()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function saveCaseReview(caseReview: CaseReview): void {
  const cases = getAllCaseReviews();
  const existingIndex = cases.findIndex(c => c.id === caseReview.id);

  if (existingIndex >= 0) {
    cases[existingIndex] = caseReview;
  } else {
    cases.push(caseReview);
  }

  localStorage.setItem('case-reviews', JSON.stringify(cases));
}

// ============================================
// STATISTICS
// ============================================

export function getStats() {
  return {
    articles: getAllArticles().length,
    caseReviews: getAllCaseReviews().length,
    comments: getTotalComments(),
    subscribers: getAllSubscribers().length,
    images: getAllImages().length,
  };
}

// ============================================
// INITIALIZATION - SAMPLE DATA
// ============================================

export function initializeSampleData(): void {
  // Only initialize if no data exists
  if (getAllArticles().length === 0) {
    const sampleArticles: Article[] = [
      {
        id: '1',
        title: 'Understanding Your Right to Freedom of Expression in Kenya',
        slug: 'understanding-freedom-of-expression-kenya',
        description: 'What does freedom of expression really mean under Kenya\'s 2010 Constitution? A clear breakdown with real examples.',
        content: `# Understanding Your Right to Freedom of Expression in Kenya

## What the Constitution Says

Article 33 of Kenya's 2010 Constitution guarantees every person the right to freedom of expression. But what does this actually mean in practice?

## Key Points

**You have the right to:**
- Express your opinions freely
- Seek and receive information
- Practice creative arts
- Engage in academic freedom
- Freedom of the media

**BUT these rights are not absolute:**
- No propaganda for war
- No incitement to violence
- No hate speech
- No advocacy of hatred

## Real-World Examples

### Case 1: Blogger Arrested for Criticizing County Government
In 2018, a blogger was arrested for posting critical comments about his county government. The courts ruled this was a violation of his constitutional rights. **Lesson:** You can criticize government - it's protected speech.

### Case 2: Hate Speech Conviction
A politician was convicted for making inflammatory tribal remarks. The courts held this was hate speech, not protected expression. **Lesson:** Your right ends when it incites hatred or violence.

## What This Means For You

✅ **You CAN:**
- Criticize government policies
- Share your political views
- Report on matters of public interest
- Express unpopular opinions

❌ **You CANNOT:**
- Incite violence
- Spread hate speech
- Defame others maliciously
- Share false information intended to harm

## If Your Rights Are Violated

1. Document everything
2. Contact a human rights organization
3. File a complaint with the Kenya National Commission on Human Rights
4. Consider legal action

## Resources

- Constitution of Kenya 2010, Article 33
- Kenya National Commission on Human Rights: www.knchr.org
- Article 19 Eastern Africa: www.article19.org

Remember: Your freedom of expression is a fundamental right, but with it comes responsibility.`,
        author: 'Saysthelaw Team',
        publishedDate: '2024-11-10',
        category: 'Human Rights',
        tags: ['freedom of expression', 'Kenya', 'constitution', 'rights'],
        countries: ['KE'],
        featured: true,
        readTime: 5,
        seo: {
          title: 'Understanding Freedom of Expression in Kenya | Saysthelaw',
          description: 'What does freedom of expression really mean under Kenya\'s 2010 Constitution? A clear breakdown with real examples.',
          keywords: ['freedom of expression', 'Kenya', 'Article 33', 'constitution', 'rights'],
        },
      },
      {
        id: '2',
        title: 'What To Do If You\'re Arrested: Know Your Rights',
        slug: 'what-to-do-if-arrested-know-your-rights',
        description: 'A practical guide to your rights when arrested. What police can and cannot do, and how to protect yourself.',
        content: `# What To Do If You're Arrested: Know Your Rights

Being arrested is scary. But knowing your rights can make a huge difference.

## Your Rights When Arrested

### 1. Right to Remain Silent
**You do NOT have to answer questions.** Politely say: "I wish to remain silent until I speak with a lawyer."

### 2. Right to a Lawyer
You have the right to contact a lawyer immediately. Police must allow this.

### 3. Right to Know Why You're Arrested
Police must tell you:
- Why you're being arrested
- What offense you're accused of
- Your rights

### 4. Right to Dignity
Police cannot:
- Torture or mistreat you
- Use excessive force
- Strip search you publicly
- Deny you food, water, or medical care

## What to Do Step-by-Step

**Step 1: Stay Calm**
- Don't resist arrest (even if you believe it's unjust)
- Don't run
- Keep your hands visible

**Step 2: Invoke Your Rights**
- Say: "I invoke my right to remain silent"
- Ask: "Am I free to go?" (if not formally arrested)
- Request: "I want to speak to a lawyer"

**Step 3: Remember Details**
- Officer's name and badge number
- Time and location
- Witnesses present
- Reason given for arrest

**Step 4: Contact Help**
- Call a lawyer (or ask police to contact one)
- Inform family member
- Contact human rights organization if needed

## Common Mistakes to Avoid

❌ **Don't:**
- Answer questions without a lawyer
- Sign anything you don't understand
- Resist physically
- Lie or make up stories
- Try to bribe officers

✅ **Do:**
- Be polite but firm about your rights
- Ask for everything in writing
- Insist on medical care if injured
- Document everything later

## Time Limits

Police can hold you:
- **24 hours** maximum without charging you
- Must present you to court within 24 hours if charging you
- Weekend/holiday arrests: Court appearance next working day

## If Rights Are Violated

1. **Immediate:** Tell the officer you're documenting violations
2. **At Station:** Request to speak to senior officer
3. **In Court:** Inform magistrate of any violations
4. **After Release:** File complaint with IPOA (Independent Policing Oversight Authority)

## Emergency Contacts (Kenya)

- **IPOA:** 0719 054 000 / 0719 054 001
- **Police Hotline:** 999, 112
- **Legal Aid:** Kenya National Commission on Human Rights 0800 720 627

## Real Case Example

**Case:** A student was arrested for "being in a suspicious place." He remained silent, asked for a lawyer, and documented everything. The case was dismissed in court as police had no evidence. His silence protected him.

**Lesson:** Your right to silence is powerful. Use it.

## Remember

Your rights exist even when arrested. Know them. Use them. They're your best protection.`,
        author: 'Saysthelaw Team',
        publishedDate: '2024-11-12',
        category: 'Police & Security',
        tags: ['arrest', 'police', 'rights', 'legal advice'],
        countries: ['KE', 'NG', 'GH', 'ZA'],
        featured: true,
        readTime: 6,
        seo: {
          title: 'What To Do If You\'re Arrested: Know Your Rights | Saysthelaw',
          description: 'A practical guide to your rights when arrested. What police can and cannot do.',
          keywords: ['arrest rights', 'police', 'legal rights', 'Kenya', 'Africa'],
        },
      },
    ];

    localStorage.setItem('articles', JSON.stringify(sampleArticles));
  }

  // Initialize sample case reviews
  if (getAllCaseReviews().length === 0) {
    const sampleCases: CaseReview[] = [
      {
        id: 'case-1',
        title: 'Blogger Arrested for Government Criticism - Kenya 2018',
        slug: 'blogger-arrested-government-criticism-kenya-2018',
        country: 'KE',
        date: '2018-06-15',
        summary: 'A blogger was arrested after posting critical comments about county government officials. Court ruled arrest violated constitutional rights to free expression.',
        whatHappened: 'Robert Alai, a prominent blogger, posted critical comments on social media about alleged corruption in Kiambu County government. Within 24 hours, he was arrested and charged with "undermining authority of public officer." He was held for 3 days before being released on bail.',
        lawsApplied: [
          'Article 33 - Freedom of Expression (Constitution of Kenya 2010)',
          'Section 132 - Computer Misuse and Cybercrimes Act',
          'Article 29 - Freedom and Security of Person',
        ],
        violations: [
          'Arbitrary arrest without sufficient cause',
          'Violation of freedom of expression',
          'Excessive detention period',
        ],
        consequences: 'The case was eventually dismissed by the High Court, which ruled that the arrest was unconstitutional and violated the blogger\'s rights to free expression. The government was ordered to pay damages. This set an important precedent protecting online criticism of government.',
        comparison: 'Similar cases in South Africa and Nigeria have also resulted in courts protecting online speech. However, in some countries like Egypt and Tanzania, bloggers face much harsher consequences including long prison sentences.',
        sources: [
          {
            name: 'Kenya High Court Ruling',
            type: 'government',
            date: '2018-09-20',
          },
          {
            name: 'Article 19 Eastern Africa',
            url: 'https://www.article19.org',
            type: 'ngo',
          },
        ],
        category: 'Human Rights',
        seo: {
          title: 'Blogger Arrested for Criticizing Government - Kenya Case Review',
          description: 'How Kenyan courts protected freedom of expression when a blogger was arrested for government criticism.',
          keywords: ['freedom of expression', 'Kenya', 'blogger', 'case review', 'constitutional rights'],
        },
      },
    ];

    localStorage.setItem('case-reviews', JSON.stringify(sampleCases));
  }
}
