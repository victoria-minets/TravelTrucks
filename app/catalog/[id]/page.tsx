// app\catalog\[id]\page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { fetchCamperById } from '@/lib/campersApi';
import type { Camper, Review } from '@/types/camper';
import css from './CamperPage.module.css';

export default function CamperPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [camper, setCamper] = useState<Camper | null>(null);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>(
    'features',
  );
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchCamperById(id).then(setCamper).catch(console.error);
  }, [id]);

  if (!camper) return <p>Loading...</p>;

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  return (
    <div className={css.container}>
      {/* Верхня частина */}
      <header className={css.header}>
        <h1>{camper.name}</h1>

        <p className={css.meta}>
          €{camper.price.toFixed(2)} · {camper.location}
        </p>

        <div className={css.gallery}>
          {camper.gallery.slice(0, 4).map((img, i) => (
            <Image
              key={i}
              src={img.thumb || '/placeholder-image.png'}
              alt={`${camper.name} ${i + 1}`}
              width={290}
              height={200}
              className={css.galleryImage}
            />
          ))}
        </div>

        <p className={css.description}>{camper.description}</p>
      </header>

      {/* Нижня частина */}
      <div className={css.bottom}>
        {/* Ліва частина – вкладки */}
        <div className={css.left}>
          <div className={css.tabs}>
            <button
              className={activeTab === 'features' ? css.active : ''}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button
              className={activeTab === 'reviews' ? css.active : ''}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className={css.tabContent}>
            <div
              className={`${css.tabPanel} ${
                activeTab === 'features' ? css.visible : css.hidden
              }`}
            >
              <ul>
                {camper.transmission && (
                  <li>Transmission: {camper.transmission}</li>
                )}
                {camper.engine && <li>Engine: {camper.engine}</li>}
                {camper.AC !== undefined && (
                  <li>AC: {camper.AC ? 'Yes' : 'No'}</li>
                )}
                {camper.bathroom !== undefined && (
                  <li>Bathroom: {camper.bathroom ? 'Yes' : 'No'}</li>
                )}
                {camper.kitchen !== undefined && (
                  <li>Kitchen: {camper.kitchen ? 'Yes' : 'No'}</li>
                )}
                {camper.TV !== undefined && (
                  <li>TV: {camper.TV ? 'Yes' : 'No'}</li>
                )}
                {camper.radio !== undefined && (
                  <li>Radio: {camper.radio ? 'Yes' : 'No'}</li>
                )}
                {camper.refrigerator !== undefined && (
                  <li>Refrigerator: {camper.refrigerator ? 'Yes' : 'No'}</li>
                )}
                {camper.microwave !== undefined && (
                  <li>Microwave: {camper.microwave ? 'Yes' : 'No'}</li>
                )}
                {camper.gas !== undefined && (
                  <li>Gas: {camper.gas ? 'Yes' : 'No'}</li>
                )}
                {camper.water !== undefined && (
                  <li>Water: {camper.water ? 'Yes' : 'No'}</li>
                )}

                {camper.form && <li>Form: {camper.form}</li>}
                {camper.length && <li>Length: {camper.length}</li>}
                {camper.width && <li>Width: {camper.width}</li>}
                {camper.height && <li>Height: {camper.height}</li>}
                {camper.tank && <li>Tank: {camper.tank}</li>}
                {camper.consumption && (
                  <li>Consumption: {camper.consumption}</li>
                )}
              </ul>
            </div>

            <div
              className={`${css.tabPanel} ${
                activeTab === 'reviews' ? css.visible : css.hidden
              }`}
            >
              <ul>
                {camper.reviews.map((r, i) => (
                  <li key={i}>
                    <p>
                      ⭐ {r.reviewer_rating} – {r.reviewer_name}
                    </p>
                    <p>{r.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Права частина – форма бронювання */}
        <div className={css.right}>
          <form onSubmit={handleBooking} className={css.bookingForm}>
            <h3>Book this camper</h3>
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <input type="date" required />
            <input type="date" required />
            <button type="submit">Book Now</button>

            {bookingSuccess && (
              <p className={css.success}>Booking successful!</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
