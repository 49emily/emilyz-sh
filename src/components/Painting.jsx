function Painting() {
  return (
    <div className="space-y-12 py-12 pt-20">
      <div className="mb-12">
        <p className="text-md text-primary">~ visual art pieces</p>
      </div>

      {/* Visual Art Section */}
      <section>
        <h2 className="text-3xl mb-8 text-primary">
          <i>Visual Art</i>
        </h2>
        <iframe
          src="https://v2-embednotion.com/104b4250a017802b8390d94e5a2eea36"
          style={{
            width: "100%",
            height: "600px",
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "none",
          }}
        ></iframe>
      </section>
    </div>
  );
}

export default Painting;
