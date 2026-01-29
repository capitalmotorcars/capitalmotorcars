import { VehicleTypeTemplate } from '@/components/vehicles/VehicleTypeTemplate';
import { getVehicleTypeBySlug } from '@/data/vehicleTypes';
import NotFound from '@/pages/NotFound';

export default function SUVPage() {
  const vehicle = getVehicleTypeBySlug('suv');
  
  if (!vehicle) return <NotFound />;
  
  return <VehicleTypeTemplate vehicle={vehicle} />;
}
