function SelectedWork() {
  const projects = [
    { title: "where are you from?", year: "2025" },
    { title: "Letters to my Mom", year: "2025" },
    { title: "diffusion-me", year: "2025" },
    { title: "prl", year: "2024-25" },
    { title: "prl mobile", year: "2025" },
    { title: "Tangent", year: "2025" },
    { title: "StyleScape", year: "2024" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {projects.map((project, index) => (
          <div key={index} className="flex items-baseline">
            <span className="text-gray-900">{project.title}</span>
            <span className="text-gray-500 ml-2">{project.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectedWork;
