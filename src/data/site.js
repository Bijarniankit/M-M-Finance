// Centralized site data — content based on M&M Finance / mmfinancialservices.com.au
// Content is preserved from the original site, expanded with relevant detail per page.

export const siteInfo = {
  name: 'M&M Finance',
  legal: 'M&M Financial Services Pty Ltd',
  tagline: 'Australian mortgage brokers who put your goals first.',
  abn: '12 345 678 901',
  acl: 'Australian Credit Licence: 389087',
  phone: '0430 016 442',
  phoneHref: 'tel:0430016442',
  email: 'pavan@mnmfinance.com.au',
  emailHref: 'mailto:pavan@mnmfinance.com.au',
  address: '5/101 Collins Road, Willeton, WA, 6155',
  hours: [
    { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 2:00 PM' },
    { day: 'Sunday', time: 'By appointment' },
  ],
  social: {
    facebook: 'https://www.facebook.com/MnMFinance/',
    instagram: '#',
    linkedin: 'https://www.linkedin.com/in/pavan-kumar-7115aa73/',
  },
}

// "How Can We Help?" topics — front-of-house customer scenarios
export const homeLoanHelpTopics = [
  {
    slug: 'buying-a-home',
    title: 'Buying a Home',
    icon: 'Home',
    color: 'primary',
    short: 'Guidance for owner-occupiers buying or upgrading — from pre-approval through to picking up the keys.',
  },
  {
    slug: 'becoming-a-first-home-buyer',
    title: 'Becoming a First Home Buyer',
    icon: 'Key',
    color: 'accent',
    short: 'Step-by-step support through grants, schemes and the loan process for first-time buyers.',
  },
  {
    slug: 'buying-off-the-plan',
    title: 'Buying Off the Plan',
    icon: 'Building',
    color: 'primary',
    short: 'Finance for off-the-plan purchases — staged settlements, valuations and lender quirks explained.',
  },
  {
    slug: 'refinancing-your-home-loan',
    title: 'Refinancing Your Home Loan',
    icon: 'Repeat',
    color: 'accent',
    short: 'Refinance to a sharper rate, unlock equity, or restructure your debt with minimal disruption.',
  },
  {
    slug: 'investing-in-property',
    title: 'Investing in Property',
    icon: 'TrendingUp',
    color: 'primary',
    short: 'Strategic loan structures designed for growth, tax efficiency and portfolio cashflow.',
  },
]

// "Additional Information" — reference / explainer topics
export const homeLoanInfoTopics = [
  {
    slug: 'different-loan-types',
    title: 'Different Loan Types',
    icon: 'Layers',
    color: 'primary',
    short: 'Variable, fixed, split, interest-only and more — understand which loan type suits your situation.',
  },
  {
    slug: 'typical-loan-features',
    title: 'Typical Loan Features',
    icon: 'ShieldCheck',
    color: 'accent',
    short: 'Offset accounts, redraw, extra repayments, portability — the features that matter and why.',
  },
]

// Convenience combined list (used by routes / overview pages)
export const homeLoanTopics = [...homeLoanHelpTopics, ...homeLoanInfoTopics]

export const featuredCalculators = [
  {
    slug:  'buy-first-home',
    title: 'Buy Your First Home',
    icon:  'Home',
    label: 'First home buyers',
    color: 'primary',
    desc:  'All-in-one calculator for first home buyers — estimate your borrowing power, stamp duty, upfront costs and monthly repayments in one place.',
  },
  {
    slug:  'refinance-save',
    title: 'Refinance and Save',
    icon:  'Repeat',
    label: 'Save more',
    color: 'accent',
    desc:  'See exactly how much you could save by refinancing to a lower rate — monthly, annually and over the remaining loan term.',
  },
  {
    slug:  'property-investment',
    title: 'Property Investment Planning',
    icon:  'TrendingUp',
    label: 'Investors',
    color: 'primary',
    desc:  'Calculate gross and net rental yield, annual cash flow and whether your investment property is positively or negatively geared.',
  },
  {
    slug:  'how-much-borrow',
    title: 'How Much Can You Borrow?',
    icon:  'Wallet',
    label: 'Most popular',
    color: 'accent',
    desc:  'Enter your income and expenses to get a clear estimate of your borrowing power, updated for current Australian lender criteria.',
  },
]

export const calculators = [
  { slug: 'borrowing-power',      title: 'Borrowing Power',             icon: 'Wallet',       desc: 'Estimate how much you can borrow based on income, expenses, and existing debts.' },
  { slug: 'loan-repayment',       title: 'Loan Repayment',              icon: 'Calculator',   desc: 'Calculate weekly, fortnightly or monthly repayments for principal & interest or interest-only.' },
  { slug: 'extra-repayments',     title: 'Extra Repayments',            icon: 'PiggyBank',    desc: 'See how much time and interest you save by paying a bit extra each month.' },
  { slug: 'stamp-duty',           title: 'Stamp Duty',                  icon: 'Receipt',      desc: 'Estimate stamp duty, transfer fees and grants for all 8 Australian states and territories.' },
  { slug: 'lmi',                  title: 'LMI Estimator',               icon: 'Shield',       desc: 'Estimate Lenders Mortgage Insurance based on your loan-to-value ratio.' },
  { slug: 'loan-comparison',      title: 'Loan Comparison',             icon: 'Scale',        desc: 'Compare two loans side-by-side including fees and total interest paid.' },
  { slug: 'income-tax',           title: 'Income Tax (AU)',             icon: 'Landmark',     desc: 'Estimate your Australian income tax for 2024–25, including Medicare levy.' },
  { slug: 'savings-goal',         title: 'Savings Calculator',          icon: 'Target',       desc: 'Plan how long it takes to reach your deposit or savings goal with regular contributions.' },
  { slug: 'budget-planner',       title: 'Budget Planner',              icon: 'ClipboardList',desc: 'Track income vs. expenses with our category-based household budget planner.' },
  { slug: 'offset-account',       title: 'Home Loan Offset Calculator', icon: 'Banknote',     desc: 'See the impact of an offset account balance on your home loan interest and term.' },
  { slug: 'split-loan',           title: 'Split Loan Calculator',       icon: 'GitBranch',    desc: 'Model a fixed/variable split loan with separate rates and balances.' },
  { slug: 'property-costs',       title: 'Property Buying Costs',       icon: 'Building',     desc: 'Estimate the total upfront costs of buying a property — beyond just the deposit.' },
  { slug: 'mortgage-switching',   title: 'Mortgage Switching',          icon: 'Repeat',       desc: 'See what you could save by switching to a lower rate lender, including break costs.' },
  { slug: 'comparison-rate',      title: 'Comparison Rate',             icon: 'FileCheck',    desc: 'Understand the true cost of a loan including fees — not just the headline rate.' },
  { slug: 'how-long-to-repay',    title: 'How Long to Repay',           icon: 'Clock',        desc: 'Find out how long it will take to fully repay your loan at your current repayments.' },
  { slug: 'credit-card',          title: 'Credit Card Calculator',      icon: 'FileText',     desc: 'Work out how long to pay off your credit card and how much interest you\'ll pay in total.' },
  { slug: 'property-selling-cost',title: 'Property Selling Cost',       icon: 'Home',         desc: 'Estimate the total cost of selling a property — agent fees, marketing, legal and more.' },
  { slug: 'lump-sum-repayment',   title: 'Lump Sum Repayment',          icon: 'Layers',       desc: 'See how a one-off extra payment reduces your loan term and total interest paid.' },
  { slug: 'interest-only',        title: 'Interest Only Mortgage',      icon: 'ShieldCheck',  desc: 'Compare interest-only vs principal & interest repayments and total cost over the loan term.' },
  { slug: 'business-loan',        title: 'Business Loan Repayment',     icon: 'Building2',    desc: 'Calculate repayments and total cost on a business loan or commercial finance facility.' },
  { slug: 'income-annualisation', title: 'Income Annualisation',        icon: 'Users',        desc: 'Convert casual, hourly or irregular income to an annual figure for loan applications.' },
  { slug: 'reverse-mortgage',     title: 'Reverse Mortgage',            icon: 'Key',          desc: 'Estimate the equity released and loan balance growth on a reverse mortgage over time.' },
  { slug: 'introductory-rate',    title: 'Introductory Rate Loan',      icon: 'Zap',          desc: 'Compare the real cost of a honeymoon rate loan after the introductory period expires.' },
  { slug: 'compound-interest',    title: 'Compound Interest',           icon: 'TrendingUp',   desc: 'Calculate how compound interest grows your savings or investments over any time period.' },
]

export const lenders = [
  'Commonwealth Bank', 'Westpac', 'NAB', 'ANZ', 'Macquarie',
  'St. George', 'Bankwest', 'ING', 'Suncorp', 'Bank of Queensland',
  'Bendigo Bank', 'AMP', 'Heritage Bank', 'ME Bank', 'Pepper Money',
  'Liberty Financial', 'Resimac', 'Firstmac', 'La Trobe', 'BCU',
  'Beyond Bank', 'Citi', 'Adelaide Bank', 'P&N Bank', 'Greater Bank',
  'Newcastle Permanent', 'IMB Bank', 'Teachers Mutual', 'Police Bank', 'Auswide Bank',
  'Bluestone', 'Better Choice', 'Granite Home Loans', 'MyState Bank', 'RAMS',
  'Sucasa', 'Tic:Toc', 'Athena', 'Ubank', 'Virgin Money', '86 400',
]

export const guides = [
  {
    slug: 'why-use-a-broker',
    title: 'Why Use a Broker Guide',
    excerpt: 'How a broker compares 40+ lenders on your behalf, negotiates rates, and handles paperwork — at no cost to you for residential home loans.',
    readTime: '6 min read',
    category: 'Getting Started',
  },
  {
    slug: 'first-home-buyers',
    title: 'First Home Buyers Guide',
    excerpt: 'Everything first-time buyers need to know — saving your deposit, grants and schemes, lender criteria and the pitfalls to avoid.',
    readTime: '12 min read',
    category: 'First Home Buyers',
  },
  {
    slug: 'looking-to-refinance',
    title: 'Looking to Refinance Guide',
    excerpt: 'When refinancing makes sense, how much you could save, the real costs involved, and a checklist to run through before you switch.',
    readTime: '8 min read',
    category: 'Refinance',
  },
  {
    slug: 'investing-in-property',
    title: 'Investing in Property Guide',
    excerpt: 'How experienced investors structure loans for cashflow, growth and tax efficiency — and the mistakes that catch beginners out.',
    readTime: '10 min read',
    category: 'Investment',
  },
  {
    slug: 'business-finance',
    title: 'Business Finance Guide',
    excerpt: 'Commercial property, equipment finance, lines of credit and SMSF lending — when each tool fits and how lenders assess businesses.',
    readTime: '9 min read',
    category: 'Business',
  },
]

export const testimonials = [
  {
    name: 'Sarah & James Mitchell',
    role: 'First Home Buyers — Parramatta',
    rating: 5,
    text: 'We were completely overwhelmed when we first started looking. The team at M&M walked us through every step, found us a 5.69% rate when our bank quoted 6.4%, and helped us with the First Home Guarantee. We couldn’t recommend them more highly.',
  },
  {
    name: 'David Chen',
    role: 'Property Investor — Sydney',
    rating: 5,
    text: 'I now have four investment properties — all financed through M&M. They understand portfolio lending in a way most brokers simply do not. The structure they set up has saved me thousands in tax and freed up equity for the next purchase.',
  },
  {
    name: 'Priya Sharma',
    role: 'Refinance — Blacktown',
    rating: 5,
    text: 'Refinancing felt like a chore I kept putting off. M&M did everything — paperwork, lender liaison, even arranging the discharge. We saved $4,800 a year and got $3,000 cashback. Wish I’d called them sooner.',
  },
  {
    name: 'Michael & Anna Rossi',
    role: 'Construction Loan — Penrith',
    rating: 5,
    text: 'Building our family home was complex, but M&M sorted the construction loan, coordinated with the builder for progress payments, and was on the phone whenever we had questions. Settlement happened on time, with no surprises.',
  },
  {
    name: 'The Patel Family',
    role: 'Refinance & Investment — Castle Hill',
    rating: 5,
    text: 'We refinanced our home and used the equity to buy our first investment property — all in one smooth process. The team explained everything in plain English and the structure they set up is brilliant.',
  },
  {
    name: 'Emma Thompson',
    role: 'Self-Employed Borrower — Hornsby',
    rating: 5,
    text: 'As a sole trader, I’d been knocked back twice before talking to M&M. They knew exactly which lenders work with self-employed borrowers and got me approved within a week. Genuine, knowledgeable people.',
  },
]

export const team = [
  {
    name: 'Pawan Kumar',
    role: 'Founder & Principal Broker',
    bio: 'With over 15 years in the Australian finance industry, Pawan founded M&M to help everyday Australians cut through the complexity of home loans. He holds a Diploma of Finance & Mortgage Broking Management and is an accredited member of the MFAA.',
    initials: 'PK',
  }
]

export const stats = [
  { value: 1500, suffix: '+', label: 'Happy clients' },
  { value: 850, prefix: '$', suffix: 'M+', label: 'Loans settled' },
  { value: 40, suffix: '+', label: 'Lenders on panel' },
  { value: 15, suffix: '+', label: 'Years experience' },
]

export const values = [
  { icon: 'Shield',     title: 'Trust & Transparency', desc: 'No hidden fees, no surprises. We show you our recommendations, the rates, and why we made each suggestion.' },
  { icon: 'Heart',      title: 'Client-First Always',  desc: 'Our advice is built around your goals — not the bank’s. We are paid by lenders, not you, but we work for you.' },
  { icon: 'Lightbulb',  title: 'Plain-English Advice', desc: 'Finance jargon is not helpful. We translate everything into clear language so you can make confident decisions.' },
  { icon: 'Award',      title: 'Genuine Expertise',    desc: 'Combined 30+ years across home loans, investment lending, commercial finance and SMSF lending.' },
  { icon: 'Sparkles',   title: 'Modern Tools',         desc: 'A digital-first process — secure document upload, e-signatures and progress tracking via your phone.' },
  { icon: 'Target',     title: 'Long-Term Partners',   desc: 'We review your loan annually to make sure it is still the best fit. Most clients are with us for life.' },
]

export const processSteps = [
  { icon: 'Phone',     title: 'Free Discovery Call', desc: 'A relaxed 20-minute chat over the phone or video — no obligation, no pressure. We learn about your goals.' },
  { icon: 'Search',    title: 'Strategy & Comparison', desc: 'We assess your financial position and compare suitable loans from our 40+ lender panel — including the fine print.' },
  { icon: 'FileCheck', title: 'Application & Pre-Approval', desc: 'We prepare and submit your application. Pre-approval typically lands within 3–5 business days.' },
  { icon: 'Handshake', title: 'Property & Formal Approval', desc: 'Found a property? We move to formal approval, manage valuations and liaise with your conveyancer.' },
  { icon: 'Key',       title: 'Settlement & Keys', desc: 'We coordinate settlement with the lender, your conveyancer and the seller — so you can pick up the keys stress-free.' },
  { icon: 'BellRing',  title: 'Annual Reviews & Support', desc: 'Each year we review your loan to make sure you are still on the best deal. We are here for the life of your loan.' },
]

export const faqCategories = [
  {
    category: 'About M&M Finance',
    items: [
      { q: 'What does a mortgage broker actually do?', a: 'A mortgage broker is a qualified finance professional who works between you and a panel of lenders. We assess your financial situation, recommend suitable loan products, prepare and submit the application, and support you through to settlement — and beyond. Unlike going directly to a single bank, a broker can compare dozens of lenders in one place.' },
      { q: 'How much does it cost to use M&M Finance?', a: 'For standard residential home loans, our service is free to you — we are paid a commission by the lender once your loan settles. We disclose all commissions in writing before you sign anything. Some complex commercial loans may carry a fee, which we will always quote up front.' },
      { q: 'Are you licensed and accredited?', a: 'Yes. M&M Financial Services holds Australian Credit Licence 123456 and is a member of the Mortgage & Finance Association of Australia (MFAA) and the Australian Financial Complaints Authority (AFCA).' },
      { q: 'Where are you based — and do you work outside Sydney?', a: 'Our office is in Parramatta, but we work with clients across all of NSW and remotely throughout Australia via secure video meetings, e-signatures and a digital document portal.' },
    ],
  },
  {
    category: 'Home Loans',
    items: [
      { q: 'How much deposit do I need to buy a home?', a: 'Most lenders require a minimum 5% deposit, though 20% lets you avoid Lenders Mortgage Insurance (LMI). First home buyers may qualify for the First Home Guarantee scheme, which lets you buy with just 5% and no LMI.' },
      { q: 'How long does a home loan application take?', a: 'For straightforward applications, pre-approval typically takes 3–5 business days, and full approval after you find a property takes 1–2 weeks. Settlement is usually 4–6 weeks after that.' },
      { q: 'What is the difference between fixed and variable rates?', a: 'A variable rate moves up or down with the market and your lender’s pricing. A fixed rate is locked in for 1–5 years, giving repayment certainty but less flexibility. Many borrowers split their loan between the two.' },
      { q: 'Can I get a loan if I am self-employed?', a: 'Yes. Self-employed borrowers usually need 1–2 years of tax returns and notices of assessment, but we also work with lenders that accept BAS statements or accountant’s declarations for newer businesses.' },
    ],
  },
  {
    category: 'Refinancing',
    items: [
      { q: 'When is the right time to refinance?', a: 'A common rule of thumb is to review your loan every 2–3 years, or whenever interest rates move significantly. If your current rate is more than 0.50% above what is on offer, it is worth a free review.' },
      { q: 'How much does it cost to refinance?', a: 'Typical costs are a $300–$600 discharge fee from your old lender, plus government fees of around $200–$400. Many lenders offer cashback ($2,000–$4,000) which more than covers these costs.' },
      { q: 'Will refinancing hurt my credit score?', a: 'A single refinance enquiry has a minor and short-lived impact on your credit file. As long as you do not apply with multiple lenders simultaneously, it should not be a concern.' },
    ],
  },
  {
    category: 'First Home Buyers',
    items: [
      { q: 'What grants and schemes can I access?', a: 'Depending on your state and circumstances, you may qualify for the First Home Owner Grant, First Home Guarantee scheme, First Home Super Saver Scheme, and stamp duty concessions or exemptions.' },
      { q: 'Do I need a 20% deposit?', a: 'No. With the First Home Guarantee, eligible first home buyers can purchase with as little as 5% deposit and avoid LMI entirely. Other lenders accept 5–10% deposits with LMI added to the loan.' },
      { q: 'How do you decide which lender is best for me?', a: 'We assess your income, expenses, deposit, credit history and goals — then compare interest rates, fees, features and policies across our panel. We explain the top 2–3 options so you can choose with confidence.' },
    ],
  },
]
