"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function FeatureDialog({ feature }: { feature: any }) {
  const [open, setOpen] = useState(false);

  const parseList = (field?: string) =>
    field ? field.split(",").map((item) => item.trim()).filter(Boolean) : [];

  const resolveImageSrc = (path?: string) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `/images/${path}`;
  };

  return (
    <>
      <div
        className="text-blue-600 hover:underline cursor-pointer font-medium"
        onClick={() => setOpen(true)}
      >
        Learn More →
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl" style={{height:"97%",overflowY:"auto"}}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {feature.Title}
            </DialogTitle>
            <DialogDescription>{feature.Intro}</DialogDescription>
          </DialogHeader>

          {feature.HeroImage && (
            <Image
              src={resolveImageSrc(feature.HeroImage)}
              alt={feature.Title}
              width={800}
              height={400}
              className="rounded-lg my-4 object-cover w-full h-auto"
            />
          )}

          <div className="space-y-4 text-gray-700">
            {/* Key Points */}
            {feature.KeyPoints && (
              <div>
                <h4 className="font-semibold text-lg mb-1">Key Points</h4>
                <ul className="list-disc pl-6">
                  {parseList(feature.KeyPoints).map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Process */}
            {feature.Process && (
              <div>
                <h4 className="font-semibold text-lg mb-1">Process</h4>
                <ol className="list-decimal pl-6">
                  {parseList(feature.Process).map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Benefits */}
            {feature.Benefits && (
              <div>
                <h4 className="font-semibold text-lg mb-1">Benefits</h4>
                <ul className="list-disc pl-6">
                  {parseList(feature.Benefits).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* SEO info (optional for debugging or preview) */}
            {feature.SEO_Title && (
              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-lg mb-1">SEO Info</h4>
                <p><strong>Title:</strong> {feature.SEO_Title}</p>
                <p><strong>Description:</strong> {feature.SEO_Description}</p>
                <p><strong>Canonical:</strong> {feature.SEO_Canonical}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
