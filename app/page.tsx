import { getVehicleData } from '@/utils/vehicleService';
import PromasterClient from './promaster/PromasterClient';

export default async function HomePage() {
  try {
    const data = await getVehicleData('promaster');

    if (!data) {
      return <div>Error loading data</div>;
    }

    return <PromasterClient data={data} />;
  } catch (error) {
    console.error('Error in HomePage:', error);
    return <div>Error loading page. Please try again later.</div>;
  }
}

