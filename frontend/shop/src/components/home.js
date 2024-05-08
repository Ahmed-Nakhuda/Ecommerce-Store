import { Link } from "react-router-dom";
import "./style-sheets/home.css";

function Home() {
  return (
    <div>
      <section id="hero">
        <div className="heroContainer">
          <div className="info">
            <h1>New Arrivals</h1>
            <a href="#">Explore Now</a>
          </div>
        </div>
      </section>


      <hr className="separator" />
      <h2 className="featured">FEATURED</h2>

      <div className="categories">
        <div className="categoryCard">
          <img src="images/men/dunk.png" alt="men's shoe" />
          <div className="shoeInfo">
            MEN'S SHOES
            <p />
            <Link to="/men" className="shopNowButton">Explore</Link>
          </div>
        </div>
        <div className="categoryCard">
          <img src="images/women/adidasPuttyMauve.png" alt="women's shoe" />
          <div className="shoeInfo">
            WOMEN'S SHOES
            <p />
            <Link to="/women" className="shopNowButton">Explore</Link>
          </div>
        </div>

        <div className="categoryCard">
          <img src="images/kids/jordanUniversityRedBlack.png" alt="kid's shoe" />
          <div className="shoeInfo">
            KID'S SHOES
            <p />
            <Link to="/kids" className="shopNowButton">Explore</Link>
          </div>
        </div>
      </div>

      <div id="imageGallery">
        <div class="responsive">
          <div class="gallery">
              <img src="images/chameleon.png" alt="jordan chameleon" />
            <div class="description">
              JORDANS
              <p />
              <Link className="shopNowLink" to="/men">SHOP NOW</Link>
            </div>
          </div>
        </div>

        <div class="responsive">
          <div class="gallery">
              <img src="images/adidas.png" alt="adidas shoe" />
            <div class="description">
              ADIDAS
              <p />
              <Link className="shopNowLink" to="/men">SHOP NOW</Link>
            </div>
          </div>
        </div>
      </div>


      <div className="subscribe">
        <div className="subscribeColumn1">
          <h2>Subscribe and Get</h2>
          <h2>10% OFF</h2>
          <p>subscribe to our newsletter to receive a coupon</p>
        </div>
        <div className="subscribeColumn2">
          <input type="text" className="subscribeTextField" placeholder="@email.com" />
          <p></p>
          <button className="subscribeButton">Subscribe</button>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
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
                <li><a href="#">Loyalty Program</a></li>
                <li><a href="#">Sign Up for Newsletter</a></li>
      
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
