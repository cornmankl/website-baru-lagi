import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import ValuePropositions from '@/components/home/ValuePropositions'
import SocialProof from '@/components/home/SocialProof'
import NewsletterSignup from '@/components/home/NewsletterSignup'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <ValuePropositions />
      <SocialProof />
      <NewsletterSignup />
    </div>
  )
}