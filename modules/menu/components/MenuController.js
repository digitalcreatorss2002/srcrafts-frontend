// components/Menu/MenuServerContainer.jsx (Server Component)
import BottomNav from '@/components/container/header/BottomNav';
import { getMenuData } from '../menuService';
import MegaMenu from './MegaMenu'; 

export default async function MenuController({ slug }) {
  // Logic resides in the Service, called directly during Prerendering
  const menu = await getMenuData(slug);

  if (!menu) {
    return null; // Or a basic fallback menu
  }

  // We pass the data to the components that need interactivity
  return (
    <>
      <MegaMenu items={menu.items} />

      {/* MobileMenu likely needs state (isOpen), so it stays a Client Component 
          but receives data as props */}
      {/* <MobileMenu items={menu.items} /> */}
    </>
  );
}