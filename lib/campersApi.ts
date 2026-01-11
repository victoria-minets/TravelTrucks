// lib\campersApi.ts

import { api } from '@/lib/api';
import { FetchCampersResponse } from '@/types/camper';

type FetchCampersParams = {
  page?: number;
  limit?: number;
};

export async function fetchCampers(
  params?: FetchCampersParams,
): Promise<FetchCampersResponse> {
  const response = await api.get<FetchCampersResponse>('/campers', {
    params,
  });

  // Тут беремо total і items з body, бо бекенд повертає їх всередині response.data
  return {
    items: response.data.items,
    total: response.data.total,
  };
}

export const fetchCamperById = async (id: string) => {
  const { data } = await api.get(`/campers/${id}`);
  return data;
};
