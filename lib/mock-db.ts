// Mock database implementation for development/demo purposes
// This replaces Prisma with in-memory data for easy deployment

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  age?: number;
  gender?: string;
  userType: 'GENERAL_USER' | 'CREATOR' | 'SELLER';
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  ingredients: string[];
  safetyTags: string[];
  matchPercentage?: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  isPrivate: boolean;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    userType: 'GENERAL_USER',
    age: 28,
    gender: 'Male',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    username: 'janesmith',
    userType: 'CREATOR',
    age: 32,
    gender: 'Female',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Vitamin D3',
    brand: 'Nature Made',
    description: 'High-quality Vitamin D3 supplement for bone health',
    price: 15.99,
    imageUrl: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400',
    category: 'Vitamins',
    ingredients: ['Vitamin D3', 'Sunflower Oil'],
    safetyTags: ['FDA-Certified', 'Third-Party Tested'],
    matchPercentage: 95,
  },
  {
    id: '2',
    name: 'Omega-3 Fish Oil',
    brand: 'Nordic Naturals',
    description: 'Premium fish oil with high EPA and DHA content',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    category: 'Omega-3',
    ingredients: ['Fish Oil', 'EPA', 'DHA'],
    safetyTags: ['Third-Party Tested', 'Mercury-Free'],
    matchPercentage: 88,
  },
  {
    id: '3',
    name: 'Probiotics Complex',
    brand: 'Garden of Life',
    description: 'Multi-strain probiotic for digestive health',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    category: 'Probiotics',
    ingredients: ['Lactobacillus', 'Bifidobacterium'],
    safetyTags: ['Organic', 'Non-GMO'],
    matchPercentage: 92,
  },
];

const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Weight Loss Warriors',
    description: 'Support group for weight loss journey',
    memberCount: 1250,
    category: 'Weight Loss',
    isPrivate: false,
  },
  {
    id: '2',
    name: 'Clean Eating Enthusiasts',
    description: 'Community focused on clean, healthy eating',
    memberCount: 890,
    category: 'Nutrition',
    isPrivate: false,
  },
  {
    id: '3',
    name: 'Yoga & Mindfulness',
    description: 'Holistic wellness and mindfulness practices',
    memberCount: 2100,
    category: 'Wellness',
    isPrivate: false,
  },
];

// Mock database operations
export class MockDatabase {
  private users: User[] = [...mockUsers];
  private products: Product[] = [...mockProducts];
  private communities: Community[] = [...mockCommunities];

  // User operations
  async createUser(userData: Partial<User>): Promise<User> {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || '',
      email: userData.email || '',
      username: userData.username || '',
      userType: userData.userType || 'GENERAL_USER',
      age: userData.age,
      gender: userData.gender,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.users.find(user => user.username === username) || null;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return [...this.products];
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.find(product => product.id === id) || null;
  }

  async getRecommendedProducts(userId: string): Promise<Product[]> {
    // Mock recommendation logic - return all products with match percentages
    return this.products.map(product => ({
      ...product,
      matchPercentage: Math.floor(Math.random() * 30) + 70, // 70-100%
    }));
  }

  // Community operations
  async getCommunities(): Promise<Community[]> {
    return [...this.communities];
  }

  async getCommunityById(id: string): Promise<Community | null> {
    return this.communities.find(community => community.id === id) || null;
  }

  async joinCommunity(userId: string, communityId: string): Promise<boolean> {
    // Mock join operation
    const community = this.communities.find(c => c.id === communityId);
    if (community) {
      community.memberCount++;
      return true;
    }
    return false;
  }

  // Safety checker
  async checkSafety(supplements: string[], medications: string[] = []): Promise<{
    safetyScore: number;
    interactions: Array<{
      supplement: string;
      medication?: string;
      severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
      description: string;
    }>;
    warnings: string[];
  }> {
    const interactions = [];
    const warnings = [];
    let safetyScore = 100;

    // Mock safety checks
    if (supplements.includes('Vitamin K') && medications.includes('Warfarin')) {
      interactions.push({
        supplement: 'Vitamin K',
        medication: 'Warfarin',
        severity: 'CRITICAL',
        description: 'Vitamin K can reduce the effectiveness of Warfarin',
      });
      safetyScore -= 30;
    }

    if (supplements.includes('Iron') && supplements.includes('Calcium')) {
      interactions.push({
        supplement: 'Iron',
        severity: 'MODERATE',
        description: 'Calcium can interfere with iron absorption',
      });
      safetyScore -= 15;
    }

    if (supplements.length > 10) {
      warnings.push('Taking more than 10 supplements may cause interactions');
      safetyScore -= 10;
    }

    return {
      safetyScore: Math.max(safetyScore, 0),
      interactions,
      warnings,
    };
  }
}

// Create a singleton instance
export const mockDb = new MockDatabase();
