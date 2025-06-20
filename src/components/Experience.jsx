function Experience() {
  const experiences = [
    {
      company: "Scale AI",
      role: "Software Engineering Intern",
      startDate: "1.2024",
      endDate: "3.2024",
    },
    {
      company: "Glean",
      role: "Software Engineering Intern",
      startDate: "6.2023",
      endDate: "9.2023",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl mb-6">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index}>
            <div className="flex items-baseline mb-1">
              <span className="">
                {exp.company} — {exp.role}
              </span>
            </div>
            <div className="text-sm text-gray-500 border-l border-gray-300 pl-2">
              <div>{exp.startDate}</div>
              <div>{exp.endDate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
