import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create wellness goals
  const wellnessGoals = await Promise.all([
    prisma.wellnessGoal.upsert({
      where: { id: 'weight-loss' },
      update: {},
      create: {
        id: 'weight-loss',
        name: 'Weight Loss',
        description: 'Achieve and maintain a healthy weight',
        category: 'fitness'
      }
    }),
    prisma.wellnessGoal.upsert({
      where: { id: 'muscle-gain' },
      update: {},
      create: {
        id: 'muscle-gain',
        name: 'Muscle Gain',
        description: 'Build lean muscle mass and strength',
        category: 'fitness'
      }
    }),
    prisma.wellnessGoal.upsert({
      where: { id: 'energy-boost' },
      update: {},
      create: {
        id: 'energy-boost',
        name: 'Energy Boost',
        description: 'Increase daily energy levels and reduce fatigue',
        category: 'vitality'
      }
    }),
    prisma.wellnessGoal.upsert({
      where: { id: 'immune-support' },
      update: {},
      create: {
        id: 'immune-support',
        name: 'Immune Support',
        description: 'Strengthen immune system and overall health',
        category: 'health'
      }
    }),
    prisma.wellnessGoal.upsert({
      where: { id: 'clean-eating' },
      update: {},
      create: {
        id: 'clean-eating',
        name: 'Clean Eating',
        description: 'Adopt a clean, whole-foods based diet',
        category: 'nutrition'
      }
    }),
    prisma.wellnessGoal.upsert({
      where: { id: 'stress-management' },
      update: {},
      create: {
        id: 'stress-management',
        name: 'Stress Management',
        description: 'Reduce stress and improve mental well-being',
        category: 'mental-health'
      }
    })
  ])

  // Create safety tags
  const safetyTags = await Promise.all([
    prisma.safetyTag.upsert({
      where: { id: 'fda-certified' },
      update: {},
      create: {
        id: 'fda-certified',
        name: 'FDA Certified',
        description: 'Approved by the Food and Drug Administration',
        icon: 'Shield',
        color: 'green'
      }
    }),
    prisma.safetyTag.upsert({
      where: { id: 'third-party-tested' },
      update: {},
      create: {
        id: 'third-party-tested',
        name: 'Third-Party Tested',
        description: 'Independently verified for quality and purity',
        icon: 'CheckCircle',
        color: 'blue'
      }
    }),
    prisma.safetyTag.upsert({
      where: { id: 'organic' },
      update: {},
      create: {
        id: 'organic',
        name: 'Organic',
        description: 'Made from organic ingredients',
        icon: 'Leaf',
        color: 'green'
      }
    }),
    prisma.safetyTag.upsert({
      where: { id: 'non-gmo' },
      update: {},
      create: {
        id: 'non-gmo',
        name: 'Non-GMO',
        description: 'Free from genetically modified organisms',
        icon: 'Ban',
        color: 'orange'
      }
    }),
    prisma.safetyTag.upsert({
      where: { id: 'vegan' },
      update: {},
      create: {
        id: 'vegan',
        name: 'Vegan',
        description: 'Suitable for vegan diets',
        icon: 'Sprout',
        color: 'green'
      }
    })
  ])

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const sampleUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        age: 28,
        gender: 'male',
        userType: 'GENERAL_USER',
        password: hashedPassword,
        wellnessGoals: {
          connect: [
            { id: 'muscle-gain' },
            { id: 'energy-boost' }
          ]
        }
      }
    }),
    prisma.user.upsert({
      where: { email: 'jane.smith@example.com' },
      update: {},
      create: {
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane.smith@example.com',
        age: 32,
        gender: 'female',
        userType: 'VERIFIED_CREATOR',
        password: hashedPassword,
        wellnessGoals: {
          connect: [
            { id: 'weight-loss' },
            { id: 'clean-eating' }
          ]
        }
      }
    }),
    prisma.user.upsert({
      where: { email: 'mike.wilson@example.com' },
      update: {},
      create: {
        name: 'Mike Wilson',
        username: 'mikewilson',
        email: 'mike.wilson@example.com',
        age: 35,
        gender: 'male',
        userType: 'SELLER',
        password: hashedPassword
      }
    })
  ])

  // Create seller profile for Mike Wilson
  const sellerProfile = await prisma.sellerProfile.upsert({
    where: { userId: sampleUsers[2].id },
    update: {},
    create: {
      userId: sampleUsers[2].id,
      businessName: 'Wellness Supplements Co.',
      contactInfo: 'contact@wellnesssupplements.com',
      certification: 'https://example.com/cert.pdf',
      verificationStatus: 'APPROVED'
    }
  })

  // Create sample products
  const sampleProducts = await Promise.all([
    prisma.product.upsert({
      where: { id: 'whey-protein-1' },
      update: {},
      create: {
        id: 'whey-protein-1',
        name: 'Premium Whey Protein',
        description: 'High-quality whey protein isolate for muscle building and recovery. Contains 25g protein per serving with all essential amino acids.',
        ingredients: 'Whey Protein Isolate, Natural Vanilla Flavor, Stevia, Xanthan Gum',
        dosage: '1 scoop (30g) mixed with water or milk',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400',
        category: 'protein',
        tags: ['muscle-gain', 'recovery', 'high-protein'],
        matchScore: 0.95,
        sellerId: sellerProfile.id,
        affiliateLink: 'https://example.com/whey-protein',
        discountCode: 'WELLNESS10',
        safetyTags: {
          connect: [
            { id: 'third-party-tested' },
            { id: 'non-gmo' }
          ]
        }
      }
    }),
    prisma.product.upsert({
      where: { id: 'multivitamin-1' },
      update: {},
      create: {
        id: 'multivitamin-1',
        name: 'Daily Multivitamin Complex',
        description: 'Comprehensive daily multivitamin with 23 essential vitamins and minerals to support overall health and energy.',
        ingredients: 'Vitamin A, C, D, E, B-Complex, Iron, Zinc, Magnesium, and 15 other essential nutrients',
        dosage: '1 tablet daily with food',
        price: 29.99,
        imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8713?w=400',
        category: 'multivitamin',
        tags: ['daily-health', 'energy', 'immune-support'],
        matchScore: 0.88,
        sellerId: sellerProfile.id,
        affiliateLink: 'https://example.com/multivitamin',
        safetyTags: {
          connect: [
            { id: 'fda-certified' },
            { id: 'third-party-tested' },
            { id: 'organic' }
          ]
        }
      }
    }),
    prisma.product.upsert({
      where: { id: 'omega3-1' },
      update: {},
      create: {
        id: 'omega3-1',
        name: 'Omega-3 Fish Oil',
        description: 'High-potency fish oil supplement with 1000mg EPA and DHA for heart and brain health.',
        ingredients: 'Fish Oil, Gelatin, Glycerin, Natural Lemon Flavor',
        dosage: '2 softgels daily with meals',
        price: 39.99,
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        category: 'omega3',
        tags: ['heart-health', 'brain-health', 'anti-inflammatory'],
        matchScore: 0.92,
        sellerId: sellerProfile.id,
        affiliateLink: 'https://example.com/omega3',
        safetyTags: {
          connect: [
            { id: 'third-party-tested' },
            { id: 'non-gmo' }
          ]
        }
      }
    })
  ])

  // Create sample interactions
  await Promise.all([
    prisma.interaction.upsert({
      where: { id: 'warfarin-fish-oil' },
      update: {},
      create: {
        id: 'warfarin-fish-oil',
        productId: sampleProducts[2].id,
        conflictingMedication: 'Warfarin',
        severity: 'HIGH',
        description: 'Fish oil may increase bleeding risk when taken with blood thinners like warfarin.',
        recommendation: 'Consult your doctor before taking fish oil if you are on blood thinners. Monitor for signs of increased bleeding.'
      }
    })
  ])

  // Create sample communities
  const communities = await Promise.all([
    prisma.community.upsert({
      where: { id: 'weight-loss-group' },
      update: {},
      create: {
        id: 'weight-loss-group',
        name: 'Weight Loss Warriors',
        description: 'A supportive community for those on their weight loss journey. Share tips, progress, and motivation!',
        category: 'weight-loss',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        memberCount: 1250,
        isPublic: true
      }
    }),
    prisma.community.upsert({
      where: { id: 'muscle-building' },
      update: {},
      create: {
        id: 'muscle-building',
        name: 'Muscle Building Masters',
        description: 'Connect with fellow fitness enthusiasts focused on building lean muscle mass.',
        category: 'muscle-gain',
        imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400',
        memberCount: 890,
        isPublic: true
      }
    }),
    prisma.community.upsert({
      where: { id: 'clean-eating' },
      update: {},
      create: {
        id: 'clean-eating',
        name: 'Clean Eating Champions',
        description: 'Share recipes, meal plans, and tips for maintaining a clean, whole-foods diet.',
        category: 'nutrition',
        imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
        memberCount: 2100,
        isPublic: true
      }
    })
  ])

  // Add users to communities
  await Promise.all([
    prisma.groupMembership.createMany({
      data: [
        {
          userId: sampleUsers[0].id,
          communityId: communities[1].id, // Muscle Building Masters
          role: 'MEMBER'
        },
        {
          userId: sampleUsers[1].id,
          communityId: communities[0].id, // Weight Loss Warriors
          role: 'MEMBER'
        },
        {
          userId: sampleUsers[1].id,
          communityId: communities[2].id, // Clean Eating Champions
          role: 'MEMBER'
        }
      ],
      skipDuplicates: true
    })
  ])

  // Create sample posts
  await Promise.all([
    prisma.post.create({
      data: {
        title: 'My 30-day protein challenge results!',
        content: 'Just finished my 30-day protein challenge and I\'m thrilled with the results. Gained 3lbs of lean muscle and my energy levels are through the roof!',
        type: 'TEXT',
        authorId: sampleUsers[0].id,
        communityId: communities[1].id,
        likes: 24,
        shares: 8
      }
    }),
    prisma.post.create({
      data: {
        title: 'Clean eating meal prep for the week',
        content: 'Here\'s my Sunday meal prep routine that keeps me on track all week. Quinoa bowls, roasted vegetables, and lean proteins!',
        type: 'TEXT',
        authorId: sampleUsers[1].id,
        communityId: communities[2].id,
        likes: 45,
        shares: 12
      }
    })
  ])

  console.log('✅ Database seeding completed successfully!')
  console.log(`📊 Created:`)
  console.log(`   - ${wellnessGoals.length} wellness goals`)
  console.log(`   - ${safetyTags.length} safety tags`)
  console.log(`   - ${sampleUsers.length} sample users`)
  console.log(`   - ${sampleProducts.length} sample products`)
  console.log(`   - ${communities.length} communities`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
