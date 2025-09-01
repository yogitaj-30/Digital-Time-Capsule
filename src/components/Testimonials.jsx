import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const testimonials = [
    {
        name: "Millie Morgan",
        role: "Digital Artist",
        verified: true,
        rating: 5,
        text: "The idea of writing something now and unlocking it later is genius. I used it to leave messages for my younger brother for when he turns 18.",
        img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Jay Kumar",
        role: "Campaign Lead",
        verified: true,
        rating: 4,
        text: "I love how this app lets me store little letters and photos for my future self. I set one to open on my graduation day, and just imagining reading it then makes me so excited",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Oliver",
        role: "Social Media Manager",
        verified: true,
        rating: 5,
        text: "My partner and I write capsules for anniversaries and future birthdays. Honestly, it feels like reliving memories in the most special way. Highly recommend for anyone in a relationship",
        img: "https://randomuser.me/api/portraits/men/68.jpg",
    },
    {
        name: "Kendal Moray",
        role: "Cook",
        verified: true,
        rating: 5,
        text: "The interface is clean and easy to use. Definitely a unique concept compared to other journaling apps. Reading old letters has been such an emotional experience.",
        img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcB-hRzrCE9DlRC-he_nUraqxPlX_2swhYzl8cHK7DCd357mdbVnOgzy8y-x9D8X25oP3yPQUHl7waZisAVZ8eOav9LL1VwoekeMXYMQ1619jJPHvRSjWUC5QBxAHDvq8jn9Uocb2JDu0/s600/225879865_1428774470835258_1658334629495327293_n.jpg",
    },
    {
        name: "Lilly Orlando",
        role: "Beauty Influencer",
        verified: true,
        rating: 4,
        text: "I opened my first capsule today that I had written 6 months ago when I was going through a tough time. Reading it now made me realize how far I’ve come. This app is more than just a tool—it’s therapy in disguise. Thank you!",
        img: "https://thumb.photo-ac.com/7d/7db3223c0572014463c4c21533c97d4a_t.jpeg",
    },
    {
        name: "Jack Pitt",
        role: "Guitarist",
        verified: true,
        rating: 5,
        text: "I used this app with my students as a class project—we all wrote capsules about our goals for the year. Seeing their excitement about opening them later was priceless. Great educational tool too.",
        img: "https://thumb.photo-ac.com/73/7378cd713c7d0b6992f019245245aacd_t.jpeg",
    },
];

function Testimonials() {
    return (
        <section className="flex flex-col items-center justify-center px-6 py-16 bg-white">
            <h1 className="mb-10 bg-gradient-to-r from-purple-900 via-indigo-900 to-black bg-clip-text text-transparent text-3xl md:text-4xl font-bold">
                What our users say about us
            </h1>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="w-full max-w-6xl pb-8"
            >
                {testimonials.map((t, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-yellow-50 text-black rounded-xl shadow-lg p-6 flex flex-col">

                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={t.img}
                                    alt={t.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400"
                                />

                                <div>
                                    <h3 className="text-sm font-semibold">
                                        {t.name}{" "}
                                        {t.verified && (
                                            <span className="text-gray-500 text-xs">✔ Verified</span>
                                        )}
                                    </h3>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                    <p className="text-yellow-500 text-xs">
                                        {"⭐".repeat(t.rating)}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-700 text-sm italic">
                                "{t.text}"
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Testimonials;
