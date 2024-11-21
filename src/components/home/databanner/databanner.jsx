"use client";
import { useEffect, useState } from "react";

const Databanner = () => {
  const [stats, setStats] = useState({
    countries: 0,
    students: 0,
    schools: 0,
    tests: 0,
  });

  useEffect(() => {
    let countInterval;
    const animateNumbers = () => {
      const duration = 2000; // Animation duration in milliseconds
      const increment = (endValue) => endValue / (duration / 100);

      let currentCountries = 0;
      let currentSchools = 0;
      let currentStudents = 0;
      let currentTests = 0;

      countInterval = setInterval(() => {
        currentCountries += increment(10);
        currentSchools += increment(3887);
        currentStudents += increment(500000);
        currentTests += increment(4000000);

        if (currentCountries >= 10) currentCountries = 10;
        if (currentSchools >= 3887) currentSchools = 3887;
        if (currentStudents >= 500000) currentStudents = 500000;
        if (currentTests >= 4000000) currentTests = 4000000;

        setStats({
          countries: Math.floor(currentCountries),
          schools: Math.floor(currentSchools),
          students: Math.floor(currentStudents),
          tests: Math.floor(currentTests),
        });

        if (
          currentCountries === 10 &&
          currentSchools === 3887 &&
          currentStudents === 500000 &&
          currentTests === 4000000
        ) {
          clearInterval(countInterval);
        }
      }, 100);
    };

    animateNumbers();
    return () => clearInterval(countInterval);
  }, []);

  return (
    <section className="bg-blue-500 mt-0 py-12 relative">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
        {/* Countries */}
        <div className="text-center mb-6 md:mb-0">
          <h3 className="text-4xl md:text-5xl font-bold font-montserrat text-white">
            {stats.countries}+
          </h3>
          <p className="text-xl md:text-2xl font-lato text-white mt-2">
            Nations
          </p>
        </div>

        {/* Schools Collaborated */}
        <div className="text-center mb-6 md:mb-0">
          <h3 className="text-4xl md:text-5xl font-bold font-lato text-white">
            {stats.schools}+
          </h3>
          <p className="text-xl md:text-2xl font-lato text-white mt-2">
           Schools Have Collabrated
          </p>
        </div>

        {/* Last Year Participants */}
        <div className="text-center mb-6 md:mb-0">
          <h3 className="text-4xl md:text-5xl font-bold font-lato text-white">
            {Math.floor(stats.students / 100000)} Lakh+
          </h3>
          <p className="text-xl md:text-2xl font-lato text-white mt-2">
            Students Joined The Adventure Last Year
          </p>
        </div>

        {/* Total Students Impacted */}
        <div className="text-center">
          <h3 className="text-4xl md:text-5xl font-bold font-montserrat text-white">
            {Math.floor(stats.tests / 100000)} Lakhs+
          </h3>
          <p className="text-xl md:text-2xl font-montserrat text-white mt-2">
            Total students impacted
          </p>
        </div>
      </div>
    </section>
  );
};

export default Databanner;
