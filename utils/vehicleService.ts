import { cache } from 'react';
import { VehicleData } from '@/types/vehicle';
import promasterData from '@/data/promasterData.json';

/**
 * Get vehicle data by vehicle name
 * Uses React cache() for request deduplication in Next.js
 * @param vehicleName - The name of the vehicle (e.g., 'promaster')
 * @returns VehicleData or null if not found
 */
export const getVehicleData = cache(async (
  vehicleName: string
): Promise<VehicleData | null> => {
  try {
    // Normalize vehicle name to lowercase
    const normalizedName = vehicleName.toLowerCase();

    // Only promaster is supported
    if (normalizedName === 'promaster') {
      return promasterData as VehicleData;
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `Vehicle data not found for: ${vehicleName}. Only 'promaster' is supported.`
      );
    }
    return null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error loading vehicle data:', error);
    }
    return null;
  }
});

