'use client';
import { useRouter } from 'next/router';
import CategoryGallery from '@/components/gallery/CategoryGallery';

const Product = () => {
  const router = useRouter();
  const { pathname } = router;
  const category = pathname.split('/')[2];

  return <CategoryGallery categoryName={category} />;
};

export default Product;
