// components\CamperCard\CamperCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Camper } from '@/types/camper';
import css from './CamperCard.module.css';

type Props = {
  camper: Camper;
};

export default function CamperCard({ camper }: Props) {
  const { id, name, price, rating, location, gallery } = camper;

  return (
    <article className={css.card}>
      <Image
        src={camper.gallery[0]?.thumb || '/placeholder-image.png'}
        alt={camper.name}
        width={290}
        height={310}
        className={css.image}
      />

      <div className={css.content}>
        <div className={css.header}>
          <h3 className={css.title}>{name}</h3>
          <span className={css.price}>€{price.toFixed(2)}</span>
        </div>

        <p className={css.meta}>
          ⭐ {rating} · {location}
        </p>

        <Link href={`/catalog/${id}`} className={css.link}>
          Show more
        </Link>
      </div>
    </article>
  );
}
