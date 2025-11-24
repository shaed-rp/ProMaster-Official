import { getVehicleData } from '@/utils/vehicleService';
import PromasterClient from './promaster/PromasterClient';
import { calculateSectionTitles } from '@/utils/sectionTitles';

export default async function HomePage() {
  try {
    const data = await getVehicleData('promaster');

    if (!data) {
      return <div>Error loading data</div>;
    }

    // Calculate section titles on the server
    const sectionTitles = calculateSectionTitles(data);

    return <PromasterClient data={data} sectionTitles={sectionTitles} />;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in HomePage:', error);
    }
    return (
      <div>
        <h1>Error loading page</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}

