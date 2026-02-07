import { useSearchParams } from 'react-router-dom';
import { VehicleTypeTemplate } from '@/components/vehicles/VehicleTypeTemplate';
import { getVehicleTypeBySlug, vehicleTypes } from '@/data/vehicleTypes';
import NotFound from '@/pages/NotFound';

export default function SedanPage() {
  const [searchParams] = useSearchParams();
  const vehicleSlug = searchParams.get('vehicle') || 'sedan';
  
  // Get the specific vehicle if slug is provided, otherwise get the first sedan
  const vehicle = vehicleSlug && vehicleSlug.startsWith('sedan') 
    ? getVehicleTypeBySlug(vehicleSlug) || vehicleTypes.find(v => v.slug === 'sedan')
    : vehicleTypes.find(v => v.slug === 'sedan');
  
  if (!vehicle) return <NotFound />;
  
  return <VehicleTypeTemplate vehicle={vehicle} />;
}
