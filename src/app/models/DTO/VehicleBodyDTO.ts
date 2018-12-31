import { VehicleDriveDTO } from './VehicleDriveDTO';

export class VehicleBodyDTO {
    id: Number = null;
    name: String = '';
    trunkCapacity: Number = null;
    purpose: String = '';
    vehicleDrives: VehicleDriveDTO[] = null;
}
