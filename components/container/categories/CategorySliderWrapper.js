// components/CategorySliderWrapper.js
// This is a Server Component. It handles data fetching and passing props.
import CategoriesSlider from './CategoriesSlider'; // Import the client component

// Data fetching function (Can be moved to lib/data.js if preferred)

export default function CategorySliderWrapper({categories}) {


  // SRP: Solely responsible for fetching data and orchestrating the view.
  return (
    <section className="py-12 bg-blue">
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Explore Our Categories
        </h2>
        {/* Pass server-fetched data to the client component */}
        <CategoriesSlider categories={categories.productcategorys} />
      </div>
    </section>
  );
}