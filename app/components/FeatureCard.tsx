// components/FeatureCard.tsx
import Link from 'next/link';

export default function FeatureCard({ feature }: any) {
  return (
    <div className="p-6 rounded-lg shadow bg-gradient-to-br from-sky-50 to-white hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{feature.Title}</h3>
      <p className="text-slate-600 mb-4">{feature.ShortDescription ?? feature.Description}</p>
      <Link href={`/features/${feature.Slug}`} className="text-blue-600 hover:underline">
        Learn More →
      </Link>
    </div>
  );
}
