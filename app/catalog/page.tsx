// app\catalog\page.tsx

'use client';

import css from './catalog.module.css';

import CampersGrid from '@/components/CampersGrid/CampersGrid';

export default function CatalogPage() {
  return (
    <section className={css.container}>
      <h2 className={css.title}>All Campers</h2>
      <CampersGrid />
    </section>
  );
}
