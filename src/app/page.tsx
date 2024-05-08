import FeaturedPosts from '@/components/FeaturedPosts';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <section className=' w-full p-14'>
      <Hero />
      <FeaturedPosts />
    </section>
  );
}
