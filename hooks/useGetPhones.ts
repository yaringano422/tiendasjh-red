import { useState, useEffect } from "react";
import { supabase } from "../src/lib/supabaseClient";
export interface Phone {
  id: string | number;
  fullName: string;
  brand: string;
  connectivity: string;
  ram: string;
  storage: string;
  price: number;
  images: string[];
  sku: string;
  category_id: number;
}

export const useGetPhones = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("products")
          .select(
            `
            id,
            fullName: fullname, 
            brand,
            connectivity,
            ram,
            storage,
            price,
            images,
            sku,
            category_id
          `,
          )
          .eq("is_active", true);

        // Si hay error en Supabase, lo mandamos al catch
        if (error) throw error;

        // Guardamos los datos tipados correctamente
        setPhones(data as unknown as Phone[]);
      } catch (error: any) {
        // 🔥 Aquí capturamos el error sin romper React
        console.error(
          "❌ Error al traer datos de Supabase:",
          error.message || error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  return { phones, loading };
};
