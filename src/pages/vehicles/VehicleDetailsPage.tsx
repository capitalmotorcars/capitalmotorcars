import { useParams, Navigate } from 'react-router-dom';
import { VehicleTypeTemplate } from '@/components/vehicles/VehicleTypeTemplate';
import { getVehicleTypeBySlug } from '@/data/vehicleTypes';

export default function VehicleDetailsPage() {
    const { slug } = useParams<{ slug: string }>();

    if (!slug) {
        return <Navigate to="/vehicles/sedan" replace />;
    }

    // Handle legacy/fallback for 'luxury' which doesn't exist as a slug in data
    const targetSlug = slug === 'luxury' ? 'corvette' : slug;

    const vehicle = getVehicleTypeBySlug(targetSlug);

    if (!vehicle) {
        // If not found, try to find by body style or just fallback to sedan
        return <Navigate to="/vehicles/sedan" replace />;
    }

    return <VehicleTypeTemplate vehicle={vehicle} />;
}
