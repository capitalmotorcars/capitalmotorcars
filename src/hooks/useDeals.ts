import { useQuery } from '@tanstack/react-query';
import { getActiveDeals } from '@/services/dealService';
import type { LeaseDeal } from '@/types/deals';

export function useDeals() {
    return useQuery<LeaseDeal[]>({
        queryKey: ['deals'],
        queryFn: async () => {
            const result = await getActiveDeals();
            if (!result.success) {
                throw new Error(result.error || 'Failed to fetch deals');
            }
            return result.data || [];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    });
}
