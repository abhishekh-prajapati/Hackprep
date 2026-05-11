export interface ApiData {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
  tagline: string;
  link: string;
  steps: { title: string; content: string }[];
  snippet: string;
  important: string;
}

export interface TemplateData {
  id: string;
  title: string;
  description: string;
  type: 'react' | 'python';
  tech: string;
}

export const apiList: ApiData[] = [
  {
    id: 'gemini',
    name: 'Gemini AI',
    description: 'Multimodal LLM Integration',
    logo: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
    color: '#1a73e8',
    tagline: 'How to Get API Key',
    link: 'https://aistudio.google.com/',
    steps: [
      { title: 'Open Google AI Studio', content: 'Sign in with your Google account.' },
      { title: 'Create API Key', content: 'Click “Create API Key” and select an existing project or create a new one.' },
      { title: 'Save to .env', content: 'Your API key will be generated. Save it as GEMINI_API_KEY=your_key_here' },
      { title: 'Install', content: 'npm install @google/generative-ai' }
    ],
    snippet: 'const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);',
    important: 'Free tier has usage limits. Never upload your API key to GitHub.'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Global Payments Infrastructure',
    logo: 'https://cdn.simpleicons.org/stripe/635bff',
    color: '#635bff',
    tagline: 'How to Get API Keys',
    link: 'https://dashboard.stripe.com/',
    steps: [
      { title: 'Open Stripe Dashboard', content: 'Create an account and verify your email.' },
      { title: 'Go to API Keys', content: 'Navigate to Developers → API Keys in the dashboard.' },
      { title: 'Get Keys', content: 'You will get a Publishable Key and a Secret Key.' },
      { title: 'Save to .env', content: 'Save the secret key: STRIPE_SECRET_KEY=sk_test_xxx' },
      { title: 'Install', content: 'npm install stripe' }
    ],
    snippet: '// Test Card: 4242 4242 4242 4242\nconst stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);',
    important: 'Secret key should only be used in backend. Real payments may require business verification.'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Backend as a Service (DB & Auth)',
    logo: 'https://cdn.simpleicons.org/supabase/3ecf8e',
    color: '#3ecf8e',
    tagline: 'Database + API Setup',
    link: 'https://supabase.com/dashboard',
    steps: [
      { title: 'Open Supabase Dashboard', content: 'Sign up and click “New Project”. Fill project name, password, and region.' },
      { title: 'Get API Keys', content: 'Go to Settings → API and copy Project URL and anon public key.' },
      { title: 'Save to .env', content: 'SUPABASE_URL=xxxx\nSUPABASE_ANON_KEY=xxxx' },
      { title: 'Install', content: 'npm install @supabase/supabase-js' }
    ],
    snippet: 'const supabase = createClient(url, key)',
    important: 'Never expose service_role key publicly. Free tier has limits.'
  },
  {
    id: 'clerk',
    name: 'Clerk',
    description: 'Complete User Management',
    logo: 'https://cdn.simpleicons.org/clerk/6c47ff',
    color: '#6c47ff',
    tagline: 'Authentication Setup',
    link: 'https://dashboard.clerk.com/',
    steps: [
      { title: 'Open Clerk Dashboard', content: 'Create an account and click “Create Application”.' },
      { title: 'Configure Auth', content: 'Choose login methods: Google, Email, GitHub etc.' },
      { title: 'Get API Keys', content: 'Go to API Keys and copy Publishable and Secret keys.' },
      { title: 'Install', content: 'npm install @clerk/nextjs' }
    ],
    snippet: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxx\nCLERK_SECRET_KEY=xxx',
    important: 'Publishable key can be used in frontend. Secret key must stay in backend.'
  },
  {
    id: 'resend',
    name: 'Resend',
    description: 'Email API for Developers',
    logo: 'https://cdn.simpleicons.org/resend/ffffff',
    color: '#000000',
    tagline: 'Email API Setup',
    link: 'https://resend.com/dashboard',
    steps: [
      { title: 'Open Resend Dashboard', content: 'Create account and go to API Keys.' },
      { title: 'Create API Key', content: 'Click “Create API Key” and save the key.' },
      { title: 'Save to .env', content: 'RESEND_API_KEY=re_xxx' },
      { title: 'Install', content: 'npm install resend' }
    ],
    snippet: 'const resend = new Resend(process.env.RESEND_API_KEY)',
    important: 'Production email sending usually requires domain verification. Emails may initially go to spam.'
  },
  {
    id: 'cloudinary',
    name: 'Cloudinary',
    description: 'Image & Video Management',
    logo: 'https://cdn.simpleicons.org/cloudinary/3448c5',
    color: '#3448c5',
    tagline: 'Image Upload API Setup',
    link: 'https://cloudinary.com/console',
    steps: [
      { title: 'Open Cloudinary Console', content: 'Sign up. Dashboard shows Cloud Name, API Key, and API Secret.' },
      { title: 'Save to .env', content: 'CLOUDINARY_CLOUD_NAME=xxx\nCLOUDINARY_API_KEY=xxx\nCLOUDINARY_API_SECRET=xxx' },
      { title: 'Install', content: 'npm install cloudinary' }
    ],
    snippet: 'const cloudinary = require("cloudinary").v2;',
    important: 'Never expose API Secret in frontend. Free storage is limited.'
  },
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'SMS & Communications',
    logo: 'https://cdn.simpleicons.org/twilio/f22f46',
    color: '#f22f46',
    tagline: 'SMS API Setup',
    link: 'https://www.twilio.com/console',
    steps: [
      { title: 'Open Twilio Console', content: 'Create account and verify your phone number.' },
      { title: 'Get Credentials', content: 'Dashboard shows Account SID and Auth Token.' },
      { title: 'Get Number', content: 'Claim or buy a Twilio number.' },
      { title: 'Save to .env', content: 'TWILIO_ACCOUNT_SID=xxx\nTWILIO_AUTH_TOKEN=xxx\nTWILIO_PHONE_NUMBER=xxx' },
      { title: 'Install', content: 'npm install twilio' }
    ],
    snippet: 'const client = require("twilio")(accountSid, authToken);',
    important: 'Trial accounts only send SMS to verified numbers. Real usage is paid.'
  },
  {
    id: 'algolia',
    name: 'Algolia',
    description: 'Fast Search & Discovery',
    logo: 'https://cdn.simpleicons.org/algolia/003dff',
    color: '#003dff',
    tagline: 'Search API Setup',
    link: 'https://www.algolia.com/dashboard',
    steps: [
      { title: 'Open Algolia Dashboard', content: 'Sign up and go to API Keys.' },
      { title: 'Copy Keys', content: 'Copy App ID, Search Key, and Admin Key.' },
      { title: 'Install', content: 'npm install algoliasearch' }
    ],
    snippet: 'ALGOLIA_APP_ID=xxx\nALGOLIA_SEARCH_KEY=xxx\nALGOLIA_ADMIN_KEY=xxx',
    important: 'Admin key must stay private. Search key is safe for frontend.'
  },
  {
    id: 'map-box',
    name: 'Mapbox',
    description: 'Location & Map APIs',
    logo: 'https://cdn.simpleicons.org/mapbox/4264fb',
    color: '#4264fb',
    tagline: 'Maps API Setup',
    link: 'https://www.mapbox.com/signup',
    steps: [
      { title: 'Open Mapbox Signup', content: 'Create account and go to Access Tokens.' },
      { title: 'Copy Token', content: 'Copy the default public token.' },
      { title: 'Save to .env', content: 'MAPBOX_ACCESS_TOKEN=pk_xxx' },
      { title: 'Install', content: 'npm install mapbox-gl' }
    ],
    snippet: 'mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;',
    important: 'Public token is normally used in frontend. Usage limits may trigger billing.'
  },
  {
    id: 'firebase',
    name: 'Firebase',
    description: 'Google Backend Platform',
    logo: 'https://cdn.simpleicons.org/firebase/ffca28',
    color: '#ffca28',
    tagline: 'Database, Auth & Hosting',
    link: 'https://console.firebase.google.com/',
    steps: [
      { title: 'Create Project', content: 'Go to Firebase Console and click "Add Project".' },
      { title: 'Register App', content: 'Click the Web icon (</>) to register your app and get config.' },
      { title: 'Install SDK', content: 'npm install firebase' },
      { title: 'Initialize', content: 'Copy the firebaseConfig into your project.' }
    ],
    snippet: 'import { initializeApp } from "firebase/app";\nconst app = initializeApp(firebaseConfig);',
    important: 'Keep your API keys safe. Use Security Rules for database protection.'
  },
  {
    id: 'auth0',
    name: 'Auth0',
    description: 'Identity Platform',
    logo: 'https://cdn.simpleicons.org/auth0/eb5424',
    color: '#eb5424',
    tagline: 'Secure Authentication',
    link: 'https://auth0.com/',
    steps: [
      { title: 'Create Application', content: 'In Auth0 Dashboard, go to Applications -> Create Application.' },
      { title: 'Configure URLs', content: 'Set Allowed Callback, Logout, and Web Origins URLs.' },
      { title: 'Install SDK', content: 'npm install @auth0/auth0-react' }
    ],
    snippet: '<Auth0Provider domain={domain} clientId={clientId}>...</Auth0Provider>',
    important: 'Never share your Client Secret. Use PKCE for mobile/SPA apps.'
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Transactional Email Service',
    logo: 'https://cdn.simpleicons.org/sendgrid/009dd9',
    color: '#009dd9',
    tagline: 'Reliable Email Delivery',
    link: 'https://sendgrid.com/',
    steps: [
      { title: 'Create API Key', content: 'Settings -> API Keys -> Create API Key.' },
      { title: 'Verify Sender', content: 'Settings -> Sender Authentication -> Verify a Single Sender.' },
      { title: 'Install SDK', content: 'npm install @sendgrid/mail' }
    ],
    snippet: 'sgMail.setApiKey(process.env.SENDGRID_API_KEY);',
    important: 'Domain authentication is required for high deliverability.'
  },
  {
    id: 'aws-s3',
    name: 'AWS S3',
    description: 'Object Storage Service',
    logo: 'https://cdn.simpleicons.org/amazons3/ff9900',
    color: '#ff9900',
    tagline: 'Scalable Cloud Storage',
    link: 'https://aws.amazon.com/s3/',
    steps: [
      { title: 'Create Bucket', content: 'In AWS Console, search for S3 and click "Create bucket".' },
      { title: 'Set Permissions', content: 'Configure CORS and Bucket Policy for access.' },
      { title: 'Get Access Keys', content: 'IAM -> Users -> Security credentials -> Create access key.' }
    ],
    snippet: 'const s3 = new AWS.S3({ accessKeyId: xxx, secretAccessKey: yyy });',
    important: 'Bucket names must be globally unique. Never leak your AWS secret key.'
  },
  {
    id: 'mongodb',
    name: 'MongoDB Atlas',
    description: 'Cloud NoSQL Database',
    logo: 'https://cdn.simpleicons.org/mongodb/47a248',
    color: '#47a248',
    tagline: 'Fully Managed MongoDB',
    link: 'https://www.mongodb.com/cloud/atlas',
    steps: [
      { title: 'Create Cluster', content: 'Sign up and create a free Shared Cluster.' },
      { title: 'Whitelist IP', content: 'Network Access -> Add IP Address (use 0.0.0.0/0 for hackathons).' },
      { title: 'Create DB User', content: 'Database Access -> Add New Database User.' },
      { title: 'Get URI', content: 'Database -> Connect -> Connect your application.' }
    ],
    snippet: 'mongoose.connect(process.env.MONGODB_URI);',
    important: 'Database users need specific roles. Don\'t forget to whitelist your IP.'
  },
  {
    id: 'redis',
    name: 'Upstash Redis',
    description: 'Serverless Redis',
    logo: 'https://cdn.simpleicons.org/upstash/ff4438',
    color: '#ff4438',
    tagline: 'Fast Caching & State',
    link: 'https://upstash.com/',
    steps: [
      { title: 'Create Database', content: 'Log in to Upstash and click "Create Database".' },
      { title: 'Get REST Token', content: 'Copy the REST URL and Token from the dashboard.' },
      { title: 'Install Client', content: 'npm install @upstash/redis' }
    ],
    snippet: 'const redis = new Redis({ url: xxx, token: yyy });',
    important: 'Redis is great for rate limiting and temporary state storage.'
  }
];

export const templateList: TemplateData[] = [
  { id: 'nextjs-tailwind', title: 'Next.js + Tailwind Pro', description: 'Full-stack kit with authentication, database, and UI components pre-configured.', type: 'react', tech: 'React v18' },
  { id: 'fastapi-micro', title: 'Python FastAPI Micro', description: 'High-performance async API template with Pydantic schemas and JWT auth.', type: 'python', tech: 'Python 3.11' },
  { id: 'node-express', title: 'Node Express Starter', description: 'Clean architecture for scalable backend services.', type: 'python', tech: 'Node.js v20' },
  { id: 'go-rest', title: 'Go REST Engine', description: 'Lightweight and fast API engine with Gin framework.', type: 'python', tech: 'Go 1.21' },
  { id: 'react-native', title: 'Mobile Expo Kit', description: 'Ready-to-go mobile template for cross-platform apps.', type: 'react', tech: 'Expo v50' },
  { id: 'vue-dashboard', title: 'Vue Admin Pro', description: 'Sophisticated dashboard layout with built-in charts.', type: 'react', tech: 'Vue 3' },
];
