// Mapeo de imágenes reales por marca
export const phoneImages: Record<string, string> = {
  'Samsung': 'https://images.unsplash.com/photo-1721864428861-e4a9e9f9a5ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'Xiaomi/Poco': 'https://images.unsplash.com/photo-1697981812520-d1e056308e52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'Honor': 'https://images.unsplash.com/photo-1626194062394-022cc80f6d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'ZTE': 'https://images.unsplash.com/photo-1741061963569-9d0ef54d10d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'Motorola': 'https://images.unsplash.com/photo-1681554422431-cda0552f627f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'Básicos': 'https://images.unsplash.com/photo-1552926738-05d2482b9c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
};

export function getPhoneImage(brand: string): string {
  return phoneImages[brand] || phoneImages['Samsung'];
}
