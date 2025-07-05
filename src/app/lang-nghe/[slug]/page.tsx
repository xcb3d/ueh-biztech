import { craftVillages, CraftVillage } from "@/data/craft-villages";
import { notFound } from "next/navigation";
import CraftVillageClientPage from "./CraftVillageClientPage";
import { mockTours } from "@/data/mockTours";

type Props = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return craftVillages.map((village) => ({
    slug: village.slug,
  }));
}

export default function CraftVillagePage({ params }: Props) {
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