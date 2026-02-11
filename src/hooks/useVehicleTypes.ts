import { useQuery } from '@tanstack/react-query';
import { getAllVehicleTypes } from '@/services/vehicleTypeService';
import type { VehicleType } from '@/types/vehicle';

export function useVehicleTypes() {
    return useQuery<VehicleType[]>({
        queryKey: ['vehicle-types'],
        queryFn: async () => {
            const result = await getAllVehicleTypes();
            if (!result.success) {
                throw new Error(result.error || 'Failed to fetch vehicle types');
            }
            return result.data || [];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    });
}
