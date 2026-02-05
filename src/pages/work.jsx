'use client';
import { useRouter } from 'next/router';
import CategoryGallery from '@/components/gallery/CategoryGallery';

const Work = () => {
  const router = useRouter();
  const { pathname } = router;
  const category = pathname.split('/')[1];

  return <CategoryGallery categoryName={category} />;
};

export default Work;
