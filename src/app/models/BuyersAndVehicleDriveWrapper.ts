import { VehicleDriveDTO } from './DTO/VehicleDriveDTO';
import { PotentialBuyerDTO } from './DTO/PotentialBuyerDTO';

export class BuyersAndVehicleDriveWrapper {
    potentialBuyersDTO: PotentialBuyerDTO[];
    vehicleDriveDTO: VehicleDriveDTO = new VehicleDriveDTO;
}
