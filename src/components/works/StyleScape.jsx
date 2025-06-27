import ExternalLink from "../ExternalLink";

function StyleScape({ links = [] }) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">StyleScape</h2>
        <p className="text-gray-500 text-sm">(2024)</p>

        {/* Links section */}
        {links.length > 0 && (
          <div className="flex gap-4 mt-3">
            {links.map((link, index) => (
              <ExternalLink key={index} href={link.url} className="text-sm link">
                {link.label}
              </ExternalLink>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">Project details coming soon...</p>
      </div>
    </div>
  );
}

export default StyleScape;
