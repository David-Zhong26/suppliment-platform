// Database interface that both Prisma and MockDatabase can implement
export interface DatabaseInterface {
  // User operations
  findUserByEmail(email: string): Promise<any>
  findUserByUsername(username: string): Promise<any>
  getUserById(id: string): Promise<any>
  createUser(userData: any): Promise<any>
  
  // Product operations
  getProducts(): Promise<any[]>
  getProductById(id: string): Promise<any>
  getRecommendedProducts(userId: string): Promise<any[]>
  
  // Community operations
  getCommunities(): Promise<any[]>
  getCommunityById(id: string): Promise<any>
  joinCommunity(userId: string, communityId: string): Promise<boolean>
  
  // Safety operations
  checkSafety(supplements: string[], medications?: string[]): Promise<any>
}
