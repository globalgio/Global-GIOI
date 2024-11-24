import React from 'react';
import { motion } from 'framer-motion';

const Form = () => {
  return (
    <div className="flex flex-col items-center py-10 px-4 bg-gradient-to-b from-blue-200 via-white to-blue-100 min-h-screen">
      <motion.h1
        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-6 text-blue-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        BECOME OLYMPIAD COORDINATOR
      </motion.h1>

      <motion.p
        className="text-sm sm:text-base lg:text-lg text-center text-gray-600 max-w-3xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Are you presently working/retired Teacher, Principal, Head Master/Head
        Mistress, or a social worker? Work as a freelancer with us. Become an
        India Talent Olympiad Coordinator and let the schools learn about the
        educational benefits we provide. Send us your request by filling in your
        details in the Coordinator's form.
      </motion.p>

      <motion.form
        className="w-full max-w-4xl bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg border border-gray-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-700"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Personal Details
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ staggerChildren: 0.2 }}
        >
          {/* Map through input fields */}
          {[
            { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Your Name' },
            { id: 'email', label: 'Email ID', type: 'email', placeholder: 'Email' },
            { id: 'contact', label: 'Contact', type: 'tel', placeholder: 'Contact' },
            { id: 'dob', label: 'Date of Birth', type: 'date' },
            { id: 'education', label: 'Highest Education', type: 'text', placeholder: 'Highest Education' },
            { id: 'profession', label: 'Profession', type: 'text', placeholder: 'Profession' },
            { id: 'address', label: 'Address', type: 'text', placeholder: 'Address' },
            { id: 'pincode', label: 'Pin Code', type: 'text', placeholder: 'Pin Code' },
            { id: 'password', label: 'Password', type: 'password', placeholder: 'Password' },
          ].map(({ id, label, type, placeholder }, index) => (
            <motion.div
              key={id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: index * 0.1 }}
            >
              <label htmlFor={id} className="block font-semibold text-gray-700">
                {label}
              </label>
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Terms & Conditions */}
        <motion.div
          className="mt-6 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <input
            type="checkbox"
            id="terms"
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-3 text-sm sm:text-base text-gray-700">
            I agree to <span className="text-blue-600">Terms & Conditions</span>
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="mt-8 mx-auto block bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          SIGN UP
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Form;
