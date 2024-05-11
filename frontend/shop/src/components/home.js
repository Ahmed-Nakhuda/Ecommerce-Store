import { Link } from "react-router-dom";
import "./style-sheets/home.css";

function Home() {

  const handleExploreNowClick = () => {
    const targetElement = document.getElementById("separator");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <section id="hero">
        <div className="heroContainer">
          <div className="info">
            <h1>New Arrivals</h1>
            <a href="#" onClick={handleExploreNowClick}>Explore Now</a>
          </div>
        </div>
      </section>

      <hr id="separator" />
      <h2 id="featured">FEATURED</h2>

      <div id="categories">

        <div className="categoryCard">
          <Link className="link" to="/men">
            <img src="images/men/dunk.png" alt="men's shoes" />
            <div className="shoeInfo">
              MEN'S SHOES
              <p />
              <button className="shopNowButton">Explore</button>
            </div>
          </Link>
        </div>


        <div className="categoryCard">
          <Link className="link" to="/women">
            <img src="images/women/adidasPuttyMauve.png" alt="women's shoes" />
            <div className="shoeInfo">
              WOMEN'S SHOES
              <p />
              <button to="/women" className="shopNowButton">Explore</button>
            </div>
          </Link>
        </div>


        <div className="categoryCard">
          <Link className="link" to="/kids">
            <img src="images/kids/curry.png" alt="kid's shoes" />
            <div className="shoeInfo">
              KID'S SHOES
              <p />
              <button className="shopNowButton">Explore</button>
            </div>
          </Link>
        </div>

      </div>

      <div id="imageGallery">
        <div className="responsive">
          <Link to="/men">
            <div className="gallery">
              <img src="images/chameleon.png" alt="jordan chameleon shoes" />
              <p className="shoeBrand">JORDANS</p>
              <p>SHOP NOW</p>
            </div>
          </Link>
        </div>
        <div className="responsive">
          <Link to="/men">
            <div className="gallery">
              <img src="images/adidas.png" alt="adidas shoes" />
              <p className="shoeBrand">ADIDAS</p>
              <p>SHOP NOW</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="subscribe">
        <div className="subscribeColumn1">
          <h2>Subscribe and Get</h2>
          <h2>10% OFF</h2>
          <p>subscribe to our newsletter to receive a coupon</p>
        </div>
        <div className="subscribeColumn2">
          <input type="text" className="subscribeTextField" placeholder="name@email.com" />
          <p></p>
          <button className="subscribeButton">Subscribe</button>
        </div>
      </div>

      <footer className="footer">
        <div className="footerContainer">
          <div className="row">
            <div className="footerCol">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Store Locations</a></li>
                <li><a href="#">Privacy Policies</a></li>
              </ul>
            </div>
            <div className="footerCol">
              <h4>Get Help</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Order Status</a></li>
                <li><a href="#">Payment Options</a></li>
              </ul>
            </div>
            <div className="footerCol">
              <h4>Connect</h4>
              <ul>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Newsletter</a></li>
              </ul>
            </div>
            <div className="footerCol">
              <h4>Follow Us</h4>
              <div className="socialLinks"></div>
              <a href="#" id="facebook"><img src="images/logos/facebook.png" /></a>
              <a href="#"><img src="images/logos/instagram.png" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
