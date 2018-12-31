import { OwnerDetailsPreferencesDTO } from './OwnerDetailsPreferencesDTO';

export class VehicleModelDTO {
    id: Number;
    model: String = '';
    segment: String = '';
    mark: String = '';
    url: String = '';
    ownerDetailsPreferences: OwnerDetailsPreferencesDTO = new OwnerDetailsPreferencesDTO;
}
