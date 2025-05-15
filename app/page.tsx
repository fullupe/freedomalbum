
"use client"
import { supabase } from "@/lib/supabase";
import Banner from "@/components/home/Banner";
import PhotoGrid from "@/components/home/PhotoGrid";
import { Photo } from "@/types";
import { useEffect, useState } from "react";



export default  function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      // When connected to Supabase, replace with:
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching photos:', error);
        return;
      }
      
      setPhotos(data);
      
    
    //setIsLoading(false);
 
    };
    
    fetchPhotos();
  }, []);


  // useEffect(()=>{
  //   getPhotos()
  // },[])

  //const photos = await getPhotos();

  
  return (
    <div className="min-h-screen">
      <Banner />
      
      <div className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-cormorant text-4xl font-semibold md:text-5xl">
            Nkansah & Joyce 
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Thank you for being part of our special day. We're delighted to share these precious 
            memories with you. Explore our wedding album and relive the magical moments with us.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a 
              href="#gallery" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View Gallery
            </a>
          </div>
        </div>
      </div>
      
      <PhotoGrid photos={photos} />
    </div>
  );
}
export const revalidate =0; 