import { CarShowroomDTO } from './DTO/CarShowroomDTO';
import { OwnerDetailsPreferencesDTO } from './DTO/OwnerDetailsPreferencesDTO';

export class FinishCar {
    id: Number;
    mark: String;
    model: String;
    carSegment: String;
    bodyType: String;
    trunkCapacity: Number;
    power: Number;
    fuelConsumption: String;
    drive: String;
    engine: String;
    acceleratrion: Number;
    price: Number;
    url: String;
    OwnerDetailsPreferences: OwnerDetailsPreferencesDTO;
    carShowrooms: CarShowroomDTO[];
    ratio: Number;
}
