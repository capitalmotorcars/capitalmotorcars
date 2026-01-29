import { VehicleTypeTemplate } from '@/components/vehicles/VehicleTypeTemplate';
import { getVehicleTypeBySlug } from '@/data/vehicleTypes';
import NotFound from '@/pages/NotFound';

export default function CrossoverPage() {
  const vehicle = getVehicleTypeBySlug('crossover');
  
  if (!vehicle) return <NotFound />;
  
  return <VehicleTypeTemplate vehicle={vehicle} />;
}
