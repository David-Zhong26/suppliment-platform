'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ProductComparison from '@/components/product-comparison'

export default function ComparisonPage() {
  return (
    <div className="min-h-screen wellness-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/user">
            <Button variant="ghost" size="sm" className="wellness-nav-link">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Product Comparison Component */}
        <ProductComparison />
      </div>
    </div>
  )
}
