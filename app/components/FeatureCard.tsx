import FeatureDialog from "./FeatureDialog";
import { getSheetData } from "../lib/fetchGoogleSheet";

export default async function FeatureCard({ feature }: { feature: any }) {
  // Fetch all feature details from Google Sheet
  const featureDetails = await getSheetData("FeatureDetail");

  // Match based on Slug
  const featureDetail = featureDetails.find(
    (item: any) => item.Slug === feature.Slug
  );

  return (
    <div className="p-6 rounded-lg shadow bg-gradient-to-br from-sky-50 to-white hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{feature.Title}</h3>
      <p className="text-slate-600 mb-4">
        {feature.ShortDescription ?? feature.Intro ?? feature.Description}
      </p>
      {/* Pass both feature + matched detail */}
      <FeatureDialog feature={featureDetail ?? feature} />
    </div>
  );
}
