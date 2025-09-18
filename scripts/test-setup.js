#!/usr/bin/env node

/**
 * Wellness Platform Setup and Test Script
 * This script helps verify that all components are working correctly
 */

const fs = require('fs')
const path = require('path')

console.log('🚀 Wellness Platform Setup Test')
console.log('================================\n')

// Check if required files exist
const requiredFiles = [
  'package.json',
  'prisma/schema.prisma',
  'app/layout.tsx',
  'app/page.tsx',
  'lib/db.ts',
  'lib/auth.ts',
  'components/landing-page.tsx',
  'app/auth/signup/page.tsx',
  'app/auth/signin/page.tsx',
  'app/onboarding/page.tsx',
  'app/dashboard/user/page.tsx',
  'app/dashboard/seller/page.tsx',
  'app/dashboard/creator/page.tsx',
  'app/api/auth/register/route.ts',
  'app/api/auth/[...nextauth]/route.ts',
  'app/api/supplements/recommendations/route.ts',
  'app/api/safety/check/route.ts',
  'app/api/communities/route.ts',
  'prisma/seed.ts'
]

console.log('📁 Checking required files...')
let allFilesExist = true

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - MISSING`)
    allFilesExist = false
  }
})

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing!')
  process.exit(1)
}

// Check package.json dependencies
console.log('\n📦 Checking package.json dependencies...')
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'))

const requiredDeps = [
  'next',
  'react',
  'typescript',
  '@prisma/client',
  'next-auth',
  'bcryptjs',
  'tailwindcss',
  '@radix-ui/react-accordion',
  'lucide-react',
  'zod'
]

const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep] && !packageJson.devDependencies[dep])

if (missingDeps.length > 0) {
  console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`)
} else {
  console.log('✅ All required dependencies found')
}

// Check environment file
console.log('\n🔧 Checking environment setup...')
const envExamplePath = path.join(__dirname, '..', 'env.example')
if (fs.existsSync(envExamplePath)) {
  console.log('✅ env.example found')
  console.log('⚠️  Remember to create .env.local with your actual values')
} else {
  console.log('❌ env.example missing')
}

// Check Prisma schema
console.log('\n🗄️  Checking Prisma schema...')
const schemaPath = path.join(__dirname, '..', 'prisma/schema.prisma')
if (fs.existsSync(schemaPath)) {
  const schema = fs.readFileSync(schemaPath, 'utf8')
  const modelCount = (schema.match(/^model \w+/gm) || []).length
  console.log(`✅ Prisma schema found with ${modelCount} models`)
} else {
  console.log('❌ Prisma schema missing')
}

// Check TypeScript configuration
console.log('\n📝 Checking TypeScript configuration...')
const tsconfigPath = path.join(__dirname, '..', 'tsconfig.json')
if (fs.existsSync(tsconfigPath)) {
  console.log('✅ tsconfig.json found')
} else {
  console.log('❌ tsconfig.json missing')
}

// Check Tailwind configuration
console.log('\n🎨 Checking Tailwind configuration...')
const tailwindPath = path.join(__dirname, '..', 'tailwind.config.ts')
if (fs.existsSync(tailwindPath)) {
  console.log('✅ tailwind.config.ts found')
} else {
  console.log('❌ tailwind.config.ts missing')
}

console.log('\n🎉 Setup verification complete!')
console.log('\n📋 Next steps:')
console.log('1. Install dependencies: npm install')
console.log('2. Set up environment variables: cp env.example .env.local')
console.log('3. Set up database: npm run db:push')
console.log('4. Seed database: npm run db:seed')
console.log('5. Start development server: npm run dev')
console.log('\n🌐 Your wellness platform will be available at http://localhost:3000')
console.log('\n✨ Features included:')
console.log('• User authentication (signup/signin)')
console.log('• Gamified onboarding questionnaire')
console.log('• Personalized supplement recommendations')
console.log('• Safety interaction checker')
console.log('• Community features')
console.log('• Seller dashboard with verification')
console.log('• Creator dashboard for content creators')
console.log('• Responsive design for all devices')
