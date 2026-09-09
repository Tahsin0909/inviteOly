export interface IVenueSpace {
  id?: string;
  name: string;
  capacity?: number;
  description?: string;
}

export interface IVenue {
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  capacity?: number;
  spacesCount?: number;
  hasParking?: boolean;
  parkingInfo?: string;
  spaces: IVenueSpace[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateVenuePayload {
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  capacity?: number;
  parkingInfo?: string;
  spaces?: IVenueSpace[];
}

export interface IUpdateVenuePayload extends Partial<ICreateVenuePayload> {
  id: string;
}
