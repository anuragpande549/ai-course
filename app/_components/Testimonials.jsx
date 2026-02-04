"use client";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    content: "I needed to learn Next.js quickly for a new job. This tool generated a perfect curriculum in seconds. No more wasting time searching for random YouTube tutorials.",
    stars: 5,
  },
  {
    name: "David Chen",
    role: "Data Science Student",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    content: "The AI structure is surprisingly accurate. It broke down complex topics like Neural Networks into manageable chapters with great video recommendations.",
    stars: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024e",
    content: "I used the 'Upload Syllabus' feature to digitize my old university notes. It turned a dry PDF into an interactive course with quizzes! Absolutely love it.",
    stars: 5,
  },
  {
    name: "Michael Chang",
    role: "Self-Taught Coder",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
    content: "The progress tracking is a game changer. It feels like having a personal tutor who knows exactly what I need to learn next without the expensive price tag.",
    stars: 4,
  },
  {
    name: "Jessica Lee",
    role: "UX Designer",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026025d",
    content: "Finally, a platform that filters out the noise. The generated content is high quality, direct to the point, and the UI is beautiful.",
    stars: 5,
  },
  {
    name: "Robert Fox",
    role: "Marketing Specialist",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
    content: "I generated a course on 'Digital Marketing Strategies' and it covered everything from SEO to paid ads. Highly recommended for professionals.",
    stars: 5,
  },
];

// Animation variants for the stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Testimonials() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Loved by learners everywhere
          </p>
          <p className="mt-4 text-lg text-slate-600">
            See what students and professionals are saying about their AI learning journey.
          </p>
        </div>

        {/* Grid of Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-shadow hover:shadow-md"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-x-1 text-indigo-500">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                
                {/* Content */}
                <div className="mt-6 text-base leading-7 text-slate-700">
                  "{testimonial.content}"
                </div>
              </div>

              {/* User Info */}
              <div className="mt-8 flex items-center gap-x-4 border-t border-slate-100 pt-6">
                <img
                  className="h-10 w-10 rounded-full bg-slate-50 object-cover"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm leading-6 text-slate-600">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
    </svg>
  );
}

export default Testimonials;