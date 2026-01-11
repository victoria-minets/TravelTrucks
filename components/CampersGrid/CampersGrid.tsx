// components\CampersGrid\CampersGrid.tsx

'use client';

import { useEffect } from 'react';
import { useCampersStore } from '@/lib/store/campersStore';
import CamperCard from '@/components/CamperCard/CamperCard';
import css from './CampersGrid.module.css';

export default function CampersGrid() {
  const { items, loadCampers, isLoading, total } = useCampersStore();

  useEffect(() => {
    loadCampers(true); // reset при першому завантаженні
  }, [loadCampers]);

  const hasMore = items.length < total; // є що ще завантажити

  return (
    <>
      <ul className={css.grid}>
        {items.map((camper) => (
          <li key={camper.id}>
            <CamperCard camper={camper} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className={css.actions}>
          <button
            className={css.button}
            onClick={() => loadCampers()}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </>
  );
}
