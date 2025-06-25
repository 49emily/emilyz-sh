import ExternalLink from "./ExternalLink";

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-2xl relative">
        <div className="text-2xl tracking-tight">
          Previously, I...
          <ul className="list-decimal list-inside space-y-1">
            <li>
              Was raised in between China and Denver, Colorado by my grandparents and parents.
            </li>
            <li>
              Graduated from my CS and <span className="link">Art Practice</span> undergrad degree
              at Stanford in 2.5 years.
            </li>
            <li>
              Interned at{" "}
              <ExternalLink href="https://www.instagram.com/reel/CvKqy5dr65S/?igsh=NTc4MTIwNjQ2YQ==">
                Glean
              </ExternalLink>
              , Scale AI, Apple, and Rox and met wonderful people working on hard problems.
            </li>
            <li>
              Appeared in a{" "}
              <ExternalLink href="https://youtu.be/Plq6DtKYrk4?si=pvZTBRysD-aTc4YZ">
                viral Jubilee video
              </ExternalLink>{" "}
              (my claim to fame, indeed).
            </li>
            <li>
              Exhibited (and will continue exhibiting) my visual art at museums across the country.
            </li>
            <li>
              Flew to Paris in the the middle of midterms to shake hands with{" "}
              <span className="link">my celebrity crush</span>.
            </li>
            <li>
              Joined fellowships like <span className="link">Neo Scholars</span> and Pear Garage
              that helped me find myself and find wonderful friends.
            </li>
            <li>
              Helped run{" "}
              <ExternalLink href="https://friendsandfam.xyz/">Friends and Family</ExternalLink>,{" "}
              <span className="link">Stanford AKPsi</span>, and the{" "}
              <span className="link">largest pitch competition for Stanford startups</span>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
