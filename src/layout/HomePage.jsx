import Background from "../assets/hero-bg.jpg";
import { Link } from "wouter";

function HomePage() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold drop-shadow-md">
              Sprout Budget Planner
            </h1>
            <p className="mb-5 drop-shadow-md">
              Planting the seed to your future
            </p>
            <button className="btn btn-primary drop-shadow-md">
              <Link to="sign-up"> Get Started </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

// "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
