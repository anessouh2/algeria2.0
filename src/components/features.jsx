import "../styles/features.css";
import producerImg from "../imgs/aboutUs1.png";
import transporterImg from "../imgs/aboutUs2.png";
import buyerImg from "../imgs/aboutUs3.png";

export default function Features() {
  return (
    <section className="features" id='features'>
      <div className="features-header">
        <h1>Features</h1>
      </div>
      <div className="blur">
        <div className="back-img">
          <div className="features-panels">
            <div className="feature-panel">
              <div className="panel-image">
                <img src={producerImg} alt="Producer working in field" />
                <div className="panel-header">
                  <h1>For the producer, Your Digital Farm</h1>
                </div>
              </div>
              <div className="panel-content">
                <p>
                  AgroConnect is your direct storefront to the market. Move
                  beyond the uncertainty of traditional channels. List your
                  harvest, set fair prices based on real-time data, and tell
                  your farm's story to build a loyal customer base. We give you
                  the tools to become a savvy business owner, not just a grower.
                </p>
              </div>
            </div>
            <div className="feature-panel">
              <div className="panel-image">
                <img src={transporterImg} alt="Market scene" />
                <div className="panel-header">
                  <h1>For the Transporter, The backbone of the Chain.</h1>
                </div>
              </div>
              <div className="panel-content">
                <p>
                  Stop driving empty. AgroConnect integrates you into a dynamic
                  digital logistics network. Access a steady stream of shipping
                  requests, optimize your routes with smart tools, and build
                  your reputation as a reliable partner. We ensure your fleet is
                  productive, profitable, and essential.
                </p>
              </div>
            </div>
            <div className="feature-panel">
              <div className="panel-image">
                <img src={buyerImg} alt="Truck on road" />
                <div className="panel-header">
                  <h1>For the Buyer, Source with Confidence.</h1>
                </div>
              </div>
              <div className="panel-content">
                <p>
                  Make informed purchasing decisions with ease. AgroConnect's
                  Buyer App puts the power of choice in your hands, combining
                  rich product details, seamless ordering, and intelligent
                  recommendations to transform how you source.
                </p>
              </div>
            </div>
          </div>
          <div className="features-conclusion">
            <p className="conclusion-intro">
              What sets us apart is how these three applications work in
              harmony:
            </p>
            <div className="conclusion-par">
              <p>
                A Producer lists a harvest, and the system instantly notifies
                nearby Buyers and available Transporters.
              </p>
              <p>
                A Buyer places an order, and the Producer can immediately
                coordinate with a Transporter for a seamless pickup, all within
                the platform.
              </p>
              <p>
                The Transporter completes the delivery, providing a secure,
                digital proof of delivery. The Buyer receives a complete,
                verified record of the product's journey from the Producer's
                field to their door ensuring accountability at every step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
