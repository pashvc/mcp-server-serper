export const GOOGLE_OPERATORS_GUIDE = `
# Google Advanced Search Operators Guide

## Essential Operators (Most Commonly Used)

### 1. Exact Match: " "
Search for an exact phrase or word sequence.
Examples:
- "machine learning algorithms"
- "how to learn python"
- "artificial intelligence applications"

### 2. Site Search: site:
Restrict results to a specific website or domain.
Examples:
- site:github.com react hooks
- site:stackoverflow.com python error handling
- site:linkedin.com/in/ "software engineer" San Francisco (find people)
- site:linkedin.com/company/ fintech startups (find companies)

### 3. Exclude Terms: -
Remove results containing specific words.
Examples:
- python tutorial -beginner
- javascript frameworks -react -angular
- machine learning -course -certification

### 4. OR Operator: OR or |
Search for either term (must be capitalized).
Examples:
- "data scientist" OR "machine learning engineer"
- python | javascript tutorial
- (React OR Vue) AND typescript

### 5. File Type: filetype: or ext:
Find specific types of files.
Examples:
- machine learning filetype:pdf
- financial report 2024 ext:xlsx
- presentation slides filetype:pptx

### 6. In Title: intitle: / allintitle:
Find pages with words in the title.
Examples:
- intitle:"best practices" python
- allintitle:react hooks tutorial
- intitle:review "iPhone 15"

### 7. In URL: inurl: / allinurl:
Find pages with words in the URL.
Examples:
- inurl:download software
- allinurl:tutorial python beginner
- inurl:api documentation

### 8. Date Ranges: before: / after:
Filter by publication date.
Examples:
- AI news after:2024-01-01
- cryptocurrency before:2023-12-31
- "climate change" after:2023-06-01 before:2024-01-01

## Advanced Combinations

### Finding People on LinkedIn:
- site:linkedin.com/in/ "John Smith" "software engineer" "San Francisco"
- site:linkedin.com/in/ "data scientist" (python OR "machine learning") -recruiter
- site:linkedin.com/in/ "product manager" fintech "New York"

### Finding Companies on LinkedIn:
- site:linkedin.com/company/ "artificial intelligence" startup
- site:linkedin.com/company/ saas "series A" OR "series B"
- site:linkedin.com/company/ healthcare technology

### Technical Documentation:
- site:docs.python.org OR site:pytorch.org "neural network"
- (site:github.com OR site:gitlab.com) "machine learning" README.md
- site:stackoverflow.com "TypeError" python pandas

### Research Papers:
- site:arxiv.org OR site:scholar.google.com "transformer architecture"
- filetype:pdf "deep learning" "computer vision" after:2023-01-01
- site:papers.nips.cc OR site:openreview.net "reinforcement learning"

### Job Searches:
- site:jobs.* OR site:careers.* "senior developer" remote
- site:greenhouse.io OR site:lever.co "product manager"
- site:linkedin.com/jobs/ "machine learning engineer" "San Francisco"

### E-commerce and Reviews:
- site:amazon.com OR site:ebay.com "wireless headphones" -sponsored
- intitle:review "Samsung Galaxy" 2024
- site:reddit.com "best laptop for programming" after:2023-01-01

## Pro Tips

### 1. Wildcard: *
Use asterisk for unknown words.
Examples:
- "how to * in Python"
- "best * for machine learning"
- Steve * Apple (finds Steve Jobs Apple)

### 2. Number Ranges: #..#
Search within numeric ranges.
Examples:
- laptop $500..$1000
- "python developer" $80000..$120000
- camera 12..20 megapixels

### 3. Related Sites: related:
Find similar websites.
Examples:
- related:github.com
- related:stackoverflow.com
- related:medium.com

### 4. Cache: cache:
View Google's cached version.
Examples:
- cache:example.com
- cache:github.com/popular-repo

### 5. Define: define:
Get definitions.
Examples:
- define:machine learning
- define:cryptocurrency
- define:quantum computing

## Common Search Patterns

### Finding Alternatives:
- (React OR Vue OR Angular) tutorial
- "project management" (software OR tool OR app)
- (Python OR R OR Julia) "data science"

### Excluding Common Results:
- python tutorial -youtube -udemy -coursera
- "free software" -trial -demo -freemium
- recipe chocolate cake -pinterest -video

### Specific Geographic Searches:
- "software developer" "New York" OR "NYC" site:linkedin.com/in/
- restaurant "near me" -chain -franchise
- "digital marketing agency" London UK

### Academic Searches:
- "peer reviewed" "machine learning" filetype:pdf
- site:edu "artificial intelligence" research
- "journal article" "climate change" after:2022-01-01

### News and Current Events:
- "breaking news" AI after:2024-01-01 -opinion
- site:reuters.com OR site:apnews.com "technology"
- "press release" "product launch" after:2024-01-01

## Error Prevention Tips

1. Always include required parameters (query, region, language)
2. Use proper date format: YYYY-MM-DD
3. Capitalize OR operator
4. Use quotes for exact phrases
5. Don't mix incompatible operators
6. Test complex queries incrementally

## Examples for Different Use Cases

### Software Development:
"error handling" site:stackoverflow.com python
"best practices" (react OR vue) 2024
github "machine learning" projects stars:>1000

### Business Research:
"market analysis" fintech filetype:pdf after:2023-01-01
site:linkedin.com/company/ "series B" "artificial intelligence"
"competitor analysis" saas -template -example

### Academic Research:
"systematic review" "machine learning" healthcare filetype:pdf
site:scholar.google.com "deep learning" citations:>100
"research paper" "climate change" peer-reviewed after:2023-01-01

### Job Hunting:
site:linkedin.com/jobs/ "remote" "software engineer" "full time"
site:indeed.com "data scientist" "entry level" -senior
"we are hiring" "python developer" site:twitter.com

### Learning Resources:
"free course" "machine learning" -youtube site:edu
"tutorial" "web development" beginner filetype:pdf
"documentation" react hooks site:reactjs.org
`;

export const SEARCH_QUERY_EXAMPLES = {
  linkedin_people: [
    'site:linkedin.com/in/ "John Smith" "software engineer" "San Francisco"',
    'site:linkedin.com/in/ "data scientist" (python OR R) "New York"',
    'site:linkedin.com/in/ "product manager" fintech -recruiter',
    'site:linkedin.com/in/ "machine learning engineer" "PhD" (Google OR Meta OR Apple)',
    'site:linkedin.com/in/ "blockchain developer" "remote"'
  ],
  linkedin_companies: [
    'site:linkedin.com/company/ "artificial intelligence" startup "series A"',
    'site:linkedin.com/company/ fintech "New York" -recruiting',
    'site:linkedin.com/company/ "machine learning" healthcare',
    'site:linkedin.com/company/ saas "customer success" platform',
    'site:linkedin.com/company/ "renewable energy" technology'
  ],
  technical_searches: [
    'site:stackoverflow.com "TypeError" pandas dataframe',
    'site:github.com "machine learning" README.md stars:>100',
    '(site:pytorch.org OR site:tensorflow.org) "neural network" tutorial',
    'site:medium.com "react hooks" "best practices" after:2023-01-01',
    'site:dev.to "typescript" "advanced patterns" -beginner'
  ],
  research_papers: [
    'site:arxiv.org "transformer architecture" "computer vision" after:2023-01-01',
    'filetype:pdf "deep learning" healthcare "peer reviewed"',
    'site:scholar.google.com "reinforcement learning" robotics',
    '(site:papers.nips.cc OR site:openreview.net) "graph neural networks"',
    'site:pubmed.ncbi.nlm.nih.gov "machine learning" diagnosis'
  ],
  job_searches: [
    'site:greenhouse.io "software engineer" "remote" "senior"',
    'site:lever.co "product manager" "series B" "San Francisco"',
    'site:jobs.* "data scientist" "machine learning" $120000..$180000',
    'site:linkedin.com/jobs/ "full stack developer" "startup" "equity"',
    'site:angellist.com/jobs "engineering manager" "fintech"'
  ],
  competitive_analysis: [
    'site:g2.com "vs" "competitor comparison" saas',
    'site:producthunt.com "alternative to" slack',
    'site:reddit.com "better than" notion -advertisement',
    'site:capterra.com "review" "project management" software',
    'related:competitor.com -site:competitor.com'
  ],
  content_research: [
    '"how to" "machine learning" -youtube -video beginner',
    'intitle:"ultimate guide" "digital marketing" 2024',
    '"case study" "successful implementation" ai retail',
    '"best practices" "software architecture" microservices filetype:pdf',
    '"step by step" tutorial "web scraping" python -course'
  ],
  news_monitoring: [
    '"press release" "product launch" AI after:2024-01-01',
    'site:techcrunch.com OR site:theverge.com "funding round"',
    '"breaking news" technology -opinion -analysis',
    'site:reuters.com "artificial intelligence" regulation',
    '"announcement" "partnership" fintech after:2024-01-01'
  ]
};

export const COMMON_SEARCH_PATTERNS = {
  find_email: [
    '"firstname lastname" email "@domain.com"',
    'site:twitter.com "firstname lastname" "email" "gmail.com"',
    '"firstname lastname" "contact" "reach out" email'
  ],
  find_documentation: [
    'site:docs.* "API reference" authentication',
    'site:github.com "README.md" "installation" "usage"',
    '"getting started" documentation tutorial'
  ],
  find_examples: [
    '"code example" "implementation" specific-technology',
    'site:github.com "sample" "demo" technology-name',
    'site:codepen.io OR site:jsfiddle.net "example"'
  ],
  exclude_noise: [
    'search-term -pinterest -youtube -advertisement',
    'product-name review -sponsored -affiliate',
    'tutorial -video -course -udemy -coursera'
  ],
  find_discussions: [
    'site:reddit.com "discussion" topic after:2023-01-01',
    'site:news.ycombinator.com "Show HN" topic',
    'site:stackoverflow.com "best way to" technology'
  ]
};