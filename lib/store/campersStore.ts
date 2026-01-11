// lib\store\campersStore.ts

import { create } from 'zustand';
import { fetchCampers } from '@/lib/campersApi';
import type { Camper } from '@/types/camper';

const PAGE_SIZE = 4;

type CampersStore = {
  items: Camper[];
  page: number;
  total: number;
  isLoading: boolean;
  loadCampers: (reset?: boolean) => Promise<void>;
};

export const useCampersStore = create<CampersStore>((set, get) => ({
  items: [],
  page: 1,
  total: 0,
  isLoading: false,

  loadCampers: async (reset = false) => {
    set({ isLoading: true });

    try {
      const page = reset ? 1 : get().page;

      const data = await fetchCampers({ page, limit: PAGE_SIZE });

      set({
        items: reset ? data.items : [...get().items, ...data.items],
        page: page + 1,
        total: data.total,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
