import Roadmap from '../components/CareerRoadmap'

export const metadata = {
  title: 'Career Roadmap | Music Industry Platform',
  description: 'Plan and track your music career goals with our interactive roadmap tool.',
}

export default function CareerRoadmapPage() {
  return (
    <main className="min-h-screen bg-white">
      <Roadmap />
    </main>
  )
}
