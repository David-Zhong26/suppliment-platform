# Wellness Platform

A comprehensive personalized supplement and wellness platform that simplifies product choices, ensures safety, and fosters a community around health goals.

## 🎯 Vision

Build the go-to personalized supplement and wellness platform that simplifies product choices, ensures safety, and fosters a community around health goals. Users will not only understand which supplements are right for them but also directly connect with trusted sellers and like-minded peers.

## ✨ Key Features

### Core Functionality
- **Personalized Supplement Matching** - AI-powered recommendations based on user profiles
- **Safety & Interaction Checker** - Comprehensive drug-supplement interaction database
- **Community Platform** - Goal-based groups and verified creator content
- **Gamified Onboarding** - Task-based profile completion with rewards
- **E-commerce Integration** - Direct purchase links and affiliate partnerships

### User Types
- **General Users** - Track supplements, get recommendations, join communities
- **Verified Creators** - Share content, build following, monetize expertise
- **Sellers** - Product management, analytics, verification system

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component library
- **Framer Motion** - Smooth animations

### Backend
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication
- **Stripe** - Payment processing
- **Redis** - Caching and sessions

### External Integrations
- **USDA API** - Nutrition data
- **OpenFoodFacts** - Product information
- **Amazon/Shopify** - E-commerce APIs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Redis (for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wellness-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Fill in your database URL and other required environment variables.

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The platform uses a comprehensive database schema including:

- **Users** - Profile management and authentication
- **Products** - Supplement catalog with safety tags
- **Communities** - Group management and social features
- **Interactions** - Safety and conflict checking
- **Reviews** - User feedback and ratings
- **Messages** - Direct and group communication

## 🔐 Authentication

- Email/password authentication
- Google OAuth integration
- Two-factor authentication support
- Role-based access control (General User, Creator, Seller)

## 🛡 Safety Features

- **Drug-Supplement Interaction Checker** - Prevents dangerous combinations
- **Credibility Verification** - FDA-certified, third-party tested tags
- **Safety Warnings** - Real-time alerts for risky stacks
- **Verified Sellers** - Trusted vendor program

## 🎮 Gamification

- **Onboarding Tasks** - Profile completion rewards
- **Achievement Badges** - Progress tracking
- **Community Challenges** - Group engagement
- **Points System** - Discount rewards

## 📱 Responsive Design

- Mobile-first approach
- Progressive Web App capabilities
- Offline functionality for supplement logging
- Cross-platform compatibility

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes
- `npm run db:studio` - Open Prisma Studio

### Project Structure
```
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── lib/                # Utility functions and configurations
├── prisma/             # Database schema and migrations
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## 🚀 Deployment

The platform is designed to be deployed on modern cloud platforms:

- **Vercel** - Recommended for frontend deployment
- **Railway/Supabase** - Database hosting
- **Redis Cloud** - Caching layer
- **Stripe** - Payment processing

## 📈 Performance Targets

- Handle 5,000+ concurrent users at launch
- Scale to 50,000+ users
- Sub-2 second recommendation generation
- Sub-1 second safety check responses
- 99.9% uptime SLA

## 🔒 Security & Compliance

- **HIPAA/GDPR** compliance for health data
- **HTTPS/SSL** encryption
- **Password encryption** with bcrypt
- **Rate limiting** and DDoS protection
- **Auto-purge** inactive accounts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: support@wellnessplatform.com
- Documentation: [docs.wellnessplatform.com](https://docs.wellnessplatform.com)
- Community: [community.wellnessplatform.com](https://community.wellnessplatform.com)

---

Built with ❤️ for the wellness community
