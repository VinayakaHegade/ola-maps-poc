import axios from "axios";

const OLA_API_KEY = process.env.NEXT_PUBLIC_OLA_API_KEY;

export async function searchOlaLocations(query: string): Promise<string[]> {
  if (!OLA_API_KEY) {
    console.error("Ola API key is missing");
    return [];
  }

  try {
    const response = await axios.get(
      `https://api.olamaps.io/places/v1/autocomplete?input=${query}&api_key=${OLA_API_KEY}`
    );
    return response.data.predictions.map(
      //   (location: any) => location.structured_formatting.main_text
      (location: any) => location.description
    );
  } catch (error) {
    console.error("Error fetching Ola locations:", error);
    return [];
  }
}
