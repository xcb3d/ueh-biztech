import { craftVillages, CraftVillage } from "@/data/craft-villages";
import { notFound } from "next/navigation";
import CraftVillageClientPage from "./CraftVillageClientPage";
import { mockTours } from "@/data/mockTours";
import type { Metadata } from "next";

interface PageParams {
  slug: string;
}

export function generateStaticParams() {
  return craftVillages.map((village) => ({
    slug: village.slug,
  }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const village = craftVillages.find((v) => v.slug === params.slug);
  
  if (!village) {
    return {
      title: "Village Not Found"
    };
  }
  
  return {
    title: village.name,
    description: village.summary || `Explore ${village.name} craft village`
  };
}

export default async function CraftVillagePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const village = craftVillages.find((v) => v.slug === slug);

  if (!village) {
    notFound();
  }

  // Find related tours
  const relatedTours = mockTours.filter(
    (tour) => tour.location.name === village.name
  );

  // Cast the found village to the CraftVillage type
  const typedVillage: CraftVillage = village as CraftVillage;

  return <CraftVillageClientPage village={typedVillage} relatedTours={relatedTours} />;
} 