// students.jsx
import Image from 'next/image';

const Students = () => {
  return (
    <div className="bg-blue-500 py-12 px-6 sm:px-8 lg:px-16 text-center text-white">
      {/* Title and Subtitle */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">Students</h2>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
          Participating <span className="text-black">Globally</span>
        </h3>
      </div>

      {/* Description */}
      <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
        The Global Innovator Olympiad (GIO) features top students from over 10 countries, including <span className='text-white'><b>India, Saudi Arabia, UAE, South Africa, Norway, Nepal, USA, Qatar, and Kuwait.</b></span>
      </p>

      {/* Image */}
      <div className="flex justify-center">
        <Image
          src="/student1.jpg" // Replace with the actual path to your image
          alt="Student smiling"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Students;
