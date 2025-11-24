import { VehicleData } from '@/types/vehicle';
import promasterData from '@/data/promasterData.json';

/**
 * Get vehicle data by vehicle name
 * @param vehicleName - The name of the vehicle (e.g., 'promaster')
 * @returns VehicleData or null if not found
 */
export async function getVehicleData(
  vehicleName: string
): Promise<VehicleData | null> {
  try {
    // Normalize vehicle name to lowercase
    const normalizedName = vehicleName.toLowerCase();

    // Only promaster is supported
    if (normalizedName === 'promaster') {
      return promasterData as VehicleData;
    }
    
    console.warn(`Vehicle data not found for: ${vehicleName}. Only 'promaster' is supported.`);
    return null;
  } catch (error) {
    console.error('Error loading vehicle data:', error);
    return null;
  }
}

