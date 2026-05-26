import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VehicleTypeTemplate } from '@/components/vehicles/VehicleTypeTemplate';
import { getVehicleTypeBySlug } from '@/services/vehicleTypeService';
import { VehicleType } from '@/types/vehicle';
import { Loader2 } from 'lucide-react';

export default function VehicleDetailsPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState<VehicleType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let active = true;

        async function fetchVehicle() {
            if (!slug) {
                navigate('/vehicles/sedan', { replace: true });
                return;
            }
            setLoading(true);
            setError(false);
            setVehicle(null);

            let targetSlug = slug;
            if (slug === 'luxury') {
                targetSlug = 'corvette';
            } else if (slug === 'sedan-mercedes-e350' || slug === 'sedan') {
                targetSlug = 'mercedes-e350';
            } else if (slug === 'cayenne-e-hybrid') {
                targetSlug = 'porsche-cayanne';
            } else if (slug === 'suv') {
                targetSlug = 'mercedes-amg';
            } else if (slug === '911-gts-hybrid-cabriolet' || slug === 'convertible' || slug === 'sport-convertible') {
                targetSlug = '911-hybrid-convertible';
            } else if (slug === 'coupe') {
                targetSlug = 'm8-coupe-competition';
            } else if (slug === 'truck') {
                targetSlug = 'f150-regular-cab-xl';
            } else if (slug === 'electric') {
                targetSlug = 'sedan-rs-etron-gt';
            } else if (slug === 'hybrid') {
                targetSlug = 'sedan-750e';
            }

            try {
                const { success, data } = await getVehicleTypeBySlug(targetSlug);

                if (!active) {
                    return; // Ignore result if the component slug has changed
                }

                if (success && data) {
                    setVehicle(data);
                } else {
                    setError(true);
                    navigate('/vehicles/sedan', { replace: true });
                }
            } catch (err) {
                if (!active) return;
                console.error("Failed to fetch vehicle:", err);
                setError(true);
                navigate('/vehicles/sedan', { replace: true });
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        fetchVehicle();

        return () => {
            active = false;
        };
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        );
    }

    if (error || !vehicle) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        );
    }

    return <VehicleTypeTemplate vehicle={vehicle} />;
}
