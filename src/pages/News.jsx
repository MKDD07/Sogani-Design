import React, { useState, useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import PageHero from '../components/PageHero.jsx';
import useReveal from '../hooks/useReveal.js';
import { NEWS_ITEMS } from '../data/news.js';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../styles/news.css';
import useDocumentMetadata from '../hooks/useDocumentMetadata.js';

gsap.registerPlugin(ScrollTrigger);

// Sub-component for individual News Card to ensure self-contained fade/slide animations
const NewsCard = ({ item, onClick }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="news-card"
      onClick={onClick}
    >
      <div className="news-card__media">
        <img
          ref={imgRef}
          className="news-card__img"
          src={item.img || '/assets/logo/logo-original.png'}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/logo/logo-original.png';
          }}
        />
      </div>
      <div className="news-card__body">
        <span className="news-card__date">{item.date}</span>
        <h3 className="news-card__title">{item.title}</h3>
        <div className="news-card__footer">
          View Details <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
};

// Sub-component for individual Swiper slide image to handle loading skeleton
const SwiperSlideImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="news-modal-slide" style={{ position: 'relative' }}>
      {!loaded && <div className="news-modal-image-skeleton" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`news-modal-single-img ${loaded ? 'loaded' : ''}`}
      />
    </div>
  );
};

// Fullscreen Split-Screen Showcase Modal
const NewsModal = ({ item, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  // Decodes html content and strips WordPress shortcodes
  const cleanExcerpt = (htmlStr) => {
    if (!htmlStr) return '';
    let text = htmlStr.replace(/\[\/?vc_[^\]]*\]/g, ''); // strip visual composer tags
    text = text.replace(/<[^>]*>/g, ''); // strip HTML tags
    
    // Use native browser DOM parser to clean up all HTML entities (e.g. &#8216;, &#8217;, &amp;)
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value.trim();
  };

  useEffect(() => {
    if (!item) return;

    // GSAP Open animation
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    tl.fromTo(panelRef.current, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');

    setLoading(true);
    setImageLoaded(false);
    setTitle(cleanExcerpt(item.title)); // Pre-populate with cleaned local title
    setContent('');
    setImages([]);

    const slug = item.link.replace('https://sogani.design/news/', '').replace('/', '');

    // Dynamic data fetch from WordPress API
    fetch(`https://sogani.design/wp-json/wp/v2/posts?slug=${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then((posts) => {
        if (posts && posts.length > 0) {
          const post = posts[0];
          
          // Decode dynamic title and content/excerpt
          setTitle(cleanExcerpt(post.title?.rendered || item.title));
          
          const rawDesc = post.excerpt?.rendered || post.content?.rendered || '';
          setContent(cleanExcerpt(rawDesc));
          
          return fetch(`https://sogani.design/wp-json/wp/v2/media?parent=${post.id}&per_page=20`);
        } else {
          throw new Error('No post found with that slug');
        }
      })
      .then((res) => {
        if (res && typeof res.json === 'function') return res.json();
        return [];
      })
      .then((media) => {
        if (media && media.length > 0) {
          const imageUrls = media.map((m) => m.source_url ? m.source_url.replace(/^http:\/\//i, 'https://') : '');
          setImages(imageUrls.filter(Boolean));
        } else {
          setImages([item.img ? item.img.replace(/^http:\/\//i, 'https://') : '']);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('WordPress integration failed (likely CORS or Offline). Loading local fallback:', err);
        // Fallback to local item info
        setTitle(cleanExcerpt(item.title));
        setContent('A selection detailing the design achievements, regional accolades, and global presentations of Vibhor Sogani.');
        setImages([item.img ? item.img.replace(/^http:\/\//i, 'https://') : '']);
        setLoading(false);
      });

    // Body scroll lock
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();

    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [item]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { xPercent: 100, duration: 0.4, ease: 'power3.in' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.2');
  };

  if (!item) return null;

  return (
    <div ref={overlayRef} className="news-modal-overlay" onClick={handleClose}>
      <div ref={panelRef} className="news-modal-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Left Panel: Content / Details */}
        <div className="news-modal-left">
          <div>
            <div className="news-modal-close-container">
              <button className="news-modal-close-btn" onClick={handleClose}>
                <i className="fa-solid fa-arrow-left"></i> Back to News
              </button>
            </div>
            <span className="news-modal-meta">{item.date}</span>
            <h2 className="news-modal-title">{title}</h2>
            <div className="news-modal-divider"></div>
            
            {loading ? (
              <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ color: 'var(--accent)', fontSize: '18px', marginRight: '10px' }}></i>
                <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>Fetching article details...</span>
              </div>
            ) : (
              <p className="news-modal-desc">{content}</p>
            )}
          </div>

          <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-modal-link-btn">
            View Live Story <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>

        {/* Right Panel: Portrait Aspect Swiper or Single Image */}
        <div className="news-modal-right">
          {loading ? (
            <div className="news-modal-image-skeleton" />
          ) : images.length > 1 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={true}
              pagination={{ clickable: true }}
              className="news-modal-swiper"
            >
              {images.map((imgUrl, i) => (
                <SwiperSlide key={i}>
                  <SwiperSlideImage src={imgUrl} alt={`${title} - Slide ${i + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="news-modal-single-image">
              {!imageLoaded && <div className="news-modal-image-skeleton" />}
              <img
                src={images[0]}
                alt={title}
                onLoad={() => setImageLoaded(true)}
                className={`news-modal-single-img ${imageLoaded ? 'loaded' : ''}`}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default function News() {
  useDocumentMetadata({
    title: 'Studio News & Press Awards | SOGANI Studio',
    description: 'Stay updated with latest exhibition showcases, design awards (EDIDA, IIID), and media highlights from SOGANI Studio.',
    keywords: 'design awards, IIID awards, EDIDA, lighting exhibitions, press release, SOGANI news, Vibhor Sogani news',
    canonicalUrl: 'https://sogani.design/news/'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' | 'large' | 'list'
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Helper to extract year from date string
  const getYear = (dateStr) => {
    if (!dateStr) return null;
    const match = dateStr.match(/\b(20\d{2}|19\d{2})\b/);
    return match ? parseInt(match[0], 10) : null;
  };

  // Filter items based on activeTab and searchQuery
  const filteredItems = useMemo(() => {
    return NEWS_ITEMS.filter((item) => {
      // 1. Search Query filter
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.date && item.date.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // 2. Year Tab filter
      if (activeTab === 'All') return true;

      const year = getYear(item.date);
      if (activeTab === 'Older') {
        return year !== null && year < 2018;
      }

      const tabYear = parseInt(activeTab, 10);
      return year === tabYear;
    });
  }, [searchQuery, activeTab]);

  // Slice visible items
  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, activeTab]);

  useReveal('.reveal');

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setIsLoadingMore(false);
    }, 600); // 600ms load-more delay
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const yearTabs = ['All', '2022', '2021', '2020', '2019', '2018', 'Older'];

  return (
    <>
      <PageHero
        eyebrow="News & Press"
        title="Studio News."
        sub="Stay informed with the latest exhibitions, award wins, studio updates, and project highlights from SOGANI Design Studio."
      />

      <section className="section news-section">
        <div className="wrap">
          <div className="news-section__inner">
            
            {/* Search, Filter & Layout Bar */}
            <div className="news-filters">
              <div className="news-years-tabs">
                {yearTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`news-year-tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="news-controls-right">
                {/* Search */}
                <div className="news-search-container">
                  <i className="fa-solid fa-magnifying-glass news-search-icon"></i>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="news-search-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Layout Selector */}
                <div className="news-layout-toggles">
                  <button
                    className={`news-layout-btn ${layoutMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setLayoutMode('grid')}
                    title="Grid View"
                  >
                    <i className="fa-solid fa-grip"></i>
                  </button>
                  <button
                    className={`news-layout-btn ${layoutMode === 'large' ? 'active' : ''}`}
                    onClick={() => setLayoutMode('large')}
                    title="Large Card View"
                  >
                    <i className="fa-solid fa-square-full" style={{ fontSize: '11px' }}></i>
                  </button>
                  <button
                    className={`news-layout-btn ${layoutMode === 'list' ? 'active' : ''}`}
                    onClick={() => setLayoutMode('list')}
                    title="List View"
                  >
                    <i className="fa-solid fa-list"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Grid */}
            {visibleItems.length > 0 ? (
              <div className={`news-grid news-grid--${layoutMode}`}>
                {visibleItems.map((item, index) => (
                  <NewsCard
                    item={item}
                    key={`${item.title}-${index}`}
                    onClick={() => setActiveModalItem(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="news-empty">
                <h3>No articles found</h3>
                <p>Try refining your search query or choosing a different filter.</p>
              </div>
            )}

            {/* Pagination / Load More */}
            {filteredItems.length > visibleCount && (
              <div className="news-pagination">
                <button 
                  className="news-load-more" 
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  style={{ opacity: isLoadingMore ? 0.75 : 1, cursor: isLoadingMore ? 'not-allowed' : 'pointer' }}
                >
                  {isLoadingMore ? (
                    <>
                      Loading <i className="fa-solid fa-spinner fa-spin"></i>
                    </>
                  ) : (
                    <>
                      Load More Stories <i className="fa-solid fa-chevron-down"></i>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Fullscreen Showcase Modal */}
      <NewsModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />
    </>
  );
}
