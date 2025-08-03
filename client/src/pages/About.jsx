import { NavLink } from "react-router-dom";

export const About = () => {
  return (
    <>
      <MasonryGallery />
      <section className="w-full py-20 px-6 md:px-20 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About LSM</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            LSM stands for "Learn Something Meaningful". We are a modern, accessible learning platform dedicated to helping individuals explore new skills, grow professionally, and build meaningful knowledge.
          </p>
        </div>

        {/* Our Mission */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At LSM, our mission is to make education accessible, engaging, and effective for everyone. We provide high-quality, community-driven content that empowers learners from all backgrounds to reach their goals — whether it's gaining a new skill, changing careers, or simply learning for the joy of it.
          </p>
        </div>

        {/* Our Values */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>🧠 Curiosity: We encourage continuous exploration and learning.</li>
            <li>🌍 Inclusivity: Education should be open and accessible to all.</li>
            <li>📚 Quality: We prioritize well-crafted, valuable learning experiences.</li>
            <li>🤝 Community: Learning thrives when shared with others.</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <h3 className="text-2xl font-semibold mb-4">Join the LSM Community</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Whether you're a lifelong learner, a professional, or a passionate educator — there's a place for you at LSM. Let's grow together.
          </p>
          <NavLink
            to="/courses"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </section>
    </>
  );
};
const MasonryGallery = ({ images }) => {
  const imgArray = [
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013072/efe505xoxt83oxmh18qx.jpg",
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013145/sipka4e4fnqjaufxogcc.jpg",
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013223/urn8umazkpxuzxez28p4.jpg",
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013311/zyyctoq74r0wlsjbsyhe.jpg",
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013434/ziaqe8goalkrbinkmffw.jpg",
    "https://res.cloudinary.com/df3pscsym/image/upload/v1742013397/fhpmtb0fwyltmgcodggl.jpg",
  ];
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 gap-4 p-4">
      {imgArray.map((img, index) => (
        <div key={index} className="mb-4 overflow-hidden rounded-xl shadow-md">
          <img
            src={img}
            alt={`Gallery image ${index + 1}`}
            className="w-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
};
