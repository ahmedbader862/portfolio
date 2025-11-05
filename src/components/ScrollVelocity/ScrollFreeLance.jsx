
import ScrollVelocity from './../tools/ScrollVelocity/ScrollVelocity';
import './ScrollFreeLance.css';

function ScrollFreeLance() {
  const velocity = 80; // Adjust the velocity as needed

  return (
    <div className="freelance-wrapper">
      {/* left-leaning line: black background, white text */}
      <div className="freelance-line line-left" aria-hidden="true">
        <div className="line-inner">
          <ScrollVelocity texts={["< AVAILABLE FOR FREELANCE >"]} velocity={velocity} />
        </div>
      </div>

      {/* right-leaning line: white background, black text */}
      <div className="freelance-line line-right" aria-hidden="true">
        <div className="line-inner">
          <ScrollVelocity texts={["< AVAILABLE FOR FREELANCE >"]} velocity={velocity} />
        </div>
      </div>
    </div>
  );
}

export default ScrollFreeLance;