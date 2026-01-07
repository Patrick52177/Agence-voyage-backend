export class CreateCircuitDto {
  title: string;
  description: string;
  duration: string;
  destination: string;
  theme: string;
  region: string;
  image: string;
  bestPeriod?: string;
  travelerType?: string;
  itinerary?: string[];
  included?: string;
  notIncluded?: string;
  isActive?: boolean;
}
