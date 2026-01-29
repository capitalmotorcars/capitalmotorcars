import { VehicleTypeTemplate } from '@/components/vehicles/VehicleTypeTemplate';
import { getVehicleTypeBySlug } from '@/data/vehicleTypes';
import NotFound from '@/pages/NotFound';

export default function SportsPage() {
  const vehicle = getVehicleTypeBySlug('sports');
  
  if (!vehicle) return <NotFound />;
  
  return <VehicleTypeTemplate vehicle={vehicle} />;
}
