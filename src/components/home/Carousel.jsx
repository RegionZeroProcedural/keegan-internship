import React, { useEffect, useRef } from "react";
import $ from "jquery";

window.$ = window.jQuery = $;

const Carousel = ({ children }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let initialized = false;

    const $carousel = $(carouselRef.current);

    const initializeCarousel = async () => {
      await import("owl.carousel");

      if (cancelled) return;

      if (typeof $.fn.owlCarousel !== "function") {
        console.error("Owl Carousel failed to register");
        return;
      }

      $carousel.owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 600,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 4 }
        }
      });

      initialized = true;
    };

    initializeCarousel().catch(console.error);

    return () => {
      cancelled = true;

      if (initialized) {
        $carousel.trigger("destroy.owl.carousel");
      }
    };
  }, []);

  // This is what your component was likely missing.
  return (
    <div ref={carouselRef} className="owl-carousel owl-theme">
      {children}
    </div>
  );
};

export default Carousel;