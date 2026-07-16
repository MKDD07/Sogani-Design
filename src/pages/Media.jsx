import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "../components/PageHero.jsx";
import useReveal from "../hooks/useReveal.js";
import "../styles/media.css";
import useDocumentMetadata from "../hooks/useDocumentMetadata.js";

gsap.registerPlugin(ScrollTrigger);

const PRESS_ITEMS = [
  {
    title: "Vibhor Sogani: Celebrated Artist & Sculptor | Jindal Stainless",
    date: "2023",
    img: "https://sogani.design/wp-content/uploads/2023/12/WhatsApp-Image-2023-11-28-at-12.12.26_675579f9-300x252.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2023/12/Vibhor-Sogani-Interview-Jindal-Stainless.pdf",
  },
  {
    title: "Commune",
    date: "2023",
    img: "https://sogani.design/wp-content/uploads/2023/12/Commune-1-236x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2023/12/Commune-1.pdf",
  },
  {
    title: "Nebula",
    date: "2023",
    img: "https://sogani.design/wp-content/uploads/2023/12/WhatsApp-Image-2023-11-28-at-11.16.04_5487cd6b-296x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2023/12/Nebula.pdf",
  },
  {
    title: "PM Vishwakarma",
    date: "2023",
    img: "https://sogani.design/wp-content/uploads/2023/12/WhatsApp-Image-2023-11-28-at-11.20.21_fbe65142-237x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2023/12/PM-Vishwakarma.pdf",
  },
  {
    title: "IFJ Collector\u2019s Edition",
    date: "2022",
    img: "https://sogani.design/wp-content/uploads/2022/10/WhatsApp-Image-2022-10-28-at-12.56.45-219x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2022/10/IFJ-Collector-Editon.pdf",
  },
  {
    title: "Moulded Magic",
    date: "2022",
    img: "https://sogani.design/wp-content/uploads/2022/10/WhatsApp-Image-2022-10-28-at-12.57.06-212x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2022/10/Moulded-Magic.pdf",
  },
  {
    title: "The New Indian Express",
    date: "Novemeber 2020",
    img: "https://sogani.design/wp-content/uploads/2022/01/Picture6-256x300.png",
    pdf: "",
  },
  {
    title: "IANSLife.in",
    date: "2020",
    img: "https://sogani.design/wp-content/uploads/2022/01/Picture5-213x300.png",
    pdf: "",
  },
  {
    title: "Architecture+Design",
    date: "September 2020",
    img: "https://sogani.design/wp-content/uploads/2022/01/Picture4-212x300.jpg",
    pdf: "",
  },
  {
    title: "A1 Lighting, UK, Cover feature",
    date: "March 2020",
    img: "https://sogani.design/wp-content/uploads/2020/05/andaz-cover-web-216x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/05/03-Cover-Story-UK-A1-Lighting-web-1.pdf",
  },
  {
    title: "Digital Journal",
    date: "February 2020",
    img: "https://sogani.design/wp-content/uploads/2020/03/Sogani_Aroma_Digital-Journal-212x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/03/Sogani_Aroma_Digital-Journal.jpg",
  },
  {
    title: "ELLE",
    date: "February 2020",
    img: "https://sogani.design/wp-content/uploads/2020/03/Sogani_Elle-212x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/03/Sogani_Elle.jpg",
  },
  {
    title: "Digital Journal",
    date: "February 2020",
    img: "https://sogani.design/wp-content/uploads/2020/03/Joy_Sogani_DJ-212x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/03/Joy_Sogani_DJ.jpg",
  },
  {
    title: "Hotelier India",
    date: "February 2020",
    img: "https://sogani.design/wp-content/uploads/2020/03/Vibhor-Sogani-Studio-Hotelier-India-Feb-2020-227x300.png",
    pdf: "https://sogani.design/wp-content/uploads/2020/03/Sogani_HotelierIndia_Feb20.pdf",
  },
  {
    title: "A1 Lighting",
    date: "February 2020",
    img: "https://sogani.design/wp-content/uploads/2020/03/A1-Lighting-Vibhor-Sogani-1-227x300.png",
    pdf: "https://sogani.design/wp-content/uploads/2020/03/A1Lighting_SOGANI_Aroma_Feb20.pdf",
  },
  {
    title: "IFJ",
    date: "February 2020",
    img: "https://sogani.design/wp-content/uploads/2020/03/IFJ-01-259x300.png",
    pdf: "https://sogani.design/wp-content/uploads/2020/03/02-feb-Vibhor-Sogani_IFJ_Feb20_compressed.pdf",
  },
  {
    title: "Joy Art Soul Life",
    date: "December 2019",
    img: "https://sogani.design/wp-content/uploads/2020/02/Joy_Art_Soul_Life_Vibhor_Sogani-300x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/02/Joy_Art_Soul_Life_Vibhor_Sogani_compressed.pdf",
  },
  {
    title: "Aroma Darc",
    date: "December 2019",
    img: "https://sogani.design/wp-content/uploads/2020/02/Aroma_Darc_December_2019-300x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/02/Aroma_Darc_December_19_compressed.pdf",
  },
  {
    title: "A1 Lighting",
    date: "November 2019",
    img: "https://sogani.design/wp-content/uploads/2020/02/Sogani_A1Lighting_November-300x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/02/Sogani_A1Lighting_November_compressed.pdf",
  },
  {
    title: "Living ETC",
    date: "November 2019",
    img: "https://sogani.design/wp-content/uploads/2020/02/Living_Etc_Sogani_Nov-300x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/02/Living_Etc_Sogani_Nov.pdf",
  },
  {
    title: "Joy of life",
    date: "december 2019",
    img: "https://sogani.design/wp-content/uploads/2020/09/joy-of-life-300x204.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/09/joy-.pdf",
  },
  {
    title: "Ideal Home",
    date: "October 2019",
    img: "https://sogani.design/wp-content/uploads/2019/12/Ideal-Home-300x233.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2019/12/Ideal-Home-Garden_Sogani_October.pdf",
  },
  {
    title: "Hotelier India",
    date: "October 2019",
    img: "https://sogani.design/wp-content/uploads/2019/12/Hotelier-India-220x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2019/12/Hotelier-India_Sogani_October.pdf",
  },
  {
    title: "Interiors & Decor",
    date: "September 2019",
    img: "https://sogani.design/wp-content/uploads/2020/06/2019-Sogani_InteriorsDecor_September19-1-212x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-Sogani_InteriorsDecor_September19.pdf",
  },
  {
    title: "India Today Home",
    date: "September 2019",
    img: "https://sogani.design/wp-content/uploads/2019/07/India-Today-Home-294x300.png",
    pdf: "https://sogani.design/wp-content/uploads/2019/12/Sogani_India-Today-Home_September.pdf",
  },
  {
    title: "Architecture+Design",
    date: "September 2019",
    img: "https://sogani.design/wp-content/uploads/2019/12/Architecture-Design-226x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2019/12/Joy_ArchitectureDesign.pdf",
  },
  {
    title: "IFJ Sogani_furniture",
    date: "August 2019",
    img: "https://sogani.design/wp-content/uploads/2020/06/2019-aug-IFJ-Sogani_furniture-cover--300x262.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-aug-IFJ-Sogani_furniture.pdf",
  },
  {
    title: "Wallpaper*",
    date: "August 2019",
    img: "https://sogani.design/wp-content/uploads/2019/12/Wallpaper_Joy-300x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2019/12/Wallpaper_Joy.jpg",
  },
  {
    title: "IFJ Magazine",
    date: "August 2019",
    img: "https://sogani.design/wp-content/uploads/2019/08/IFJ-Magazine-300x278.png",
    pdf: "https://sogani.design/wp-content/uploads/2019/12/VibhorSogani_IFJ_August2019_compressed-1.pdf",
  },
  {
    title: "Dainik Bhaskar",
    date: "July 2019",
    img: "https://sogani.design/wp-content/uploads/2020/06/2019-Dainik-Bhaskar-Hindi-300x206.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-Dainik-Bhaskar-Hindi-1.jpg",
  },
  {
    title: "Asian Age",
    date: "July 2019",
    img: "https://sogani.design/wp-content/uploads/2019/12/Asian-Age-June-2019-256x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2019/12/asian-age-june-2019.pdf",
  },
  {
    title: "The Hinge",
    date: "June 2019",
    img: "https://sogani.design/wp-content/uploads/2019/06/The-Hinge-Mock-Up-300x228.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/06/The-Hinge_Through-the-Depths-compressed.pdf",
  },
  {
    title: "Luxebook",
    date: "June 2019",
    img: "https://sogani.design/wp-content/uploads/2019/06/Luxebook_Mockup-300x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/06/SOGANI_Luxebook_June-2019_compressed.pdf",
  },
  {
    title: "Phaidon cover",
    date: "June 2019",
    img: "https://sogani.design/wp-content/uploads/2020/06/2019-June-phaidon-cover-2019-201x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-June-Sprouts_Phaidon-Destination-Art-1.pdf",
  },
  {
    title: "Architecture+Design",
    date: "May 2019",
    img: "https://sogani.design/wp-content/uploads/2019/05/Architecture-Design-300x169.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/05/SOGANI_Lights_ArchitectureDesign-May-2019-1.pdf",
  },
  {
    title: "Hindustan Times- Gurugram",
    date: "May 2019",
    img: "https://sogani.design/wp-content/uploads/2019/06/Vibhor-Sogani_HT-Gurugram_May-212x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2019/12/hindustan-times-gurgaon-may-2019.pdf",
  },
  {
    title: "The Tribune",
    date: "May 2019",
    img: "https://sogani.design/wp-content/uploads/2019/06/The-Tribune_Vibhor-Sogani-300x153.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/06/The-Tribune_Vibhor-Sogani_compressed.pdf",
  },
  {
    title: "Patriot",
    date: "May 2019",
    img: "https://sogani.design/wp-content/uploads/2019/06/The-Patriot-195x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/06/The-Patriot.pdf",
  },
  {
    title: "Better Interiors",
    date: "May 2019",
    img: "https://sogani.design/wp-content/uploads/2019/06/Better-Interiors-Mock-Up-2-5-300x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/06/Better-Interiors_Through-the-Depths_June-2019.pdf",
  },
  {
    title: "The Sunday Gaurdian",
    date: "May 2019",
    img: "https://sogani.design/wp-content/uploads/2020/06/2019-May-The-Sunday-Gaurdian_JOY-272x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-May-The-Sunday-Gaurdian_JOY-1.jpg",
  },
  {
    title: "Architecture Update",
    date: "May 2019",
    img: "https://sogani.design/wp-content/uploads/2019/05/Architecture-Update_May-2019.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/06/Architecture-Update_SOGANI_May-2019.pdf",
  },
  {
    title: "The Hindu, Delhi Metro",
    date: "April  2019",
    img: "https://sogani.design/wp-content/uploads/2019/10/2019-April-_The-Hindu-Delhi-Metro-300x212.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-April-_The-Hindu-Delhi-Metro.jpg",
  },
  {
    title: "New Indian Express",
    date: "March 2019",
    img: "https://sogani.design/wp-content/uploads/2019/03/IMG-20161207-WA0012-225x300.jpg",
    pdf: "http://www.newindianexpress.com/cities/delhi/2019/mar/27/public-art-can-add-joy-to-life--life-to-a-dull-space-1956514.html",
  },
  {
    title: "The Morning Standard",
    date: "March 2019",
    img: "https://sogani.design/wp-content/uploads/2020/06/2019-MArch-The-Morning-Standard-27-03-2019-page-4-cover-300x243.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-MArch-The-Morning-Standard-27-03-2019-page-4.jpg",
  },
  {
    title: "The Pioneer Authored Piece",
    date: "March 2019",
    img: "https://sogani.design/wp-content/uploads/2019/03/2019-March-The-Pioneer_Authored-Piece___-248x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-March-The-Pioneer_Authored-Piece.jpg",
  },
  {
    title: "The Statesman",
    date: "February 2019",
    img: "https://sogani.design/wp-content/uploads/2019/03/The-Statesman-February-2019-pdf-300x264.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/03/The-Statesman-February-2019.pdf",
  },
  {
    title: "Archello",
    date: "February 2019",
    img: "https://sogani.design/wp-content/uploads/2019/03/hero-1-300x263.jpg",
    pdf: "https://archello.com/project/sprouts",
  },
  {
    title: "Archello",
    date: "February 2019",
    img: "https://sogani.design/wp-content/uploads/2019/03/IMG_1733-300x225.jpg",
    pdf: "https://archello.com/project/through-the-depths",
  },
  {
    title: "A1 Lighting Magazine",
    date: "February 2019",
    img: "https://sogani.design/wp-content/uploads/2019/03/hero-300x150.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/03/A1-Lighting-Mag_Feb-2019-1.pdf",
  },
  {
    title: "The Pioneer",
    date: "Feb 2019",
    img: "https://sogani.design/wp-content/uploads/2020/06/2019-Feb-The-Pioneer_February-1-300x88.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-Feb-The-Pioneer_February-00001.jpg",
  },
  {
    title: "A1 lighting",
    date: "Feb 2019",
    img: "https://sogani.design/wp-content/uploads/2020/06/2019-Feb-A1-lightinghero-300x150.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-Feb-A1-lightinghero_compressed.pdf",
  },
  {
    title: "Home and Design Trends",
    date: "January 2019",
    img: "https://sogani.design/wp-content/uploads/2019/03/Hero-300x255.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-Home-design-trnds-Tanzania-Vibhor-Sogani_compressed.pdf",
  },
  {
    title: "Surfaces Reporter",
    date: "January 2019",
    img: "https://sogani.design/wp-content/uploads/2019/02/surfaces-reporter-300x188.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/Surfaces-Reporter_Jan-2019.pdf",
  },
  {
    title: "India Today Home",
    date: "January 2019",
    img: "https://sogani.design/wp-content/uploads/2019/02/india-today-home-01-300x169.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/India-Today-Home_Jan-2019_Light-First.pdf",
  },
  {
    title: "Houzz",
    date: "January 2019",
    img: "https://sogani.design/wp-content/uploads/2019/02/houzz-284x300.jpg",
    pdf: "https://www.houzz.in/magazine/indias-top-designers-predict-the-big-decor-trends-of-2019-stsetivw-vs~117061016",
  },
  {
    title: "Architectural Digest",
    date: "January 2019",
    img: "https://sogani.design/wp-content/uploads/2019/02/architectural-digest-227x300.jpg",
    pdf: "",
  },
  {
    title: "The Statesman",
    date: "Jan 2019",
    img: "https://sogani.design/wp-content/uploads/2020/06/2019-Jan-The-Statesman-10-January-2019-1-300x66.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2019-Jan-The-Statesman-10-January-2019-001.jpg",
  },
  {
    title: "Exotica",
    date: "December 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/exotica-225x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/Exotica_Vibhor-Sogani.pdf",
  },
  {
    title: "Elle Decor",
    date: "December 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/elle-decor-300x150.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/Elle-Decor_Dec-Jan-2019.pdf",
  },
  {
    title: "Asian Age",
    date: "December 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/asian-age-164x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/asian-age-december-2018.jpg",
  },
  {
    title: "Asian Age",
    date: "December 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/asian-age-01-261x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/asian-age-6th-december-2018.jpg",
  },
  {
    title: "Lighting India",
    date: "December 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/Lighting-India-01-300x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/Lighting-India-NovDec-17-vibhor.pdf",
  },
  {
    title: "The Pioneer",
    date: "November 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/the-pioneer-282x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/the-pioneer-big.jpg",
  },
  {
    title: "Living Etc",
    date: "November 2018",
    img: "https://sogani.design/wp-content/uploads/2018/11/living-etc-230x300.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/06/Living-Etc_Feb-2018.pdf",
  },
  {
    title: "Architecure Design",
    date: "Oct  2018",
    img: "https://sogani.design/wp-content/uploads/2020/04/2018-oct-Architecure-Design-_Oct_Fern_Page_1-223x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2018-oct-Architecure-Design-_Oct_Fern_Page_2-z.jpg",
  },
  {
    title: "Whats Up Germany",
    date: "October 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/whats-up-germany-192x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/WhatsupGermany.pdf",
  },
  {
    title: "Inside Outside",
    date: "October 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/inside-outside-300x266.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/IO_Sogani_Oct.pdf",
  },
  {
    title: "Ad design show",
    date: "Oct 2018",
    img: "https://sogani.design/wp-content/uploads/2020/07/screencapture-architecturaldigest-in-content-ad-design-show-mumbai-exhibitor-lighting-sogani-vibhor-sogani-2020-07-zz13-12_32_20-1.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/screencapture-architecturaldigest-in-content-ad-design-show-mumbai-exhibitor-lighting-sogani-vibhor-sogani-2020-07-13-12_32_20-1.jpg",
  },
  {
    title: "India Today Home",
    date: "September 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/india-today-home-300x300.jpg",
    pdf: "https://www.indiatoday.in/magazine/supplement/story/20181001-let-it-glow-1345591-2018-09-21",
  },
  {
    title: "Architect\u2019s Diary",
    date: "September 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/architects-diary-300x210.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/ar-diary.pdf",
  },
  {
    title: "A1 Lighting Magazine",
    date: "September 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/a1-lighting-india-288x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2018-A1-Lighting.jpg",
  },
  {
    title: "G Town",
    date: "Sep 2018",
    img: "https://sogani.design/wp-content/uploads/2020/06/2018-Sept-G-Town-1-232x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2018-Sept-G-Town-1_compressed.pdf",
  },
  {
    title: "Architectural & Builder Magazine",
    date: "Sep 2018",
    img: "https://sogani.design/wp-content/uploads/2020/06/2018-Sept-Architectural-Builder-Magazone-Studio_ABM-1-225x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2018-Sept-Architectural-Builder-Magazone-Studio_ABM.pdf",
  },
  {
    title: "Darc",
    date: "September 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/darc-01-300x227.jpg",
    pdf: "https://issuu.com/mondiale/docs/da27_digital_issuu/a/57888",
  },
  {
    title: "Architectura Digest",
    date: "Sept 2018",
    img: "https://sogani.design/wp-content/uploads/2020/06/2018-sept-Architectura-Digest-hero-1-228x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2018-sept-AD-Design-Show-Special_Page_2.pdf",
  },
  {
    title: "Mail Today",
    date: "August 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/mail-today-300x265.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/Mail-Today-August-2018.jpg",
  },
  {
    title: "iDecorama",
    date: "August 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/idecorama-300x241.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/iDecorama_Aug-2018_Sogani.pdf",
  },
  {
    title: "Mondo",
    date: "August 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/mondo-01-1-300x232.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2018-aug-mondo.jpg",
  },
  {
    title: "LD+A",
    date: "August 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/lda-01-300x185.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/LDA_August-2018.pdf",
  },
  {
    title: "Architecture Asia",
    date: "Third Quarter, 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/architecture-asia-300x215.jpg",
    pdf: "http://www.architectureasia.co/magazine/2018-02/#page=78",
  },
  {
    title: "VM&RD",
    date: "July 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/VMRD-300x210.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/VMRD-JULY-2018.pdf",
  },
  {
    title: "Insite",
    date: "July 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/insite-300x277.jpg",
    pdf: "",
  },
  {
    title: "Good Homes",
    date: "July 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/good-home-200x300.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/06/2020-26-April-GoodHomes-1.jpg",
  },
  {
    title: "Architonic",
    date: "July 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/architonic-300x247.jpg",
    pdf: "https://www.architonic.com/en/project/vibhor-sogani-sprouts/5106189",
  },
  {
    title: "CW Interiors",
    date: "July 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/CW-interiors-01-300x251.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/CW-Interiors_July-2018_Focus-Instaglam.pdf",
  },
  {
    title: "Designboom",
    date: "June 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/Designboom-02-1-300x184.jpg",
    pdf: "https://www.designboom.com/art/vibhor-sogani-art-installation-india-06-26-2018/",
  },
  {
    title: "Better Interiors",
    date: "June 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/better-interiors-01-229x300.jpg",
    pdf: "",
  },
  {
    title: "TV Architect",
    date: "May 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/tv-architect-300x294.jpg",
    pdf: "https://www.tvarchitect.com/en/article/sprouts-sculpture-in-delhi-india-by-vibhor-sogani/",
  },
  {
    title: "India Pages",
    date: "May 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/india-pages-300x300.jpg",
    pdf: "https://www.indiapages.in/artist-and-designer-vibhor-sogani-talks-about-his-work-his-inspiration-and-his-journey-ahead-14218.html",
  },
  {
    title: "Midday Cover",
    date: "May 2018",
    img: "https://sogani.design/wp-content/uploads/2020/06/2018-May-26-Midday-cover-a-202x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2018-May-26-Midday-z-a-1.jpg",
  },
  {
    title: "L\u2019Officiel",
    date: "May 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/lofficiel-01-300x256.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/LOfficiel_Vibhor-Sogani_May-2018.pdf",
  },
  {
    title: "Lighting India",
    date: "April 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/lighting-india-300x300.jpg",
    pdf: "http://lightingindia.in/blog/post/id/16032/sogani-showcases-in-high-end-modern-design-lighting-at-light--building-2018",
  },
  {
    title: "Pool",
    date: "Arpil 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/pool-01-300x260.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/Pool-Feature-April-2018.pdf",
  },
  {
    title: "Curve Magazine",
    date: "April 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/curve-01-1-300x210.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/Curve-Magazine.pdf",
  },
  {
    title: "Architecture Live",
    date: "April 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/architecture-live-01-300x200.jpg",
    pdf: "http://architecturelive.in/installation-art-sprouts-at-delhi-by-vibhor-sogani/",
  },
  {
    title: "Architect and Interiors India",
    date: "April 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/architect-interiors-india-2018-300x215.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/Architects-and-Interiors-India_April-2018.pdf",
  },
  {
    title: "Sunday Mid-day",
    date: "March 2018",
    img: "https://sogani.design/wp-content/uploads/2020/06/2018-March-Sunday-Mid-day-253x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2018-March-Sunday-Mid-day-1.jpg",
  },
  {
    title: "DNA Ahmedabad",
    date: "March 2018",
    img: "https://sogani.design/wp-content/uploads/2020/06/2018-March-DNA-Ahmedabad-144x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2018-March-DNA-Ahmedabad.jpg",
  },
  {
    title: "World Architecture Community",
    date: "March, 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/wac-01-300x223.jpg",
    pdf: "https://worldarchitecture.org/architecture-news/cmppe/the_first_indian_designer_lighting_brand_makes_mark_at_light_building_2018_in_frankfurt.html",
  },
  {
    title: "The Sunday Standard",
    date: "March 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/the-sunday-standard-01-300x227.jpg",
    pdf: "http://epaper.thesundaystandard.com/1591618/The-Sunday-Standard-Magazine-Delhi/25-03-2018#page/11/2",
  },
  {
    title: "New Indian Express",
    date: "March 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/new-indian-express01-300x218.jpg",
    pdf: "http://www.newindianexpress.com/lifestyle/fashion/2018/mar/24/spreading-the-light-1791078.html",
  },
  {
    title: "Mint",
    date: "March 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/mint-01-300x223.jpg",
    pdf: "https://www.livemint.com/Leisure/Q4dGl0vLmGBCZKiTygfrQN/Vibhor-Sogani-sees-the-light.html",
  },
  {
    title: "Harper\u2019s Bazaar",
    date: "March 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/harpers-01-258x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/BAZAAR_Art11_010-11.pdf",
  },
  {
    title: "Fubiz",
    date: "March 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/fubiz-01-275x300.jpg",
    pdf: "http://www.fubiz.net/2018/03/14/captivating-steel-installation-by-vibhor-sogani/",
  },
  {
    title: "Architecture+Design",
    date: "March 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/arch-design-01-259x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/AD-FEATURE.pdf",
  },
  {
    title: "So Delhi",
    date: "March 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/so-delhi-01-300x202.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2018-So-Delhi.pdf",
  },
  {
    title: "Architects & Interiors India",
    date: "February 2018",
    img: "https://sogani.design/wp-content/uploads/2018/02/2018-Feb-Architects-Interiors-India_Steel-Story_-Feb-2018_Page-c_4-pdf-225x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2018-Feb-Architects-Interiors-India_Steel-Story_-Feb-2018_Page_4.jpg",
  },
  {
    title: "Living Etc",
    date: "February 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/living-etc-01-300x200.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/02/Living-Etc_Feb-2018.pdf",
  },
  {
    title: "Designboom",
    date: "January 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/Designboom-01-300x184.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/jan-2018-design-boom.pdf",
  },
  {
    title: "Contemporist",
    date: "January 2018",
    img: "https://sogani.design/wp-content/uploads/2019/02/Contemporist-01-275x300.jpg",
    pdf: "http://www.contemporist.com/vibhor-sogani-kalpavriksha-the-wish-fulfilling-tree/",
  },
  {
    title: "Lighting India",
    date: "December 2017",
    img: "https://sogani.design/wp-content/uploads/2020/06/2017-dec-Lighting-India-NovDec-17-vibhor-1-cover-231x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2017-dec-Lighting-India-NovDec-17-vibhor.pdf",
  },
  {
    title: "Elle Decor",
    date: "Oct 2017",
    img: "https://sogani.design/wp-content/uploads/2020/07/2017-oct-Elle-Decor-cover-300x105.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2017-oct-Elle-Decor.jpg",
  },
  {
    title: "Architect and Interiors India",
    date: "July 2017",
    img: "https://sogani.design/wp-content/uploads/2020/06/architect-and-interior-india-218x300.jpg",
    pdf: "http://www.vibhorsogani.com/wp-content/uploads/2019/04/100-ad.jpg",
  },
  {
    title: "Art Culture Festival",
    date: "2017",
    img: "https://sogani.design/wp-content/uploads/2020/07/cover-300x218.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/Mahatma-in-Me-by-Vibhor-Sogani-Art-Culture-Festival.pdf",
  },
  {
    title: "Trends",
    date: "2017",
    img: "https://sogani.design/wp-content/uploads/2020/07/2017-Trends-Sogani-only-2-300x122.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2017-Trends-Sogani-only-1.jpg",
  },
  {
    title: "Elle Decor",
    date: "2017",
    img: "https://sogani.design/wp-content/uploads/2020/07/2017-Elle-Decor-1-300x170.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2017-Elle-Decor-Sogani-only-2.jpg",
  },
  {
    title: "ID Journal",
    date: "June 2017",
    img: "https://sogani.design/wp-content/uploads/2020/07/2017-June-ID-Journal-2-203x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2017-June-ID-Journal-1.jpg",
  },
  {
    title: "Gurgaon Times",
    date: "October 2016",
    img: "https://sogani.design/wp-content/uploads/2019/04/hero-3-300x141.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2016-Times-of-India-Press-gandhi-delhi.jpg",
  },
  {
    title: "Hindusatan Times",
    date: "Oct. 2016",
    img: "https://sogani.design/wp-content/uploads/2020/07/hindusatan-times-300x52.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/hindusatan-times-oct-2016.pdf",
  },
  {
    title: "The Hindu",
    date: "October 2016",
    img: "https://sogani.design/wp-content/uploads/2019/04/Hindu-03.10.2016-300x244.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/Hindu-03.10.2016.jpg",
  },
  {
    title: "Spice Route",
    date: "Sept 2016",
    img: "https://sogani.design/wp-content/uploads/2020/07/2016-Sept-Spice-Route-2-230x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2016-Sept-Spice-Route-2.pdf",
  },
  {
    title: "Deccan Herald",
    date: "Sept. 2016",
    img: "https://sogani.design/wp-content/uploads/2020/07/2016-sept-29-Deccan-Herald-2-199x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2016-sept-29-Deccan-Herald-1.jpg",
  },
  {
    title: "Deccan Herald",
    date: "2016",
    img: "https://sogani.design/wp-content/uploads/2020/07/2016-Deccan-Herald-228x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2016-Deccan-Herald-1.jpg",
  },
  {
    title: "India Today Home",
    date: "June 2016",
    img: "https://sogani.design/wp-content/uploads/2020/07/2016-June-India-Today-Home-2-215x300.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/2016-June-India-Today-Home-1.jpg",
  },
  {
    title: "The Telegraph",
    date: "January 2016",
    img: "https://sogani.design/wp-content/uploads/2019/04/The-Telegraph-Graphiti-31st-January-2016-300x202.jpg",
    pdf: "",
  },
  {
    title: "The Weekend West",
    date: "October 2016",
    img: "https://sogani.design/wp-content/uploads/2019/04/West-Australian-Newspaper-263x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2016-Weekend-Post-Australia-press-gandhi-australia.jpg",
  },
  {
    title: "Millionaire Asia",
    date: "April 2016",
    img: "https://sogani.design/wp-content/uploads/2019/04/Millionaire-Asia-300x235.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2016-Millionaire-Asia-March-April16-Pg-48-49.jpg",
  },
  {
    title: "Better Interiors",
    date: "April 2016",
    img: "https://sogani.design/wp-content/uploads/2019/04/Better-Interiors-April-2016-pg-12-300x209.jpg",
    pdf: "",
  },
  {
    title: "Elle Decor",
    date: "March 2016",
    img: "https://sogani.design/wp-content/uploads/2019/03/Elle-Decor-March-2016-209x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/Elle-Decor-March-2016-Pg-122.jpg",
  },
  {
    title: "Black Book",
    date: "March 2016",
    img: "https://sogani.design/wp-content/uploads/2019/03/Hero-1-207x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/Black-Book-March-2016-2.pdf",
  },
  {
    title: "The Financial Express",
    date: "February 2016",
    img: "https://sogani.design/wp-content/uploads/2019/04/The-Financial-Express-7th-February-252x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/The-Financial-Express-7th-February.jpg",
  },
  {
    title: "India Today",
    date: "January 2016",
    img: "https://sogani.design/wp-content/uploads/2019/04/India-Today-January-2016-208x300.jpe",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/India-Today-January-2016-Pg-63.jpe",
  },
  {
    title: "The Statesman",
    date: "Dec 2015",
    img: "https://sogani.design/wp-content/uploads/2020/07/2015-Dec-17-The-Statesman-300x254.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/2015-Dec-17-The-Statesman-1.jpg",
  },
  {
    title: "The Statesman",
    date: "December 2015",
    img: "https://sogani.design/wp-content/uploads/2019/04/The-Statesman-300x254.jpe",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2015-The-Statesman.jpe",
  },
  {
    title: "Asian Age",
    date: "December 2015",
    img: "https://sogani.design/wp-content/uploads/2019/04/The-Sunday-Age-Asian-Age-20th-December-2015-Page-39-247x300.png",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/The-Sunday-Age-Asian-Age-20th-December-2015-Page-39.png",
  },
  {
    title: "Mondo",
    date: "2015",
    img: "",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2015-B-3-Mondo-Arc.pdf",
  },
  {
    title: "Mondo",
    date: "2015",
    img: "https://sogani.design/wp-content/uploads/2020/07/2015-A-Mondo-arc-1-213x300.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/2015-A-Mondo-arc-1.pdf",
  },
  {
    title: "Sandesh Ahemdabad",
    date: "2015",
    img: "https://sogani.design/wp-content/uploads/2019/05/Sandesh-Ahemdabad_2015-171x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/05/Sandesh-Ahemdabad_2015.jpg",
  },
  {
    title: "Mondo",
    date: "2015",
    img: "https://sogani.design/wp-content/uploads/2019/04/Mondo-pdf-300x208.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/04/Mondo.pdf",
  },
  {
    title: "Times of India, Ahmedabad cover",
    date: "Jan 2015",
    img: "https://sogani.design/wp-content/uploads/2020/07/2015-Jan-24-Times-of-India-Ahmedabad-cover--179x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2015-Jan-24-Times-of-India-Ahmedabad.jpg",
  },
  {
    title: "Asian Age",
    date: "December 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Dec-Asian-Age-Sogan-coveri-272x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-Dec-Asian-Age-Sogani.jpg",
  },
  {
    title: "India Today",
    date: "Nov 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Nov-India-Today-Sogani-cover-300x254.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-Nov-India-Today-Sogani-cover-1.jpg",
  },
  {
    title: "Home Review",
    date: "Nov 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Nov-Home-Review-2-300x293.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-Nov-Home-Review-2.pdf",
  },
  {
    title: "CW Interiors",
    date: "Nov 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-nov-CW-Interiors-Sogani-cover-300x210.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-nov-CW-Interiors-Sogani.jpg",
  },
  {
    title: "Neptune Glitz",
    date: "Oct 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Oct-Neptune-Glitz-2-215x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-Oct-Neptune-Glitz-2.pdf",
  },
  {
    title: "Forbes India",
    date: "Oct 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Oct-Forbes-India-202x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-Oct-Forbes-India.pdf",
  },
  {
    title: "Elle Decor",
    date: "Oct 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Oct-Elle-Decor-298x300.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/2014-Oct-Elle-Decor-1.jpg",
  },
  {
    title: "Casaviva",
    date: "Oct 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Oct-Casaviva-cover-300x208.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-Oct-Casaviva.jpg",
  },
  {
    title: "News super fast",
    date: "Sep. 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Sept-Newssuperfast-206x300.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/2014-Sept-Newssuperfast-1.jpg",
  },
  {
    title: "First Report",
    date: "Sept. 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Sept-First-Report-2-196x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-Sept-First-Report-Online-1.pdf",
  },
  {
    title: "Deccan Herald",
    date: "Sept. 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Sept-Deccan-Herald-273x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-Sept-Deccan-Herald-1.jpg",
  },
  {
    title: "Mondo arc",
    date: "2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Mondo-arc-1cover-300x187.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-Mondo-arc-1.pdf",
  },
  {
    title: "Elle Decor",
    date: "May 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-May-Elle-Decor-3-300x177.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-May-Elle-Decor-2.jpg",
  },
  {
    title: "Architecture  Design",
    date: "Jan 2014",
    img: "https://sogani.design/wp-content/uploads/2020/07/2014-Jan-Architecture-Design-cover-1-1-210x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2014-Jan-Architecture-Design-1.pdf",
  },
  {
    title: "Marigold Diary",
    date: "2013",
    img: "https://sogani.design/wp-content/uploads/2020/07/marigold0-300x199.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/Marigold-Diary-2013.jpg",
  },
  {
    title: "nickel japan",
    date: "August 2012",
    img: "https://sogani.design/wp-content/uploads/2020/07/nickel-japan-1-224x300.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/nickel-japan.pdf",
  },
  {
    title: "Star Realty Awards",
    date: "2012",
    img: "https://sogani.design/wp-content/uploads/2020/07/2012-Star-Realty-Awardscover--300x213.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/2012-Star-Realty-Awards.jpg",
  },
  {
    title: "Home Trends",
    date: "2012",
    img: "https://sogani.design/wp-content/uploads/2020/06/home-trends-300x278.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/06/home-trends-Pg-22-1a.pdf",
  },
  {
    title: "Society Interiors",
    date: "2012",
    img: "https://sogani.design/wp-content/uploads/2019/04/HERO-217x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/04/SOCIETY.pdf",
  },
  {
    title: "Elle Decor",
    date: "2011",
    img: "https://sogani.design/wp-content/uploads/2011/04/elle-decor-cover-2011-300x137.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/elle-decor-2011.jpg",
  },
  {
    title: "HT City Brunch",
    date: "February 2011",
    img: "https://sogani.design/wp-content/uploads/2019/04/Picture1-226x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/04/HT-brunch-2011_6_Feb_Brunch_Date_Vibhor_Sogani.pdf",
  },
  {
    title: "Better Interiors",
    date: "January 2011",
    img: "https://sogani.design/wp-content/uploads/2019/04/hero-1-229x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/04/PDF.pdf",
  },
  {
    title: "The Economic Times",
    date: "September 2010",
    img: "https://sogani.design/wp-content/uploads/2019/04/ET-sept-5-2010-article-295x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/economic_times-sept-2010.jpg",
  },
  {
    title: "IFJ",
    date: "July 2010",
    img: "https://sogani.design/wp-content/uploads/2019/04/hero-4-169x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/04/IFJ.pdf",
  },
  {
    title: "Inside Track",
    date: "February 2010",
    img: "https://sogani.design/wp-content/uploads/2019/04/Inside-track-L-199x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/feb-2010-inside_track_2_.jpg",
  },
  {
    title: "Society Interiors",
    date: "March 2010",
    img: "https://sogani.design/wp-content/uploads/2019/04/Hero-218x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/04/Society-Interiors-PDF.pdf",
  },
  {
    title: "Elle Decor",
    date: "March 2010",
    img: "https://sogani.design/wp-content/uploads/2019/04/hero-2-220x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/04/Elle-Decor_pdf.pdf",
  },
  {
    title: "UK Financial Times",
    date: "February 2010",
    img: "https://sogani.design/wp-content/uploads/2019/04/India_Modern_UK_Financial_Times_20_Feb_2010-300x251.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/04/India_Modern_UK_Financial_Times_20_Feb_2010.pdf",
  },
  {
    title: "Good Homes",
    date: "July 2009",
    img: "https://sogani.design/wp-content/uploads/2019/04/bbc-goodhomes-1-235x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2009-bbc-goodhomes-1.jpg",
  },
  {
    title: "Indian Design and Interiors",
    date: "April 2009",
    img: "https://sogani.design/wp-content/uploads/2019/04/IDI0004-225x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2009-Indian-Design-Pg-31-1b-1.jpg",
  },
  {
    title: "Delhi Beat",
    date: "February 2009",
    img: "https://sogani.design/wp-content/uploads/2019/04/Delhi-Beat-209x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2009-Delhi-Beat-Copy.jpg",
  },
  {
    title: "Elle Decor",
    date: "January 2009",
    img: "https://sogani.design/wp-content/uploads/2019/04/hero-206x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/04/pdf.pdf",
  },
  {
    title: "Stainless India",
    date: "December 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-Dec-Stainless-India-2-300x150.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-Dec-Stainless-India-3.jpg",
  },
  {
    title: "Hindustan Times",
    date: "October 2008",
    img: "https://sogani.design/wp-content/uploads/2019/04/ht-122x300.jpg",
    pdf: "",
  },
  {
    title: "Hindustan Times",
    date: "Oct 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-Oct-Hindustan-Times-1-300x78.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-Oct-28-Hindustan-Times.pdf",
  },
  {
    title: "Metro Now",
    date: "Oct 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-oct-16-Metro-Now-cover-300x292.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/2008-oct-16-Metro-Now.jpg",
  },
  {
    title: "Outlook",
    date: "July 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-July-Outlook-2-300x105.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-July-Outlook.jpg",
  },
  {
    title: "Ergo Weekend",
    date: "2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-Ergo-Weekend-cover-300x291.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-Ergo-Weekend.jpg",
  },
  {
    title: "Annual Society Interiors",
    date: "2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-Cover-Page-Annual-Society-Interiors-1-223x300.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/2008-Cover-Page-Society-Interiors.jpg",
  },
  {
    title: "Annual Society Interiors",
    date: "2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-Annual-Society-Interiors-1-300x119.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-Annual-Society-Interiors-1.pdf",
  },
  {
    title: "India Today",
    date: "2008",
    img: "https://sogani.design/wp-content/uploads/2008/06/simply-delhi-India-Today-2008-cover-222x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/simply-delhi-India-Today-2008-cover.pdf",
  },
  {
    title: "Business Standard",
    date: "June 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-June-7-Business-Standard-2-300x157.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-June-7-Business-Standard-1.jpg",
  },
  {
    title: "Better Interiors",
    date: "May 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-May-Better-Interiors-2-300x211.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-May-Better-Interiors-1.jpg",
  },
  {
    title: "Asian Age",
    date: "April 2008",
    img: "https://sogani.design/wp-content/uploads/2019/04/aa-230x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/the-Asian-age.jpg",
  },
  {
    title: "The Times of India",
    date: "2008",
    img: "https://sogani.design/wp-content/uploads/2008/04/times-of-india-cover-300x73.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/times-of-india-2008.jpg",
  },
  {
    title: "New Women\u2019s",
    date: "April 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-April-New-Womens-193x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-April-New-Womens-cover.jpg",
  },
  {
    title: "Mans World",
    date: "April 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-April-Mans-World-2-300x146.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-April-Mans-World-3-1.jpg",
  },
  {
    title: "Elle Decor",
    date: "April 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-April-Elle-Decor-2-300x169.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-April-Elle-Decor-1.jpg",
  },
  {
    title: "The Pioneer",
    date: "March 2008",
    img: "https://sogani.design/wp-content/uploads/2019/04/pioneer-177x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/pioneer.jpg",
  },
  {
    title: "Incredible India",
    date: "March 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-March-Incredible-India-cover-300x123.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-March-Incredible-India.jpg",
  },
  {
    title: "Times of India",
    date: "March 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-March-13-Times-of-India-300x160.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/07/2008-March-13-Times-of-India-2.jpg",
  },
  {
    title: "Indian Express",
    date: "March 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-March-11-Indian-Express-cover-300x297.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-March-11-Indian-Express.jpg",
  },
  {
    title: "The Hindu",
    date: "March 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-March-10-The-Hindu-2-300x141.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-March-10-The-Hindu-1.jpg",
  },
  {
    title: "Economic Times",
    date: "March 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-March-9-Economic-Times-cover-300x94.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-March-9-Economic-Times.jpg",
  },
  {
    title: "Metro Now",
    date: "March 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-March-7-Metro-Now-cover-300x124.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-March-7-Metro-Now.jpg",
  },
  {
    title: "Metro Now",
    date: "February 2008",
    img: "https://sogani.design/wp-content/uploads/2019/04/Metro-now-212x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/Metro-now-2008.jpg",
  },
  {
    title: "First City",
    date: "February 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-Feb-First-City-cover-300x127.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-Feb-First-City.jpg",
  },
  {
    title: "Weekend Planner",
    date: "February 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-feb-29-Weekend-Planner-cover-235x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-feb-29-Weekend-Planner.jpg",
  },
  {
    title: "Time Out",
    date: "February 2008",
    img: "https://sogani.design/wp-content/uploads/2020/07/2008-Feb-26-Time-Out-cover--300x247.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2008-Feb-26-Time-Out-.jpg",
  },
  {
    title: "The Telegraph",
    date: "August 2007",
    img: "https://sogani.design/wp-content/uploads/2020/07/2007-aug-11-The-Telegraph-Sogani-only-219x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2007-aug-11-The-Telegraph-Sogani-only-1.jpg",
  },
  {
    title: "vis-a-vis Newsletter",
    date: "2007",
    img: "https://sogani.design/wp-content/uploads/2020/06/2007-vis-a-vis-Newsletter-sogani-only-2-300x139.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2007-vis-a-vis-Newsletter-sogani-only-1.jpg",
  },
  {
    title: "Times Magazine",
    date: "2007",
    img: "https://sogani.design/wp-content/uploads/2020/07/2007-Times-Magazine-203x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2007-Times-Magazine-1.jpg",
  },
  {
    title: "The Conran",
    date: "2007",
    img: "https://sogani.design/wp-content/uploads/2020/07/2007-The-Conran-sogani-only-300x194.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2007-The-Conran-sogani-only-1.jpg",
  },
  {
    title: "Financial Times",
    date: "July 2007",
    img: "https://sogani.design/wp-content/uploads/2020/07/2007-july-21-Financial-Times-Sogani-only-1-300x141.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2007-july-21-Financial-Times-Sogani-only-2.jpg",
  },
  {
    title: "Art & Design Show",
    date: "2007",
    img: "https://sogani.design/wp-content/uploads/2020/07/2007-Art-DEsign-Show-2-300x178.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2007-Art-DEsign-Show-1.jpg",
  },
  {
    title: "American Craft",
    date: "2007",
    img: "https://sogani.design/wp-content/uploads/2020/07/2007-American-Craft-169x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/07/2007-American-Craft-1.jpg",
  },
  {
    title: "India Today",
    date: "2007",
    img: "https://sogani.design/wp-content/uploads/2019/04/India-Today-pdf-300x220.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2007-India-today-perfect-10b-1.pdf",
  },
  {
    title: "Art India",
    date: "2006",
    img: "https://sogani.design/wp-content/uploads/2020/06/2006-Art-India-300x276.jpeg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2006-Art-India-1.jpeg",
  },
  {
    title: "The Economic Times",
    date: "March 2006",
    img: "https://sogani.design/wp-content/uploads/2020/06/2006-March-26-The-Economic-Times-Sogani-only-300x227.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2006-March-26-The-Economic-Times-Sogani-only-1.jpg",
  },
  {
    title: "HT City",
    date: "March 2006",
    img: "https://sogani.design/wp-content/uploads/2019/04/htcity-138x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/htcity.jpg",
  },
  {
    title: "Delhi Times",
    date: "March 2006",
    img: "https://sogani.design/wp-content/uploads/2019/04/dt-1-300x228.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/dt-1.jpg",
  },
  {
    title: "Business Standard",
    date: "February 2006",
    img: "https://sogani.design/wp-content/uploads/2019/04/DRDO-Pavilion-pdf-232x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/04/DRDO-Pavilion.pdf",
  },
  {
    title: "Hindustan Times",
    date: "Oct 2005",
    img: "https://sogani.design/wp-content/uploads/2020/06/2005-oct-14-Hindustan-Times-103x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2005-oct-14-Hindustan-Times-1.jpg",
  },
  {
    title: "Darpan",
    date: "Oct 2005",
    img: "https://sogani.design/wp-content/uploads/2020/06/2005-oct-Darpan-Sogani-only-1-1-300x172.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2005-oct-Darpan-Sogani-only-1-1.pdf",
  },
  {
    title: "The Indian Express",
    date: "October 2005",
    img: "https://sogani.design/wp-content/uploads/2019/04/TIE-198x300.jpg",
    pdf: "http://www.vibhorsogani.com/wp-content/uploads/2019/04/TIE.jpg",
  },
  {
    title: "Times of India",
    date: "October 2005",
    img: "https://sogani.design/wp-content/uploads/2019/04/hutch-marathon-179x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/hutch-marathon-Oct-2005-hr.jpg",
  },
  {
    title: "Times of India",
    date: "Sep 2005",
    img: "https://sogani.design/wp-content/uploads/2020/06/2005-sept-30-Times-of-India-277x300.jpeg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2005-sept-30-Times-of-India-1.jpeg",
  },
  {
    title: "Today",
    date: "Sep 2005",
    img: "https://sogani.design/wp-content/uploads/2020/06/2005-Sept-26-Today-1-300x169.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2005-Sept-26-Today-1-1.jpg",
  },
  {
    title: "Sportline",
    date: "Sep 2005",
    img: "https://sogani.design/wp-content/uploads/2020/06/2005-sep-30-Sportline-62x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2005-sep-30-Sportline-1.jpg",
  },
  {
    title: "Viva city",
    date: "Sep 2005",
    img: "https://sogani.design/wp-content/uploads/2020/06/2005-sept-5-Viva-city-Sogani-only-256x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2005-sept-5-Viva-city-Sogani-only-1.jpg",
  },
  {
    title: "Pioneer",
    date: "April 2005",
    img: "https://sogani.design/wp-content/uploads/2020/06/2005-april-17-Pioneer-162x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2005-april-17-Pioneer-1.jpg",
  },
  {
    title: "Rajasthan Patrika",
    date: "April 2005",
    img: "https://sogani.design/wp-content/uploads/2020/06/2005-april-17-Rajasthan-Patrika-1-300x155.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2005-april-17-Rajasthan-Patrika-1-1.jpg",
  },
  {
    title: "Rajasthan plus",
    date: "April 2005",
    img: "https://sogani.design/wp-content/uploads/2020/06/2005-april-15-Rajasthan-plus-300x247.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2005-april-15-Rajasthan-plus-1.jpg",
  },
  {
    title: "Hindustan Times",
    date: "Sep 2004",
    img: "https://sogani.design/wp-content/uploads/2020/06/2004-sept-23-Hindustan-Times1-300x43.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2004-Sept-23-Hindustan-Times.jpg",
  },
  {
    title: "The Economic Times",
    date: "Sep 2004",
    img: "https://sogani.design/wp-content/uploads/2020/06/2004-sepr-19-The-Economic-Times-Sogani-only-300x49.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2004-sept-19-The-Economic-Times-Sogani-only.jpg",
  },
  {
    title: "Business Standard",
    date: "August 2004",
    img: "https://sogani.design/wp-content/uploads/2019/04/Business-Standard-2004-300x226.jpg",
    pdf: "http://www.vibhorsogani.com/wp-content/uploads/2019/04/Business-Standard-2004.jpg",
  },
  {
    title: "Incredible India",
    date: "June 2004",
    img: "https://sogani.design/wp-content/uploads/2020/06/2004-June-Incredible-India-Sogani-only-300x166.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2004-June-Incredible-India-Sogani-only-1.pdf",
  },
  {
    title: "Times of India, Rajasthan",
    date: "2004",
    img: "https://sogani.design/wp-content/uploads/2019/05/Times-of-India-Rajasthan_2004-188x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/05/Times-of-India-Rajasthan_2004.jpg",
  },
  {
    title: "Deccan Chronicle",
    date: "April 2004",
    img: "https://sogani.design/wp-content/uploads/2020/06/2004-April-11-Deccan-Chronicle-3-300x54.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2004-April-11-Deccan-Chronicle-2.jpg",
  },
  {
    title: "Rajasthan Patrika",
    date: "April 2004",
    img: "https://sogani.design/wp-content/uploads/2020/06/2004-April-4-Rajasthan-Patrika-300x105.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2004-April-4-Rajasthan-Patrika-2.jpg",
  },
  {
    title: "HT Jaipur Live, Hindustan times",
    date: "2004",
    img: "https://sogani.design/wp-content/uploads/2019/04/HT-Jaipur-300x298.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/HT-Jaipur.jpg",
  },
  {
    title: "The New Sunday Express",
    date: "Apr, 2004",
    img: "https://sogani.design/wp-content/uploads/2020/06/thumbnail-300x286.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2004-29-Feb-The-New-Sunday-Express-.jpg",
  },
  {
    title: "India Today",
    date: "March 2004",
    img: "https://sogani.design/wp-content/uploads/2020/06/2004-March-India-Today-cover1-300x120.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2004-March-India-Today__-1.jpg",
  },
  {
    title: "The Week",
    date: "March 2004",
    img: "https://sogani.design/wp-content/uploads/2019/04/week-216x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/week.jpg",
  },
  {
    title: "Delhi Times",
    date: "March 2004",
    img: "https://sogani.design/wp-content/uploads/2019/04/dt-300x234.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/dt.jpg",
  },
  {
    title: "HT City,Hindustan times",
    date: "March 2004",
    img: "https://sogani.design/wp-content/uploads/2019/04/Ht-300x225.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/Ht.jpg",
  },
  {
    title: "Business Standard",
    date: "March 2004",
    img: "https://sogani.design/wp-content/uploads/2019/04/BS-249x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/BS.jpg",
  },
  {
    title: "Hindustan Times",
    date: "Oct 2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/2003-Oct-19-Hindustan-Times-Sogani-2-300x115.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2003-Oct-19-Hindustan-Times-Sogani-only-2_compressed-1.pdf",
  },
  {
    title: "The IHC Art Journal",
    date: "August 2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/The-IHC-Art-Journal-2003-1-222x300.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/06/The-IHC-Art-Journal-2003-1.jpg",
  },
  {
    title: "Indian Design & Interiors",
    date: "July 2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/2003-July-Indian-Design-Interios-2-Sogani-1-300x121.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2003-July-Indian-Design-Interios-2-Sogani-.pdf",
  },
  {
    title: "Today",
    date: "June 2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/2003-June-5-Today-300x179.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2003-June-5-Today-1.jpg",
  },
  {
    title: "Elle Decor Spring edition",
    date: "2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/2003-Spring-edition-Elle-Sogani-cover-1-232x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2003-Spring-edition-Elle-Sogani-1.jpg",
  },
  {
    title: "Indian Design & Interiors",
    date: "June 2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/2003-june-Indian-DEsign-Interios-1-Sogani-only-2-227x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2003-June-Indian-Design-Interiors-1a-Sogani-only_compressed-1-5.pdf",
  },
  {
    title: "The Pioneer",
    date: "May 2003",
    img: "https://sogani.design/wp-content/uploads/2019/05/The-Pioneer_2003-300x250.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/05/The-Pioneer_2003.jpg",
  },
  {
    title: "Inside Outside",
    date: "May 2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/2003-May-Inside-Outside-Sogani-2-300x167.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2003-May-Inside-Outside-Sogani-1.jpg",
  },
  {
    title: "Hindustan Times",
    date: "May 2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/2003-May-24Hindustan-Times-Sogani-only-300x169.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2003-May-24Hindustan-Times-Sogani-only-1.jpg",
  },
  {
    title: "India Today Plus",
    date: "March 2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/2003-March-India-Today-Plus-1-Sogani-only-1-228x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2003-March-India-Today-Plus-1-Sogani-only-1.jpg",
  },
  {
    title: "India Today Plus",
    date: "March 2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/2003-March-India-Today-Plus-Sogani-only-300x142.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2003-March-India-Today-Plus-1-Sogani-only.jpg",
  },
  {
    title: "Hindustan Times",
    date: "Jan 2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/2003-Jan-28-hindustantimes-1-300x137.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2003-Jan-28-hindustantimes.jpg",
  },
  {
    title: "Society",
    date: "November 2002",
    img: "https://sogani.design/wp-content/uploads/2020/06/2002-Nov-Society-1-300x155.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2002-Nov-Society-2.jpg",
  },
  {
    title: "Hinudstan Times",
    date: "November 2002",
    img: "https://sogani.design/wp-content/uploads/2020/06/2002-Nov-26-Hinudstan-Times-300x239.jpeg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2002-Nov-26-Hinudstan-Times-1.jpeg",
  },
  {
    title: "Design Today",
    date: "August 2003",
    img: "https://sogani.design/wp-content/uploads/2020/06/2003-Aug-Design-Today-Sogani-only-1-246x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2003-Aug-Design-Today-Sogani-only-.pdf",
  },
  {
    title: "Today",
    date: "August 2002",
    img: "https://sogani.design/wp-content/uploads/2020/06/2002-aug-Today-2-300x97.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/06/2002-aug-Today.jpeg",
  },
  {
    title: "Outlook",
    date: "August 2002",
    img: "https://sogani.design/wp-content/uploads/2020/06/2002-Aug-26-Outlook-2-SOGANI-only-cover-300x166.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/06/2002-Aug-26-Outlook-1-SOGANI-only.jpg",
  },
  {
    title: "The Economic Times",
    date: "August 2002",
    img: "https://sogani.design/wp-content/uploads/2020/06/2002-aug-25-The-Economic-Times-1-300x53.jpeg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/06/2002-aug-25-The-Economic-Times-final.jpeg",
  },
  {
    title: "Business Standard",
    date: "August 2002",
    img: "https://sogani.design/wp-content/uploads/2019/04/BS_Hair-raising-Designs-1-208x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/BS_Hair-raising-Designs.jpg",
  },
  {
    title: "Hindustan Times",
    date: "July 2002",
    img: "https://sogani.design/wp-content/uploads/2020/06/2002-july-13-Hindustan-Times__-300x204.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/06/2002-july-13-Hindustan-Times__-1.jpg",
  },
  {
    title: "Design Today",
    date: "June 2002",
    img: "https://sogani.design/wp-content/uploads/2020/06/2002-June-Design-Today-2-SOGANI-only-300x132.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2002-June-Design-Today-1-SOGANI-only.jpg",
  },
  {
    title: "Hindustan Times",
    date: "June 2002",
    img: "https://sogani.design/wp-content/uploads/2020/06/2002-june-1-hindustan-Times-226x300.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/06/2002-june-1-hindustan-Times-1.jpg",
  },
  {
    title: "Design Interiors",
    date: "June 2002",
    img: "https://sogani.design/wp-content/uploads/2019/04/design-_-interiors-3-215x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/2002-design-interiors-1-1.pdf",
  },
  {
    title: "Times of India",
    date: "2002",
    img: "https://sogani.design/wp-content/uploads/2019/05/Times-of-India_2002-236x300.jpg",
    pdf: "http://sogani.design/wp-content/uploads/2019/05/Times-of-India_2002.jpg",
  },
  {
    title: "India Today",
    date: "",
    img: "https://sogani.design/wp-content/uploads/2019/04/1-1-300x225.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/india-today.jpg",
  },
  {
    title: "The Telegraph",
    date: "",
    img: "https://sogani.design/wp-content/uploads/2019/04/Telegraph-267x300.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/Telegraph.jpg",
  },
  {
    title: "The-Financial-Express",
    date: "January 2000",
    img: "https://sogani.design/wp-content/uploads/1999/07/2000-The-Financial-Express-2-1-300x172.jpg",
    pdf: "https://www.vibhorsogani.com/wp-content/uploads/2020/06/2000-The-Financial-Express-2-1.jpg",
  },
  {
    title: "The Business Age",
    date: "July 1999",
    img: "https://sogani.design/wp-content/uploads/2020/06/1999-Asian-Age-The-Business-Age-1-1-300x123.jpg",
    pdf: "https://sogani.design/wp-content/uploads/2020/06/1999-Asian-Age-The-Business-Age-2-1.jpg",
  }
];

const PressCard = ({ item, onOpen }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const badgeRef = useRef(null);
  const overlayRef = useRef(null);

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
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.4, ease: "power2.out" });
    gsap.to(overlayRef.current, { backgroundColor: "rgba(20,18,15,0.35)", duration: 0.25 });
    gsap.to(badgeRef.current, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" });
    gsap.to(cardRef.current, {
      boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
      borderColor: "#d8d0c4",
      duration: 0.25,
    });
  };

  const handleLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(overlayRef.current, { backgroundColor: "rgba(20,18,15,0)", duration: 0.25 });
    gsap.to(badgeRef.current, { autoAlpha: 0, y: 8, duration: 0.22, ease: "power2.out" });
    gsap.to(cardRef.current, {
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      borderColor: "#ececec",
      duration: 0.25,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`press-card${item.pdf ? "" : " press-card--static"}`}
      onClick={() => item.pdf && onOpen(item)}
      onMouseEnter={item.pdf ? handleEnter : undefined}
      onMouseLeave={item.pdf ? handleLeave : undefined}
    >
      <div className="press-card__media">
        <img ref={imgRef} className="press-card__img" src={item.img} alt={item.title} loading="lazy" />
        {item.pdf && (
          <div ref={overlayRef} className="press-card__overlay">
            <div ref={badgeRef} className="press-card__badge">
              <i className="fa-solid fa-magnifying-glass-plus"></i> View PDF
            </div>
          </div>
        )}
      </div>
      <div className="press-card__body">
        <h3 className="press-card__item-title">{item.title}</h3>
        <p className="press-card__date">{item.date}</p>
      </div>
    </div>
  );
};

const PdfModal = ({ item, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closingRef = useRef(false);

  useEffect(() => {
    if (!item) return;
    closingRef.current = false;
    setLoaded(false);

    const isMobile = window.innerWidth <= 768;
    const tl = gsap.timeline({ onComplete: () => setVisible(true) });

    tl.set(overlayRef.current, { autoAlpha: 0 });

    if (isMobile) {
      tl.set(panelRef.current, { autoAlpha: 1, yPercent: 100, scale: 1 });
      tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.25, ease: "power1.out" });
      tl.to(
        panelRef.current,
        { yPercent: 0, duration: 0.45, ease: "power3.out" },
        "-=0.15"
      );
    } else {
      tl.set(panelRef.current, { autoAlpha: 0, scale: 0.92, y: 24, yPercent: 0 });
      tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.22, ease: "power1.out" });
      tl.to(
        panelRef.current,
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.32, ease: "back.out(1.2)" },
        "-=0.1"
      );
    }

    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item]);

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    const isMobile = window.innerWidth <= 768;
    const tl = gsap.timeline({ onComplete: onClose });

    if (isMobile) {
      tl.to(panelRef.current, { yPercent: 100, duration: 0.35, ease: "power3.in" });
      tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.25, ease: "power1.in" }, "-=0.2");
    } else {
      tl.to(panelRef.current, { autoAlpha: 0, scale: 0.92, y: 24, duration: 0.2, ease: "power1.in" });
      tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.18, ease: "power1.in" }, "-=0.1");
    }
  };

  if (!item) return null;

  return (
    <div ref={overlayRef} className="pdf-modal" onClick={handleClose}>
      <div ref={panelRef} className="pdf-modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal__handle-bar" />
        <div className="pdf-modal__header">
          <div className="pdf-modal__heading">
            <i className="fa-regular fa-file-lines" style={{ color: "#8a6b4a", fontSize: "18px" }}></i>
            <div>
              <div className="pdf-modal__title">{item.title}</div>
              <div className="pdf-modal__date">{item.date}</div>
            </div>
          </div>
          <div className="pdf-modal__actions">
            <a className="pdf-modal__link" href={item.pdf} target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-up-right-from-square" style={{ fontSize: "12px" }}></i> Open
            </a>
            <button className="pdf-modal__close" aria-label="Close" onClick={handleClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <div className="pdf-modal__body">
          {!loaded && (
            <div className="pdf-modal__loading">
              <span className="pdf-modal__spinner" />
              Loading document…
            </div>
          )}
          <iframe
            title={item.title}
            src={`${item.pdf}#toolbar=0&navpanes=0`}
            onLoad={() => setLoaded(true)}
            className={`pdf-modal__frame${loaded ? " pdf-modal__frame--loaded" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default function Media() {
  useDocumentMetadata({
    title: 'Publications & Editorial Features | SOGANI Studio',
    description: 'Explore international design publications, editorial covers, and press reviews showcasing Vibhor Sogani\'s bespoke lighting installations.',
    keywords: 'design publications, architecture press, lighting designer interviews, press features, SOGANI media coverage, art magazines',
    canonicalUrl: 'https://sogani.design/media/'
  });

  const [active, setActive] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  useReveal(".reveal");

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (window.lenis) window.lenis.start();
    };
  }, [active]);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setIsLoadingMore(false);
    }, 600); // 600ms premium loading transition
  };

  return (
    <>
      <PageHero
        eyebrow="Press"
        title="Media Coverage."
        sub="A selection of publications, reviews, features, and interviews detailing the artistic vision and studio collections of Vibhor Sogani."
      />

      <section className="section press-section">
        <div className="wrap">
          <div className="press-section__inner">
            <div className="press-section__grid">
              {PRESS_ITEMS.slice(0, visibleCount).map((item, index) => (
                <PressCard key={`${item.title}-${index}`} item={item} onOpen={setActive} />
              ))}
            </div>

            {/* Pagination / Load More */}
            {PRESS_ITEMS.length > visibleCount && (
              <div className="press-pagination">
                <button 
                  className="press-load-more" 
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
                      Load More Press <i className="fa-solid fa-chevron-down"></i>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <PdfModal item={active} onClose={() => setActive(null)} />
    </>
  );
}

