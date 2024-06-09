import { unstable_noStore as noStore } from 'next/cache';
import { BlogType } from "./definitions";
import { personalData } from "./personal";

export async function getBlogs(all: boolean = false): Promise<BlogType[]> {
  noStore();

  try {
    // const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)
    const res = await fetch(`https://dev.to/api/articles?username=said7388`);
    const data = await res.json();

    if (!all) {
      // const filtered = data.filter((item: BlogType) => item?.cover_image).sort(() => Math.random() - 0.5);
      const filtered = data.filter((item: BlogType) => item?.cover_image)
        .sort((a: BlogType, b: BlogType) => a.published_at > b.published_at ? -1 : a.published_at < b.published_at ? 1 : 0);
      return filtered;
    }
  
    return data;    
  
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch blog data.');
  }
};