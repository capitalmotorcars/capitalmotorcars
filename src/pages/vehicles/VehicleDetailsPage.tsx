import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { VehicleTypeTemplate } from '@/components/vehicles/VehicleTypeTemplate';
import { getVehicleTypeBySlug } from '@/services/vehicleTypeService';
import { VehicleType } from '@/types/vehicle';
import { Loader2 } from 'lucide-react';

export default function VehicleDetailsPage() {
    const { slug } = useParams<{ slug: string }>();
    const [vehicle, setVehicle] = useState<VehicleType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchVehicle() {
            if (!slug) return;
            setLoading(true);

            // Handle legacy/fallback for 'luxury' which doesn't exist as a slug in data
            // Maintain this logic as some navigation links might still point to 'luxury'
            const targetSlug = slug === 'luxury' ? 'corvette' : slug;

            try {
                const { success, data } = await getVehicleTypeBySlug(targetSlug);

                if (success && data) {
                    setVehicle(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch vehicle:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchVehicle();
    }, [slug]);

    if (!slug) {
        return <Navigate to="/vehicles/sedan" replace />;
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        );
    }

    if (error || !vehicle) {
        // If not found, fallback to sedan as a safe default
        // In a real app, might want a dedicated 404 page or distinct error message
        return <Navigate to="/vehicles/sedan" replace />;
    }

    return <VehicleTypeTemplate vehicle={vehicle} />;
}
