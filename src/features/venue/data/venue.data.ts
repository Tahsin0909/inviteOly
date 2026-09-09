import { IVenue } from "../venue.interface";

export const initialVenues: IVenue[] = [
  {
    id: "venue-1",
    name: "The Grand Ballroom",
    streetAddress: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    capacity: 500,
    hasParking: true,
    parkingInfo:
      "Parking is available at the East Entrance. Valet parking is available Friday–Sunday evenings.",
    spaces: [
      { id: "space-1", name: "Ballroom A", capacity: 250 },
      { id: "space-2", name: "Ballroom B", capacity: 150 },
      { id: "space-3", name: "Garden Hall", capacity: 100 },
    ],
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "venue-2",
    name: "Metropolitan Hall",
    streetAddress: "789 Broadway Ave",
    city: "New York",
    state: "NY",
    zipCode: "10003",
    capacity: 350,
    hasParking: true,
    parkingInfo:
      "Street parking available after 6 PM. Adjacent parking garage located on 10th Street.",
    spaces: [
      { id: "space-4", name: "Grand Foyer", capacity: 200 },
      { id: "space-5", name: "Skyline Room", capacity: 150 },
    ],
    createdAt: "2026-03-02T11:30:00Z",
    updatedAt: "2026-03-02T11:30:00Z",
  },
  {
    id: "venue-3",
    name: "Hudson River Terrace",
    streetAddress: "620 W 42nd Street",
    city: "New York",
    state: "NY",
    zipCode: "10036",
    capacity: 450,
    hasParking: true,
    parkingInfo:
      "On-site covered parking deck with 200 spots available for guests and event staff.",
    spaces: [
      { id: "space-6", name: "North Pavilion", capacity: 180 },
      { id: "space-7", name: "South Terrace", capacity: 170 },
      { id: "space-8", name: "Rooftop Garden", capacity: 100 },
    ],
    createdAt: "2026-03-03T14:15:00Z",
    updatedAt: "2026-03-03T14:15:00Z",
  },
];
